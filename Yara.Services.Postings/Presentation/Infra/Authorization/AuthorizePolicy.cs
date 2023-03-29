using Yara.Services.Postings.Application.Model;

namespace Yara.Services.Postings.Presentation.Infra.Authorization;

public interface IAuthorizePolicy
{
    RequiredPermission[] Permissions { get; }
    string Key { get; }
}


public class AuthorizePolicy : Enumeration, IAuthorizePolicy
{
    public const string PostingsRead = "POSTINGS_READ";
    public const string PostingsWrite = "POSTINGS_WRITE";

    public static readonly AuthorizePolicy PostingsReadPolicy = new(
        PostingsRead,
        new[] { new RequiredPermission("/memos/{id}", PermissionAction.Read) });

    public static readonly AuthorizePolicy PostingsWritePolicy = new(
        PostingsWrite,
        new[] { new RequiredPermission("/memos/{id}", PermissionAction.Write) });

    private AuthorizePolicy(string key, RequiredPermission[] permissions) : base(key)
    {
        Permissions = permissions;
    }

    public RequiredPermission[] Permissions { get; }
}
