using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

        public AuthController(IConfiguration config, UserManager<User> UserManager, SignInManager<User> SignInManager, IMapper mapper, RoleManager<Role> roleManager, IUsersRepository repo)
        {
             _mapper = mapper;
            _roleManager = roleManager;
            _repo = repo;
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


            var user = await _userManager.FindByNameAsync(UserForLoginDto.Username);

            var result = await _signInManager.CheckPasswordSignInAsync(user, UserForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == UserForLoginDto.Username.ToUpper());

                return Ok(new
                {

                    token = GenerateJwtToken(appUser)
                });

            }
            return Unauthorized();

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

        [Authorize]
        //adiciona uma nova role à base de dados
        [HttpPost("addRole")]
          public async Task<IActionResult> addRole( Role role) {
            
    
            _roleManager.CreateAsync(role).Wait();
            
            return Ok();
        }



        //adiciona role a um utilizador
        [HttpPost("setRole")]
        public async Task<IActionResult> setRole(setRoleDto roleDto) {

           User user = await _repo.GetUser(roleDto.Id);

            _userManager.AddToRoleAsync(user, roleDto.RoleName).Wait();

           return Ok();

        }

    
    }
}