namespace Yara.AngularBff.DataContracts.ViewModels
{
    public class ResourcePermission
    {
        public string ResourceId { get; set; } = string.Empty;
        public IEnumerable<string> Actions { get; set; } = new List<string>();

    }
}
