using Duende.Bff;
using Duende.Bff.Yarp;
using System.IdentityModel.Tokens.Jwt;

namespace Yara.Gateways.SpaClient.Bff
{
    public static class HostingExtensions
    {
        private static string AllowedOrigins = "_allowedOrigins";
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: AllowedOrigins,
                    policy =>
                    {
                        //policy.WithOrigins("http://localhost:4200");
                        policy.AllowAnyOrigin();
                        policy.AllowAnyHeader();
                        policy.AllowAnyMethod();
                    });
            });
            // Add BFF services to DI - also add server-side session management
            builder.Services.AddBff(options =>
            {
                //options.UserEndpointReturnNullForAnonymousUser = true;
            })
            .AddRemoteApis()
            .AddServerSideSessions();

            // local APIs
            builder.Services.AddControllers();

            // sub => http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //       .AddJwtBearer(authenticationProviderKey, options =>
            //       {
            //           options.Authority = "https://localhost:5002";
            //           options.Audience = "spaclientbff";
            //       });

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
                    options.Cookie.Name = "__Host-spaclientbff";

                    // strict SameSite handling
                    options.Cookie.SameSite = SameSiteMode.None;
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
                    options.SaveTokens = false;

                    // request scopes + refresh tokens
                    options.Scope.Clear();
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("postings.fullaccess");
                    options.Scope.Add("offline_access");
                });

           
            return builder;
        }

        public static WebApplication ConfigurePipeline(this WebApplicationBuilder builder)
        {
            var app = builder.Build();
            if (builder.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseRouting();
            app.UseCors(AllowedOrigins);
            // adds antiforgery protection for local APIs
            app.UseBff();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                // local APIs
                endpoints.MapControllers()
                    .RequireAuthorization()
                    .AsBffApiEndpoint();

                // login, logout, user, backchannel logout...
                endpoints.MapBffManagementEndpoints();

                // proxy endpoint for cross-site APIs
                // all calls to /api/* will be forwarded to the remote API
                // user or client access token will be attached in API call
                // user access token will be managed automatically using the refresh token
                endpoints.MapRemoteBffApiEndpoint("/", "https://localhost:7122")
                    .RequireAccessToken(TokenType.User);
            });

            return app;
        }
    }
}
