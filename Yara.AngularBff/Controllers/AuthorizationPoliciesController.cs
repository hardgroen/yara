using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yara.AngularBff.DataContracts.ViewModels;
using Yara.AngularBff.Infrastructure.Gateways;

namespace Yara.AngularBff.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationPoliciesController : ControllerBase
    {
        private readonly IPostingsGateway _postingsGateway;

        public AuthorizationPoliciesController(IPostingsGateway postingsGateway)
        {
            _postingsGateway = postingsGateway;
        }

        [HttpGet]
        public async Task<ActionResult<AuthorizePolicyViewModel[]>> GetPolicies(CancellationToken cancellationToken)
        {
            var policies = await GetAllPolicies(cancellationToken);
            return Ok(MapToDtos(policies));
        }

        private async Task<IEnumerable<PostingsAuthorizationPolicies>> GetAllPolicies(CancellationToken cancellationToken)
        {
            // Get All Postings policies
            var policies = await _postingsGateway.GetAllAuthorizationPolicies(cancellationToken);
            // Get ohter policies, when there are any.

            // Return policies
            return policies;
        }

         
        private static IEnumerable<AuthorizePolicyViewModel> MapToDtos(IEnumerable<PostingsAuthorizationPolicies> policies)
        {
            return policies.Select(p => new AuthorizePolicyViewModel
            {
                Name = p.Name,
                Permissions = p.Permissions.Select(p =>
                new RequiredPemissionViewModel
                {
                    ResourceIds = p.ResourceIds,
                    Action = p.Action
                })
            });
        }
    }
}
