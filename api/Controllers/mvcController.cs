using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using api.Dtos;
using Microsoft.AspNetCore.Identity;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("/")]
    public class mvcController : Controller
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public mvcController(DataContext context, UserManager<User> userManager)
        {
           _context = context;
            _userManager = userManager;
        }


        [HttpGet("")]
        [AllowAnonymous]
        public  IActionResult landingPage() {

            return View("Views/Landing/index.cshtml");
        }


        [HttpGet("/app")]
        [AllowAnonymous]
        public  IActionResult appPage() {

            return View("Views/Landing/app.cshtml");
        }

       
        


        
    }
}