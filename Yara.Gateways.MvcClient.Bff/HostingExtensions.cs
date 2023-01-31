using Microsoft.AspNetCore.Authentication.JwtBearer;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.IdentityModel.Tokens.Jwt;
using Yara.Gateways.MvcClient.Bff.DelegatingHandlers;

namespace Yara.Gateways.MvcClient.Bff
{
    public static class HostingExtensions
    {
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddAccessTokenManagement();

            // sub => http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            var authenticationScheme = "MvcClientBffAuthenticationScheme";

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddJwtBearer(authenticationScheme, options =>
                   {
                       options.Authority = "https://localhost:5002";
                       options.Audience = "mvcclientbff";
                   });

            builder.Services.AddHttpClient();

            builder.Services.AddTransient<TokenExchangeDelegatingHandler>();

            builder.Services.AddOcelot()
                .AddDelegatingHandler<TokenExchangeDelegatingHandler>();
            return builder;
        }

        public static async Task<WebApplication> ConfigurePipeline(this WebApplicationBuilder builder)
        {
            var app = builder.Build();
            if (builder.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            await app.UseOcelot();
            return app;
        }
    }
}
