using System.Security.Claims;

namespace Yara.Services.Postings.Presentation.Infra.Authorization;

public static class AuthConfigExtensions
{

    public static string GetLoginName(this ClaimsPrincipal principal)
    {
        return principal.FindFirstValue("name") ?? string.Empty;
    }

    public static IEnumerable<string> GetRoles(this ClaimsPrincipal principal)
    {
        var roles = principal.Claims
            .Where(c => c.Type == ClaimTypes.Role)
            .Select(c => c.Value);
        return roles;
    }
}
