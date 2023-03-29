using System.Collections.ObjectModel;
using Yara.Services.Postings.Application.Model;

namespace Yara.Services.Postings.Presentation.DataContracts.ViewModels
{
    public class RequiredPemissionViewModel
    {
        public ICollection<string> ResourceIds { get; set; } = new Collection<string>();

        public PermissionAction Action { get; set; }
    }
}
