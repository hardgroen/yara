namespace Yara.Services.Postings.DataContracts.ViewModels
{
    public class MemoViewModel
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
