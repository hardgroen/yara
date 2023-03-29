using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yara.Services.Postings.Presentation.DataContracts.ViewModels;
using Yara.Services.Postings.Presentation.Infra.Authorization;

namespace Yara.Services.Postings.Presentation.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcePermissionsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<ResourcePermissionViewModel[]> GetPermissions()
        {
            var permissions = User.GetPermissions();
            
            return Ok(permissions.Select(p => new ResourcePermissionViewModel { 
                Actions = p.Actions.Select(a => a.ToString()), 
                ResourceId = p.Id.ToString(),
            }));
        }
    }
}
