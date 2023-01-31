using Duende.IdentityServer.Models;

namespace Yara.Services.IdentityServer;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("scope1"),
            new ApiScope("postings.fullaccess"),
            new ApiScope("mvcclientbff.fullaccess")
        };

    public static IEnumerable<ApiResource> ApiResources =>
       new ApiResource[]
       {
                new ApiResource("postings", "Postings API")
                {
                    Scopes = { "postings.fullaccess" }
                },
                new ApiResource("mvcclientbff", "MvcClient BFF")
                {
                    Scopes = { "mvcclientbff.fullaccess" }
                }
       };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // m2m client credentials flow client
            //new Client
            //{
            //    ClientId = "m2m.client",
            //    ClientName = "Client Credentials Client",

            //    AllowedGrantTypes = GrantTypes.ClientCredentials,
            //    ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

            //    AllowedScopes = { "scope1" }
            //},

            //// interactive client using code flow + pkce
            //new Client
            //{
            //    ClientId = "interactive",
            //    ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },
                    
            //    AllowedGrantTypes = GrantTypes.Code,

            //    RedirectUris = { "https://localhost:44300/signin-oidc" },
            //    FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
            //    PostLogoutRedirectUris = { "https://localhost:44300/signout-callback-oidc" },

            //    AllowOfflineAccess = true,
            //    AllowedScopes = { "openid", "profile", "scope2" }
            //},
            new Client
                {
                    ClientId = "mvcclientbfftodownstreamtokenexchangeclient",
                    ClientName = "BFF to Downstream Token Exchange Client",
                    AllowedGrantTypes = new[] { "urn:ietf:params:oauth:grant-type:token-exchange" },
                    RequireConsent = false,
                    ClientSecrets = { new Secret("0cdea0bc-779e-4368-b46b-09956f70712c".Sha256()) },
                    AllowedScopes = {
                         "openid", "profile", "postings.fullaccess" }
                },
             new Client
                {
                    ClientName = "Mvc Client",
                    ClientId = "mvcclient",
                    ClientSecrets = { new Secret("ce766e16-df99-411d-8d31-0f5bbc6b8eba".Sha256()) },
                    AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                    RedirectUris = { "https://localhost:7246/signin-oidc" },
                    PostLogoutRedirectUris = { "https://localhost:7246/signout-callback-oidc" },
                    RequireConsent = false,
                    AllowOfflineAccess = true,
                    RefreshTokenUsage = TokenUsage.ReUse,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    AccessTokenLifetime = 60,
                    AllowedScopes = { "openid", "profile",
                        // "postings.fullaccess",
                        "mvcclientbff.fullaccess"}
                }
        };
}
