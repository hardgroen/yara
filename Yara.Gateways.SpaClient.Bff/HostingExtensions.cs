using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Values;
using System.IdentityModel.Tokens.Jwt;
using Yara.Gateways.SpaClient.Bff.DelegatingHandlers;

namespace Yara.Gateways.SpaClient.Bff
{
    public static class HostingExtensions
    {
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            var authenticationProviderKey = "SpaClientBffAuthenticationScheme";           

            builder.Services.AddAccessTokenManagement();

            // sub => http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();            

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddJwtBearer(authenticationProviderKey, options =>
                   {
                       options.Authority = "https://localhost:5002";
                       options.Audience = "spaclientbff";
                   });

            builder.Services.AddHttpClient();

            builder.Services.AddTransient<TokenExchangeDelegatingHandler>();

            builder.Services.AddOcelot()
                .AddDelegatingHandler<TokenExchangeDelegatingHandler>();

            builder.Services.AddSwaggerForOcelot(builder.Configuration);
            builder.Services.AddMvc();
            return builder;
        }

        public static async Task<WebApplication> ConfigurePipeline(this WebApplicationBuilder builder)
        {
            var app = builder.Build();
            if (builder.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles();
            app.UseSwaggerForOcelotUI();

            await app.UseOcelot();

            return app;
        }
    }
}
