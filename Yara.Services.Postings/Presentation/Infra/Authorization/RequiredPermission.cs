using Yara.Services.Postings.Application.Model;

namespace Yara.Services.Postings.Presentation.Infra.Authorization;

public class RequiredPermission
{
    public string ResourceId { get; }
    public PermissionAction Action { get; }

    public RequiredPermission(string resourceId, PermissionAction action)
    {
        ResourceId = resourceId;
        Action = action;
    }   
}
