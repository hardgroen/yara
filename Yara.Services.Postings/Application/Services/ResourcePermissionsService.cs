using System.Collections.ObjectModel;
using Yara.Services.Postings.Application.Model;

namespace Yara.Services.Postings.Application.Services;

public interface IResourcePermissionsProvider
{
    Task<ReadOnlyCollection<ResourcePermission>> GetPermissionsAsync(string userName, IReadOnlyCollection<string> userGroups);
}

public class StaticResourcePermissionsProvider : IResourcePermissionsProvider
{
    public Task<ReadOnlyCollection<ResourcePermission>> GetPermissionsAsync(string userName, IReadOnlyCollection<string> userGroups)
    {
        switch (userName)
        {
            case "Bob Smith":
                return GetPermissionsForBob();
            default: return Task.FromResult(new ReadOnlyCollection<ResourcePermission>(new List<ResourcePermission>()));
        }
    }

    private Task<ReadOnlyCollection<ResourcePermission>> GetPermissionsForBob()
    {
        var result = new List<ResourcePermission>();
        var memo1Permission = new ResourcePermission
        {
            Actions = new[] { PermissionAction.Read },
            Id = Guid.NewGuid(),
            Resource = "/memos/*",
            User = "Bob Smith",
            UserGroup = "Goldmember"
        };
        result.Add(memo1Permission);

        return Task.FromResult(new ReadOnlyCollection<ResourcePermission>(result));
    }
}


public class ResourcePermissionsService : IResourcePermissionsProvider
{
    private readonly IEnumerable<IResourcePermissionsProvider> _providers;

    public ResourcePermissionsService(IEnumerable<IResourcePermissionsProvider> providers)
    {
        _providers = providers;
    }

    public async Task<ReadOnlyCollection<ResourcePermission>> GetPermissionsAsync(string userName, IReadOnlyCollection<string> userGroups)
    {
        var result = new List<ResourcePermission>();
        foreach (var provider in _providers) 
        { 
            var permissions = await provider.GetPermissionsAsync(userName, userGroups);
            result.AddRange(permissions);
        }

        return result.AsReadOnly();
    }
}
