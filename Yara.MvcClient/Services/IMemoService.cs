using Yara.MvcClient.Models.Api;

namespace Yara.MvcClient.Services
{
    public interface IMemoService
    {
        Task<IEnumerable<Memo>> GetAll();
    }
}