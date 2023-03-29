using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yara.Services.Postings.Presentation.DataContracts.ViewModels;
using Yara.Services.Postings.Presentation.Infra.Authorization;

namespace Yara.Services.Postings.Presentation.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationPoliciesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<AuthorizePolicyViewModel[]> GetPolicies()
        {
            var policies = Enumeration.GetAll<AuthorizePolicy>();
            var dtos = MapToDtos(policies);
            return Ok(dtos);
        }

        // in this case we map to dto's because the frontend needs it in a different format
        private static IEnumerable<AuthorizePolicyViewModel> MapToDtos(IEnumerable<AuthorizePolicy> policies)
        {
            return policies.Select(p => new AuthorizePolicyViewModel
            {
                Name = p.Key,
                Permissions = p.Permissions.Select(p => 
                new RequiredPemissionViewModel { 
                    ResourceIds = new[] { p.ResourceId }, 
                    Action = p.Action
                })
            });
        }
    }
}
