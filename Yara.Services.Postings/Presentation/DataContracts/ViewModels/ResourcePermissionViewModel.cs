namespace Yara.Services.Postings.Presentation.DataContracts.ViewModels
{
    public class ResourcePermissionViewModel
    {
        public string ResourceId { get; set; } = string.Empty;
        public IEnumerable<string> Actions { get; set; } = new List<string>();
    }
}
