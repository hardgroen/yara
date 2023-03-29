using Microsoft.AspNetCore.Authorization;
using Yara.Services.Postings.Presentation.Infra.Authorization.Requirements;

namespace Yara.Services.Postings.Presentation.Infra.Authorization.Handlers;

// https://blog.lehmamic.ch/implement-resource-based-authorization-with-asp-net-core/
public class AuthorizePolicyHandler : AuthorizationHandler<AuthorizePolicyRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthorizePolicyHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AuthorizePolicyRequirement requirement)
    {
        if (!requirement.RequiredPolicies.Any())
        {
            return;
        }

        // get the routing parameters and provide them as parameters required by the authorization policy
        var routeData = _httpContextAccessor.HttpContext!.GetRouteData();
        var paramMap = routeData.Values.ToDictionary(x => x.Key, x => x.Value?.ToString());

        // get the permissions from the claims principal
        var permissions = context.User.GetPermissions();

        // check the permissions
        if (requirement.RequiredPolicies.All(policy => policy.IsMetByPermissions(permissions.ToList(), paramMap)))
        {
            context.Succeed(requirement);
        }

        await Task.CompletedTask;
    }
}