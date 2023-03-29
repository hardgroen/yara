using System.Text.RegularExpressions;
using Yara.Services.Postings.Application.Model;

namespace Yara.Services.Postings.Presentation.Infra.Authorization;

public static class PolicyExtensions
{
    private static readonly Regex Regex = new("{(.*?)}", RegexOptions.Compiled);

    public static bool IsMetByPermissions(this IAuthorizePolicy policy, IReadOnlyList<ResourcePermission> permissions, Dictionary<string, string?> paramMap)
    {
        foreach (var requiredPermission in policy.Permissions)
        {
            var specificResourceId = requiredPermission.ResourceId;

            // replacing the parameters in the required permission resoruce id
            var matches = Regex.Matches(requiredPermission.ResourceId).ToList();
            foreach (var match in matches)
            {
                var parameterName = match.Groups[1].Value;
                if (!paramMap.ContainsKey(parameterName))
                {
                    throw new ArgumentException($"Parameter with name {parameterName} was not found.", nameof(paramMap));
                }

                specificResourceId = specificResourceId.Replace(match.Value, paramMap[parameterName], StringComparison.InvariantCultureIgnoreCase);
            }

            // checking whether the user has a matching permission
            if (!permissions.Any(permission => MatchesPermission(permission, specificResourceId, requiredPermission.Action)))
            {
                return false;
            }
        }

        return true;
    }

    private static bool MatchesPermission(ResourcePermission permission, string specificResourceId, PermissionAction requiredAction)
    {
        if (!permission.Actions.Contains(requiredAction))
        {
            return false;
        }

        var requiredResourceId = specificResourceId.Split('/');
        var permissionResourceId = permission.Resource.Split('/');

        for (var i = 0; i < requiredResourceId.Length; i++)
        {
            if (permissionResourceId.Length <= i)
            {
                return false;
            }

            if (permissionResourceId[i] == "**")
            {
                return true;
            }

            if (permissionResourceId[i] != "*" && permissionResourceId[i] != requiredResourceId[i])
            {
                return false;
            }
        }

        if (permissionResourceId.Length != requiredResourceId.Length)
        {
            return false;
        }

        return true;
    }
}
