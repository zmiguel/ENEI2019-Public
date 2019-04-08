using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using api.Dtos;
using Microsoft.AspNetCore.Identity;
using api.Models;
using System.Net.Http;

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

        [HttpGet("/jogoenei")]
        [AllowAnonymous]
        public IActionResult jogoENEI(){
                 return View("Views/Landing/jogo.cshtml");
        }
        [HttpGet("/level1ctf")]
        [AllowAnonymous]
        public IActionResult  level1()
        {   
               return View("Views/Landing/1stpage.cshtml");
        }
         [AllowAnonymous]
        [HttpGet("")]
       
        public IActionResult landingPage()
        {

            return View("Views/Landing/index.cshtml");
        }
        [AllowAnonymous]

        [HttpGet("/reset/{user}")]
        public async Task<IActionResult> resetPassword(string user)
        {

         
            using (var client = new HttpClient())
            {
                try
                {
                    var url = "https://tickets.enei.pt/internal/api/User/ResetPassword?code=" + user;

                    //  client.DefaultRequestHeaders.Add("Authorization", "Bearer " + a.token);
                    var response = await client.GetStringAsync(url);
                
                    return View("Views/Landing/resetPage.cshtml");
                }
                catch (HttpRequestException a)
                {

                    return View("Views/Landing/resetError.cshtml");
                    // return NotFound(a);
                }



            }

        }
        [HttpGet("/app")]
        [AllowAnonymous]
        public IActionResult appPage()
        {

            return View("Views/Landing/app.cshtml");
        }


        [HttpGet("/ctf")]
        [AllowAnonymous]
        public IActionResult ctfPage()
        {

            return View("Views/Landing/ctf.cshtml");
        }


 [AllowAnonymous]
        [Route("{*url}", Order = 999)]
        public IActionResult CatchAll()
        {
            Response.StatusCode = 404;
            return View("Views/Landing/notFound.cshtml");
        }


    }
}