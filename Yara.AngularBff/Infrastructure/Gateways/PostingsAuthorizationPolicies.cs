using System.Collections.ObjectModel;

namespace Yara.AngularBff.Infrastructure.Gateways
{
    public class PostingsAuthorizationPolicies
    {
        public string Name { get; set; } = string.Empty;

        public IEnumerable<PostingsRequiredPemission> Permissions { get; set; } = new Collection<PostingsRequiredPemission>();
    }

    public class PostingsRequiredPemission
    {
        public ICollection<string> ResourceIds { get; set; } = new Collection<string>();

        public string Action { get; set; } = string.Empty;
    }
}
