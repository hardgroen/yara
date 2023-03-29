namespace Yara.Services.Postings.Presentation.Infra
{
    public class PostingsDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string MemoCollectionName { get; set; } = null!;
    }
}
