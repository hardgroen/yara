using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Serilog;
using Yara.MvcClient.Services;

namespace Yara.MvcClient
{
    public static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddAccessTokenManagement();

            var requireAuthenticatedUserPolicy = new AuthorizationPolicyBuilder()
             .RequireAuthenticatedUser()
             .Build();

            builder.Services.AddControllersWithViews(options =>
            {
                options.Filters.Add(new AuthorizeFilter(requireAuthenticatedUserPolicy));
            });

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            }).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
           .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
           {
               options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
               options.Authority = "https://localhost:5002/";
               options.ClientId = "mvcclient";
               options.ResponseType = "code";
               options.SaveTokens = true;
               options.ClientSecret = "ce766e16-df99-411d-8d31-0f5bbc6b8eba";
               options.GetClaimsFromUserInfoEndpoint = true;
               options.Scope.Add("mvcclientbff.fullaccess");
               options.Scope.Add("offline_access");
           });

            
            builder.Services.AddHttpClient<IMemoService, MemoService>(c =>
                c.BaseAddress = new Uri(builder.Configuration["ApiConfigs:Postings:BaseUri"]!))
                .AddUserAccessTokenHandler();

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            //app.UseSerilogRequestLogging();

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            return app;
        }
    }
}
