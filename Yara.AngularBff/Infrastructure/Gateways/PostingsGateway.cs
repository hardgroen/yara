namespace Yara.AngularBff.Infrastructure.Gateways
{
    public interface IPostingsGateway
    {
        Task<IEnumerable<PostingsAuthorizationPolicies>> GetAllAuthorizationPolicies(CancellationToken cancellationToken);
    }

    public class PostingsGateway : IPostingsGateway
    {
        private readonly HttpClient _httpClient;

        public PostingsGateway(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<PostingsAuthorizationPolicies>> GetAllAuthorizationPolicies(CancellationToken cancellationToken)
        {
            var result = await _httpClient.GetAsync("api/authorizationpolicies", cancellationToken);
            result.EnsureSuccessStatusCode();
            var response = await result.Content.ReadAsStringAsync();

            var policies = System.Text.Json.JsonSerializer.Deserialize<List<PostingsAuthorizationPolicies>>(response);

            return policies ?? new List<PostingsAuthorizationPolicies>();
        }
    }
}
