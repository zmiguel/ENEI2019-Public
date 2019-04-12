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
using AutoMapper;
using System.Collections.Generic;

namespace api.Controllers
{
    [ApiController]
    [Route("/")]
    public class mvcController : Controller
    {

        private readonly IUsersRepository _repo;
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public mvcController(IUsersRepository repo, DataContext context, IMapper mapper, UserManager<User> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            _repo = repo;
        }
        [HttpGet("/cp-ia")]
        [AllowAnonymous]

        public IActionResult cpIa()
        {
            return View("Views/Landing/cp-ia.cshtml");
        }
        [HttpGet("/cp-net")]
        [AllowAnonymous]

        public IActionResult cpNet()
        {
            return View("Views/Landing/cp-net.cshtml");
        }

        [HttpGet("/cp-md")]
        [AllowAnonymous]

        public IActionResult cpMd()
        {
            return View("Views/Landing/cp-md.cshtml");
        }

        [HttpGet("/cp-iot")]
        [AllowAnonymous]

        public IActionResult cpIot()
        {
            return View("Views/Landing/cp-iot.cshtml");
        }
        [HttpGet("/cp-ds")]
        [AllowAnonymous]

        public IActionResult cpDs()
        {
            return View("Views/Landing/cp-ds.cshtml");
        }
        [HttpGet("/cp-web")]
        [AllowAnonymous]

        public IActionResult cpWeb()
        {
            return View("Views/Landing/cp-web.cshtml");
        }
        [HttpGet("/jogoenei")]
        [AllowAnonymous]

        public IActionResult jogoENEI()
        {
            return View("Views/Landing/jogo.cshtml");
        }

        [AllowAnonymous]
        [HttpGet("/ctf/top")]
        public async Task<IActionResult> getTop()
        {
            //para cada user calcular pontos, fazer update e devolver top 5


            // var users = await _repo.GetUsers();

            //  var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
           
            var users = _context.Users.Select(user => new {Nome = user.fullName, Pontos = user.food }).OrderByDescending(x => x.Pontos).Take(10);;

          
            
            //food = soma ctf

            //drinks = soma geral

            return Ok(users);
        }

        [HttpGet("/level1ctf")]
        [AllowAnonymous]
        public IActionResult level1()
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