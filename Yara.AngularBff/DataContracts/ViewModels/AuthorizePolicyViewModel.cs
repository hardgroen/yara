using System.Collections.ObjectModel;

namespace Yara.AngularBff.DataContracts.ViewModels
{
    public class AuthorizePolicyViewModel
    {
        public string? Name { get; set; }

        public IEnumerable<RequiredPemissionViewModel> Permissions { get; set; } = new Collection<RequiredPemissionViewModel>();
    }
}
