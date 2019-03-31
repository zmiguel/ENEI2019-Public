using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;

        public UsersController(IUsersRepository repo, IMapper mapper, RoleManager<Role> roleManager, UserManager<User> UserManager)
        {
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = UserManager;
            _repo = repo;

        }

        [AllowAnonymous]
        [HttpGet("getProfileImage/{QRcode}")]
        public async Task<IActionResult> getProfileImage(string QRcode)
        {

            var user = _repo.getProfileImageAsync(QRcode);



            if (user.Result != null)
            {


                return Ok(user.Result);
            }

            return NotFound();
        }


        [HttpPost("changeProfileImage")]
        public async Task<IActionResult> changeProfileImage(profileImage i)
        {

            User a = new User();

            var cenas = await _repo.changeProfileImage(i);

            return Ok(cenas);
        }
        //
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {

            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }



        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("updateAll")]
        public async Task<IActionResult> UpdateUsers(updateUsersDTO[] req)
        {
            try
            {
                foreach (var user in req)
                {

                }

                return Ok(req);
            }
            catch (Exception e)
            {

            }
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdate)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized(); //garante que é o próprio pode aceder à sua informação

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdate, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"updating user {id} failed on save");
        }


        [HttpPut("update/{id}")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> UpdateUserById(int id, UserForUpdateDto userForUpdate)
        {

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdate, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new System.Exception($"updating user {id} failed on save");
        }



        //adiciona uma nova role à base de dados
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("addRole")]
        public IActionResult addRole(Role role)
        {

            _roleManager.CreateAsync(role).Wait();

            return Ok();
        }

    }
}