namespace Yara.Services.Postings.DataContracts.Commands
{
    public class CreateMemo
    {
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
