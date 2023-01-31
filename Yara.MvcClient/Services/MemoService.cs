using Microsoft.Extensions.Logging;
using Yara.MvcClient.Models.Api;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Yara.MvcClient.Extensions;

namespace Yara.MvcClient.Services
{
    public class MemoService : IMemoService
    {
        private readonly HttpClient _httpClient;

        public MemoService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Memo>> GetAll()
        {
            try
            {
                var response = await _httpClient.GetAsync("api/memo");
                var result = await response.ReadContentAs<List<Memo>>();
                return result ?? new List<Memo>();
            }
            catch(Exception ex)
            {
                return new List<Memo>();
            }
            
        }
    }
}
