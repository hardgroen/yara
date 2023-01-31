namespace Yara.Services.Postings.DataContracts
{
    public class Memo
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
