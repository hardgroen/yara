namespace Yara.Services.Postings.Application.Model
{
    public enum PermissionAction
    {
        Read,
        Write
    }

    public class ResourcePermission : IEquatable<ResourcePermission>
    {
        public Guid Id { get; set; }
        public string Resource { get; set; } = string.Empty;
        public string? UserGroup { get; set; }
        public string? User { get; set; }
        public ICollection<PermissionAction> Actions { get; set;} = new List<PermissionAction>();

        public bool Equals(ResourcePermission? other)
        {
            return this == other;
        }
    }
}
