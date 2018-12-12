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
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(DataContext context, UserManager<User> userManager)
        {
           _context = context;
            _userManager = userManager;
        }


        [Authorize(Policy= "RequireAdminRole")]
        [HttpGet("userWithRoles")]
        public async Task<IActionResult> GetUsersWithRole() {

            var userList= await (from user in _context.Users orderby user.UserName
                                    select new{
                                        Id = user.Id,
                                        UserName= user.UserName,
                                        Roles = (from userRole in user.UserRoles join role in _context.Roles
                                        on userRole.RoleId
                                        equals role.Id
                                        select role.Name).ToList()
                                    }
            ).ToListAsync();

            return Ok(userList);
        }

        [Authorize(Policy= "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> editRoles(string userName, RoleEditDto roleEditDto) {
            
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            //selected = selectedRoles != null ? selectedRoles : new String[] {}
            selectedRoles = selectedRoles ?? new string[] {};

            var result= await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if(!result.Succeeded)
                return BadRequest("Falha ao adicionar roles");
            
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if(!result.Succeeded)
                return BadRequest("Falha ao remover as roles");
            
            return Ok(await _userManager.GetRolesAsync(user));

        }


        
    }
}