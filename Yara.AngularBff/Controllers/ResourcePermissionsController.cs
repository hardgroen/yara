using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security;
using Yara.AngularBff.DataContracts.ViewModels;

namespace Yara.AngularBff.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcePermissionsController : ControllerBase
    {
        //[HttpGet]
        //public ActionResult<ResourcePermission[]> GetPermissions()
        //{
        //    //var permissions = User.GetPermissions();
        //    //// I usually map the entities to dto's, but  removed this here for simplicity
        //    //return Ok(permissions);
        //}
    }
}
