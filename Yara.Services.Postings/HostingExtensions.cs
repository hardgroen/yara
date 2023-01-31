using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Yara.Services.Postings
{
    public static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddAccessTokenManagement();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                  .AddJwtBearer(options =>
                  {
                      options.Authority = "https://localhost:5002";
                      options.Audience = "postings";
                  });


            var requireAuthenticatedUserPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            builder.Services.AddControllers(configure =>
            {
                configure.Filters.Add(new AuthorizeFilter(requireAuthenticatedUserPolicy));
            });

            // builder.Services.AddControllers();

            //builder.Services.AddAuthentication("token")
            //    .AddJwtBearer("token", options =>
            //    {
            //        options.Authority = "https://localhost:5002";
            //        options.MapInboundClaims = false;

            //        options.TokenValidationParameters = new TokenValidationParameters()
            //        {
            //            ValidateAudience = false,
            //            ValidTypes = new[] { "at+jwt" },

            //            NameClaimType = "name",
            //            RoleClaimType = "role"
            //        };
            //    });

            //builder.Services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("ApiCaller", policy =>
            //    {
            //        policy.RequireClaim("scope", "api");
            //    });

            //    options.AddPolicy("RequireInteractiveUser", policy =>
            //    {
            //        policy.RequireClaim("sub");
            //    });
            //});


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            return app;
        }
    }
}
