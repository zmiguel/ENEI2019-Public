using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        [Authorize(Policy= "RequireAdminRole")]
        [HttpGet("userWithRoles")]
        public IActionResult GetUsersWithRole() {

            return Ok("Só admins");
        }


        
    }
}