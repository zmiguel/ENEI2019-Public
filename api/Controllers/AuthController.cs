using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace api.Controllers
{
    [AllowAnonymous]
    [Route("api/")]
    [ApiController]

    public class AuthController : ControllerBase
    {

        private readonly IConfiguration config;
        public UserManager<User> _userManager { get; }
        public SignInManager<User> _signInManager { get; }
        public IUsersRepository _repo { get; }
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly System.Net.Http.IHttpClientFactory clientFactory;

        public AuthController(IConfiguration config, UserManager<User> UserManager, SignInManager<User> SignInManager, IMapper mapper, RoleManager<Role> roleManager, IUsersRepository repo, System.Net.Http.IHttpClientFactory clientFactory)
        {
             _mapper = mapper;
            _roleManager = roleManager;
            _repo = repo;
            this.clientFactory = clientFactory;
            this.config = config;
            _userManager = UserManager;
            _signInManager = SignInManager;
            
        }
     

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userToRegister)
        {
            var userToCreate = _mapper.Map<User>(userToRegister);

            var result = await _userManager.CreateAsync(userToCreate, userToRegister.password);
            
            if (result.Succeeded)
            {
                return StatusCode(201);
            }
            return BadRequest(result.Errors);

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto UserForLoginDto)
        {
            //retorno 500
            var user = await _userManager.FindByNameAsync(UserForLoginDto.Username);


            var result = await _signInManager.CheckPasswordSignInAsync(user, UserForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == UserForLoginDto.Username.ToUpper());

                return Ok(new
                {

                    token = GenerateJwtToken(appUser).Result
                });

            }
            return Unauthorized();

        }

        [HttpPost("loginQR")]
        public async Task<IActionResult> loginQr(UserForLoginDto userLoginDTO){
            
                var token= "_A6q1cVGa12QutCrYCsYETfz9nPspnbcnPqjD-87kDaYPr99ArEfpdRTbkEzA4p-WEJzPFQhsMX7nG5BmUm0E6RTju8vQHnaTjGd80NIqUCr-jXefUtGwyl6I00fGD4sN6psW714JnCFuZRbtZbIXsdIRKmD3b8YUpPo2lvYP8SzjoEgACyabj13T3CLpHF43PI8Dvny6ylW6j0ka5qGNvw5MHVvYFURUPiTA7hlxoyQ35eOqHE8-eIiLNSTUJW7q-o8CxIGqGWSkltKPxbrY-Xo5iYagUucesqmj64VxYs";
                using (var client = new HttpClient())
                {
                    try{
                        
                        var url = "http://enei2019.uingress.com/internal/api/Attendee/Detail";
                    
                        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
                    

                        var response = await client.GetStringAsync(url);

                        Console.WriteLine(response);

                        //var resource = JObject.Parse(response);
                    
                        return Ok(response);

                    }catch(Exception e){

                        Console.WriteLine(e);

                        return Unauthorized();

                    }
                    

                }
        }


        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
          {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach(var role in roles) {
                claims.Add(new Claim(ClaimTypes.Role,role));
            }

            //obtem a key na app settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            //faz hashing da key na app settings
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //criamos um token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims), 
                //data de expiração (atual + 24 horas)
                Expires = DateTime.Now.AddDays(1),

                //passa as signing credentials definidas em cima
                SigningCredentials = creds
            };

            //criamos um token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            //em seguida criamos o token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}