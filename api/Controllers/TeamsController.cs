using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TeamsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ITeamsRepository _repo;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        public TeamsController(DataContext context,ITeamsRepository repo, IMapper mapper,RoleManager<Role> roleManager,UserManager<User> UserManager)
        {
            this.context = context;
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = UserManager;
            _repo = repo;
        }
        
        // GET api/teams
        // GET all teams
        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
          var Teams = await _repo.GetTeams();
          return Ok(Teams);
        }

        // GET api/teams/e/[id]
        // GET all teams for event id
        [HttpGet("e/{id}")]
        public async Task<IActionResult> GetTeamsEvent(int id)
        {
          var Teams = await _repo.GetEventTeam(id);
          return Ok(Teams);
        }
    }
}
