using Microsoft.AspNetCore.Authorization;

namespace Yara.Services.Postings.Presentation.Infra.Authorization.Requirements;

public class AuthorizePolicyRequirement : IAuthorizationRequirement
{
    public AuthorizePolicyRequirement(params IAuthorizePolicy[] requiredPolicies)
    {
        RequiredPolicies = requiredPolicies;
    }

    public IAuthorizePolicy[] RequiredPolicies { get; }
}
