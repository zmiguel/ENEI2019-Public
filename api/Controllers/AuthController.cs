using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

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

        public AuthController(IConfiguration config,UserManager<User> UserManager, SignInManager<User> SignInManager)
        {
            this.config = config;
            _userManager = UserManager;
            _signInManager = SignInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto UserForRegisterDto)
        {
          
            UserForRegisterDto.username = UserForRegisterDto.username.ToLower();
            

            var userToCreate = new User
            {
                UserName = UserForRegisterDto.username,
                FullName = UserForRegisterDto.fullname,
                Gender= UserForRegisterDto.gender,
                Age= UserForRegisterDto.age,
                Phone= UserForRegisterDto.phone,
                Email=UserForRegisterDto.email,
                Adress=UserForRegisterDto.adress,
                Country=UserForRegisterDto.country,
                City=UserForRegisterDto.city,
                linkedIn=UserForRegisterDto.linkedin,
                LastLogin=UserForRegisterDto.lastlogin,
                Registed=UserForRegisterDto.registed,
                QRcode=UserForRegisterDto.qrcode,
                Role=UserForRegisterDto.role,
                Degree=UserForRegisterDto.degree,
                SchoolYear=UserForRegisterDto.schoolyear,
                ProfileIcon=UserForRegisterDto.profileicon,
                Company=UserForRegisterDto.company,
                Position=UserForRegisterDto.position,
                About=UserForRegisterDto.about

            };


            var result = await _userManager.CreateAsync(userToCreate, UserForRegisterDto.password);

    

            if(result.Succeeded)
            {
                return StatusCode(201);
            }

            return BadRequest(result.Errors);

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto UserForLoginDto)
        {
            
          
           var user = await _userManager.FindByNameAsync(UserForLoginDto.Username);

           var result = await _signInManager.CheckPasswordSignInAsync(user,UserForLoginDto.Password, false);

            if(result.Succeeded)
            {
                var appUser= await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == UserForLoginDto.Username.ToUpper());
                
                return Ok(new {
                
                token = GenerateJwtToken(appUser)
                 });

            }
              return Unauthorized();
        
        }

        private string GenerateJwtToken(User user){
              var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            //obtem a key na app settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));
     
            //faz hashing da key na app settings
            var creds= new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

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