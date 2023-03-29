using Amazon.Auth.AccessControlPolicy;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDb.Bson.NodaTime;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.IdentityModel.Tokens.Jwt;
using Yara.Services.Postings.Application.Services;
using Yara.Services.Postings.Infrastructure;
using Yara.Services.Postings.Presentation.Infra;
using Yara.Services.Postings.Presentation.Infra.Authorization;
using Yara.Services.Postings.Presentation.Infra.Authorization.Handlers;
using Yara.Services.Postings.Presentation.Infra.Authorization.Requirements;
using Yara.Services.Postings.Presentation.Infra.OpenApi;

namespace Yara.Services.Postings
{
    public static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            NodaTimeSerializers.Register();

            // Configure applicationServices
            builder.Services.AddTransient<MemoService>();
            builder.Services.AddSingleton<PostingsDbContext>();
            builder.Services.AddTransient<IAuthorizationHandler, AuthorizePolicyHandler>();
            builder.Services.AddTransient<IResourcePermissionsProvider, StaticResourcePermissionsProvider>();
            builder.Services.AddTransient<ResourcePermissionsService>();

            builder.Services.Configure<PostingsDatabaseSettings>(builder.Configuration.GetSection("PostingsDatabase"));
            builder.Services.AddSingleton<IClock>(SystemClock.Instance);
            builder.Services.Configure<AppSettings>(builder.Configuration);
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddAccessTokenManagement();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            builder.Services.AddAuthentication("token")
                  .AddJwtBearer("token", options =>
                  {
                      options.Authority = "https://localhost:5002";
                      options.Audience = "postings";
                      options.MapInboundClaims = false;

                      options.TokenValidationParameters = new TokenValidationParameters()
                      {
                          ValidateAudience = false,
                          ValidTypes = new[] { "at+jwt" },

                          NameClaimType = "name",
                          RoleClaimType = "role"
                      };

                      options.Events = new JwtBearerEvents
                      {
                          OnTokenValidated = async context =>
                          {
                              // get the permission service
                              var permissionService = context.HttpContext.RequestServices
                              .GetRequiredService<ResourcePermissionsService>();

                              // get user name and role from the claims principal
                              var loginName = context.Principal!.GetLoginName();
                              var roles = context.Principal!.GetRoles()
                                  .ToList();

                              // load the permissions
                              var permissions = await permissionService.GetPermissionsAsync(loginName, roles);

                              // add the permissions as claims to the claims principal
                              var appIdentity = permissions.ToClaimsIdentity();
                              context.Principal!.AddIdentity(appIdentity);
                          }
                      };
                  });

            var requireAuthenticatedUserPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            builder.Services.AddControllers(configure =>
            {
                configure.Filters.Add(new AuthorizeFilter(requireAuthenticatedUserPolicy));
            }).AddJsonOptions(opt => opt.JsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb));
            
            builder.Services.AddAuthorization(options =>
            {
                foreach (var policy in AuthorizePolicy.GetAll<AuthorizePolicy>())
                {
                    options.AddPolicy(policy.Key, p => p.Requirements.Add(new AuthorizePolicyRequirement(policy)));
                }                
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerGenOptions>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.OAuthClientId("postings.swagger");
                options.OAuthAppName("Postings Swagger UI");
                options.OAuthUsePkce();
            });

            app.MapControllers();

            return app;
        }
    }
}
