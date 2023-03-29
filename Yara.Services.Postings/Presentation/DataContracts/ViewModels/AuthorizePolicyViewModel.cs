using System.Collections.ObjectModel;

namespace Yara.Services.Postings.Presentation.DataContracts.ViewModels
{
    public class AuthorizePolicyViewModel
    {
        public string? Name { get; set; }

        public IEnumerable<RequiredPemissionViewModel> Permissions { get; set; } = new Collection<RequiredPemissionViewModel>();
    }
}
