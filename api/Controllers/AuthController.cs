using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly Data.IAuthRepository repo;
        private readonly IConfiguration config;
        public AuthController(Data.IAuthRepository repo, IConfiguration config)
        {
            this.config = config;
            this.repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto UserForRegisterDto)
        {
            //validar a request
            UserForRegisterDto.Username = UserForRegisterDto.Username.ToLower();

            if (await repo.UserExists(UserForRegisterDto.Username))
                return BadRequest("username already exists");

            var userToCreate = new User
            {
                Username = UserForRegisterDto.Username
            };

            var createUser = await repo.Register(userToCreate, UserForRegisterDto.Password);

            return StatusCode(201);

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto UserForLoginDto)
        {
            //verifica se o utilizador existe na base de dados e se consegue fazer login
            var userFromRepo = await repo.Login(UserForLoginDto.Username.ToLower(), UserForLoginDto.Password);
            
            //Se não conseguir
            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            //o token vai ter 2 claims, uma vai ser o id e outra vai ser o nome
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
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

            //devolvemos ao cliente
            return Ok(new {
                token= tokenHandler.WriteToken(token)
            });

        }

    }
}