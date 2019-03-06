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

        // GET api/teams/e/[id]
        // GET all teams for event id
        [HttpGet("u/{QR}")]
        public async Task<IActionResult> GetTeamsUser(String QR)
        {
          var Teams = await _repo.GetUserTeam(QR);
          return Ok(Teams);
        }

        // POST api/teams/add
        // create team
        [HttpPost("add")]
        public async Task<IActionResult> CreateTeam(TeamForAdd TeamAddDetails)
        {

          User tCap = await context.Users.FirstOrDefaultAsync(u=>u.QRcode == TeamAddDetails.capQR);

          List<User> memb = new List<User>();

          memb.Add(tCap);

          Team tAdd = new Team{EventId = TeamAddDetails.EventId, Nome = TeamAddDetails.Nome, Cap = tCap, Membros = memb, NMembros = 1, Pontos = 0};

          await context.Teams.AddAsync(tAdd);

          var result = context.SaveChanges();
          
          if (result == 1)
            {
                return StatusCode(201);
            }
          return BadRequest();
          
        }

        // POST api/teams/add/member
        // create team
        [HttpPost("add/member")]
        public async Task<IActionResult> AddTeamMember(TeamAddMember MemberToAdd)
        {

          User newMember = await context.Users.FirstOrDefaultAsync(u=>u.QRcode == MemberToAdd.newQR);

          Team tEdit = await context.Teams.Include(t=>t.Membros).FirstOrDefaultAsync(t=>t.Id == MemberToAdd.id);

          tEdit.NMembros++;
          tEdit.Membros.Add(newMember);

          context.Update(tEdit);

          var result = context.SaveChanges();
          
          return StatusCode(201);
          
        }
    }
}
