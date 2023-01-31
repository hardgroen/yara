using Yara.MvcClient.Models.Api;

namespace Yara.MvcClient.Models.View
{
    public class MemoListModel
    {
        public IEnumerable<Memo> Memos { get; set; } = Enumerable.Empty<Memo>();
    }
}
