using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TeamsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ITeamsRepository _repo;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        public TeamsController(DataContext context, ITeamsRepository repo, IMapper mapper, RoleManager<Role> roleManager, UserManager<User> UserManager)
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
        public async Task<List<TeamToReturn>> GetTeams()
        {
            List<Team> allTeams = await context.Teams.ToListAsync();
            List<TeamToReturn> rTeams = new List<TeamToReturn>();

            for (var i = 0; i < allTeams.Count; i++)
            {
                TeamToReturn tR = new TeamToReturn();
                _mapper.Map(allTeams[i], tR);
                var usr = await context.Users.FirstOrDefaultAsync(a => a.QRcode == allTeams[i].CapQR);
                UserForListDto uT = new UserForListDto();
                _mapper.Map(usr, uT);
                tR.Cap = uT;
                rTeams.Add(tR);
            }

            return rTeams;
        }

        // GET api/teams/e/[id]
        // GET all teams for event id
        [HttpGet("e/{id}")]
        public async Task<List<TeamToReturn>> GetTeamsEvent(int id)
        {
            List<Team> allTeams = await context.Teams.ToListAsync();
            List<TeamToReturn> rTeam = new List<TeamToReturn>();
            TeamToReturn tR = new TeamToReturn();

            for (var i = 0; i < allTeams.Count; i++)
            {
                if (allTeams[i].EventId == id)
                {
                    _mapper.Map(allTeams[i], tR);
                    var usr = await context.Users.FirstOrDefaultAsync(a => a.QRcode == allTeams[i].CapQR);
                    UserForListDto uT = new UserForListDto();
                    _mapper.Map(usr, uT);
                    tR.Cap = uT;
                    rTeam.Add(tR);
                }
            }

            return rTeam;
        }

        // GET api/teams/u/[id]
        // GET all teams for user id
        [HttpGet("u/{QR}")]
        public async Task<IActionResult> GetTeamsUser(String QR)
        {
            var rUsr = await context.Users.Include(b => b.team).FirstOrDefaultAsync(a => a.QRcode == QR);

            if (rUsr == null)
            {
                return NotFound("O utilizador não possui equipa");
            }

            List<Team> allTeams = await context.Teams.ToListAsync();


            TeamToReturn rTeam = new TeamToReturn();


            for (var i = 0; i < allTeams.Count; i++)
            {

                if (allTeams[i].Id == rUsr.team.Id)
                {
                    
                    rTeam.ativa= allTeams[i].pagamento;
                    _mapper.Map(allTeams[i], rTeam);

                    var usr = await context.Users.FirstOrDefaultAsync(a => a.QRcode == allTeams[i].CapQR);
            
                    var users = await context.Users.ToListAsync();

                    List<UserForListDto> usersToReturn = new List<UserForListDto>();

                    for (var t = 0; t < users.Count; t++)
                    {

                        if (users[t].team != null && users[t].team.Id == allTeams[i].Id)
                        {

                            UserForListDto u = new UserForListDto();

                            _mapper.Map(users[t], u);

                            usersToReturn.Add(u);
                        }
                    }

                    UserForListDto uT = new UserForListDto();

                    _mapper.Map(usr, uT);

                    rTeam.Membros = usersToReturn;
                    rTeam.Cap = uT;

                }
            }

            return Ok(rTeam);
        }

        // POST api/teams/add
        // create team
        [HttpPost("add")]
        public async Task<IActionResult> CreateTeam(TeamForAdd TeamAddDetails)
        {

            User tCap = await context.Users.Include(a => a.team).FirstOrDefaultAsync(u => u.QRcode == TeamAddDetails.capQR);

            if (tCap.team == null)
            {

                Team tAdd = new Team { EventId = TeamAddDetails.EventId, Nome = TeamAddDetails.Nome, CapQR = tCap.QRcode, NMembros = 1, Pontos = 0 };

                tCap.team = tAdd;

                await context.Teams.AddAsync(tAdd);
                context.Users.Update(tCap);

                var result = context.SaveChanges();

                if (result >= 1)
                {
                    return StatusCode(201);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }

        }

        // POST api/teams/add/member
        // create team
        [HttpPost("add/member")]
        public async Task<IActionResult> AddTeamMember(TeamAddMember MemberToAdd)
        {

            User newMember = await context.Users.FirstOrDefaultAsync(u => u.QRcode == MemberToAdd.newQR);

            Team tEdit = await context.Teams.FirstOrDefaultAsync(t => t.Id == MemberToAdd.id);

            if (newMember.team == null)
            {

                tEdit.NMembros++;
                newMember.team = tEdit;

                context.Teams.Update(tEdit);
                context.Users.Update(newMember);

                var result = context.SaveChanges();

                return StatusCode(201);

            }
            else
            {
                return StatusCode(403);
            }

        }

        // POST api/teams/ChangeName
        // create team
        [HttpPost("changename")]
        public async Task<IActionResult> ChangeName(TeamChangeName NameChange)
        {

            Team tEdit = await context.Teams.FirstOrDefaultAsync(t => t.Id == NameChange.TeamID);

            User cap = await context.Users.FirstOrDefaultAsync(u => u.QRcode == NameChange.UserQR);

            if (cap.QRcode == tEdit.CapQR)
            {
                tEdit.Nome = NameChange.nome;
            }

            context.Teams.Update(tEdit);

            var result = context.SaveChanges();

            return StatusCode(201);

        }

        // POST api/teams/delete
        // create team
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteTeam(TeamDelete DeleteData)
        {

            Team tEdit = await context.Teams.FirstOrDefaultAsync(t => t.Id == DeleteData.TeamID);

            User cap = await context.Users.FirstOrDefaultAsync(u => u.QRcode == DeleteData.UserQR);

    
            if (tEdit != null && cap.QRcode == tEdit.CapQR)
            {
                context.Teams.Remove(tEdit);
                cap.team = null;
                context.Users.Update(cap);
                var result = context.SaveChanges();
                return StatusCode(201);
            }
            else
            {
                return StatusCode(403);
            }
             
        }

        // POST api/teams/remove/member
        // remove member
        [HttpPost("remove/member")]
        public async Task<IActionResult> RemoveTeamMember(TeamRemoveMEmber MemberToRemove)
        {

            Console.WriteLine(MemberToRemove.TeamID);
            //obtem o user para remover

            try
            {
                User rmMember = await context.Users.FirstOrDefaultAsync(u => u.QRcode == MemberToRemove.UserToRemoveQR);

                Console.WriteLine(rmMember.QRcode);
               
                //encontra a equipa de onde quer remover o user
                Team tEdit = await context.Teams.FirstOrDefaultAsync(t => t.Id == MemberToRemove.TeamID);
              
                Console.WriteLine(tEdit.Nome);
              
                var id = 0;

                if (rmMember.QRcode == tEdit.CapQR)
                {
                    return StatusCode(403);
                }

                if (rmMember.team == tEdit)
                {
                    tEdit.NMembros--;
                    rmMember.team = null;

                    context.Teams.Update(tEdit);
                    context.Users.Update(rmMember);

                    var result = context.SaveChanges();

                    return StatusCode(201);
                }
                else
                {
                    return StatusCode(403);
                }
            }
            catch (Exception e)
            {
                return StatusCode(403);
            }
        }
    }
}
