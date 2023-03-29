using NodaTime;
using System.ComponentModel.DataAnnotations;

namespace Yara.Services.Postings.Presentation.DataContracts.ViewModels
{
    public class MemoViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public Instant DateCreatedOrModified { get; set; }
    }
}
