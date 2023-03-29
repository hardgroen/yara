using System.Collections.ObjectModel;

namespace Yara.AngularBff.DataContracts.ViewModels
{
    public class RequiredPemissionViewModel
    {
        public ICollection<string> ResourceIds { get; set; } = new Collection<string>();

        public string Action { get; set; }
    }
}
