using System.Security.Claims;
using System.Text.Json;
using Yara.Services.Postings.Application.Model;

namespace Yara.Services.Postings.Presentation.Infra.Authorization;

public static class ClaimsHelper
{
    public static Claim ToClaim(this ResourcePermission permission)
    {
        return new Claim(BebobClaimTypes.Permission, JsonSerializer.Serialize(permission), "json");
    }

    public static IEnumerable<Claim> ToClaims(this IEnumerable<ResourcePermission> permissions)
    {
        return permissions.Select(ToClaim);
    }

    public static ClaimsIdentity ToClaimsIdentity(this IEnumerable<ResourcePermission> permissions)
    {
        return new ClaimsIdentity(permissions.ToClaims());
    }

    public static IEnumerable<ResourcePermission> GetPermissions(this ClaimsPrincipal principal)
    {
        if (principal == null) throw new ArgumentNullException(nameof(principal));
        return principal.Claims
            .Where(x => x.Type == BebobClaimTypes.Permission && x.Value != null)
            .Select(x => JsonSerializer.Deserialize<ResourcePermission>(x.Value));
    }
}

public static class BebobClaimTypes
{
    public const string Permission = "Permission";
}

