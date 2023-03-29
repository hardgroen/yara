using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http.Headers;

namespace Yara.AngularBff.Presentation.Infra.DelegatingHandlers
{
    public class PostingsHttpHandler : DelegatingHandler
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PostingsHttpHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            string accessToken = await _httpContextAccessor.HttpContext.GetTokenAsync("access_token");
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new Exception($"Access token is missing for the request {request.RequestUri}");
            }
            request.SetBearerToken(accessToken);
                        

            return await base.SendAsync(request, cancellationToken);
        }
    }
}
