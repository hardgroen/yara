using Duende.Bff;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Options;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;
using Serilog;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.IdentityModel.Tokens.Jwt;
using Yara.AngularBff.Infrastructure.Gateways;
using Yara.AngularBff.Presentation.Infra;
using Yara.AngularBff.Presentation.Infra.DelegatingHandlers;
using Yara.AngularBff.Presentation.Infra.OpenApi;

namespace Yara.AngularBff
{
    public static class HostingExtensions
    {
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Host.UseSerilog();
        
            // Add BFF services to DI - also add server-side session management
            builder.Services
                .AddBff()
                .AddServerSideSessions()
                .AddRemoteApis();

            // local APIs
            var requireAuthenticatedUserPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            builder.Services.AddControllers(configure =>
            {
                configure.Filters.Add(new AuthorizeFilter(requireAuthenticatedUserPolicy));
            }).AddJsonOptions(opt => opt.JsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb));

           

            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<PostingsHttpHandler>();
            builder.Services.AddHttpClient<IPostingsGateway, PostingsGateway>(client =>
            {
                client.BaseAddress = new Uri("https://localhost:7122/");
            }); //.AddHttpMessageHandler<PostingsHttpHandler>();
            builder.Services.Configure<AppSettings>(builder.Configuration);

            // JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = "cookie";
                options.DefaultChallengeScheme = "oidc";
                options.DefaultSignOutScheme = "oidc";
            })
                .AddCookie("cookie", options =>
                {
                    // set session lifetime
                    options.ExpireTimeSpan = TimeSpan.FromHours(8);

                    // sliding or absolute
                    options.SlidingExpiration = false;

                    // host prefixed cookie name
                    options.Cookie.Name = "__Host-angularbff";

                    // strict SameSite handling
                    options.Cookie.SameSite = SameSiteMode.Strict;
                })
                .AddOpenIdConnect("oidc", options =>
                {
                    options.Authority = "https://localhost:5002";

                    // confidential client using code flow + PKCE
                    options.ClientId = "spaclientbff";
                    options.ClientSecret = "0cdea0bc-779e-4368-b46b-09956f70712c";
                    options.ResponseType = "code";
                    options.ResponseMode = "query";

                    options.MapInboundClaims = false;
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.SaveTokens = true;

                    // request scopes
                    options.Scope.Clear();
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("postings.fullaccess");
                    // request refresh token
                    options.Scope.Add("offline_access");

                    options.ClaimActions.Clear();

                    options.TokenValidationParameters = new()
                    {
                        NameClaimType = "name",
                        RoleClaimType = "role"
                    };

                    options.Events = new Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents
                    {
                        OnMessageReceived = ctx =>
                        {
                            var principal = ctx.Principal;
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = ctx =>
                        {
                            var principal = ctx.Principal;
                            return Task.CompletedTask;
                        }
                    };
                });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerGenOptions>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            return builder;
        }

        public static WebApplication ConfigurePipeline(this WebApplicationBuilder builder)
        {
            var app = builder.Build();
            app.UseSerilogRequestLogging();
            if (builder.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            // adds antiforgery protection for local APIs
            app.UseBff();
            app.UseAuthorization();
            // login, logout, user, backchannel logout...
            app.MapBffManagementEndpoints();

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.OAuthClientId("spaclientbff.swagger");
                options.OAuthAppName("YARA Swagger UI");
                options.OAuthUsePkce();
            });

            // local APIs
            app.MapControllers();
                //.RequireAuthorization()
                //.AsBffApiEndpoint();
            
            // proxy endpoint for cross-site APIs
            // all calls to /api/* will be forwarded to the remote API
            // user or client access token will be attached in API call
            // user access token will be managed automatically using the refresh token
            app.MapRemoteBffApiEndpoint("/api", "https://localhost:7122/api")
                .RequireAccessToken(TokenType.UserOrClient);           

            app.MapFallbackToFile("index.html");
            return app;
        }
    }
}
