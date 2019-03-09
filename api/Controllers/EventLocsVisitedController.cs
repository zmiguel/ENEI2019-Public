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
    public class EventLocsVisitedController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IEventLocsVisitedRepository _repo;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        public EventLocsVisitedController(DataContext context,IEventLocsVisitedRepository repo, IMapper mapper,RoleManager<Role> roleManager,UserManager<User> UserManager)
        {
            this.context = context;
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = UserManager;
            _repo = repo;
        }
        
        // GET api/EventLocsVisited
        // GET all EventLocsVisited
        [HttpGet]
        public async Task<IActionResult> GetEventLocsVisited()
        {
          var Locs = await _repo.GetEventLocsVisited();
          return Ok(Locs);
        }

        // GET api/EventLocsVisited/t/[id]
        //All locs visited by team id
        [HttpGet("t/{id}")]
        public async Task<IActionResult> GetEventLocsVisitedTeam(int id)
        {
          var Locs = await _repo.GetEventLocsVisitedTeam(id);
          return Ok(Locs);
        }

        // GET api/EventLocsVisited/e/[id]
        //All locs visited by event id
        [HttpGet("e/{id}")]
        public async Task<IActionResult> GetEventLocsVisitedEvent(int id)
        {
          var Locs = await _repo.GetEventLocsVisitedEvent(id);
          return Ok(Locs);
        }


        // POST api/eventLocsVisited/add
        // add new event
        [HttpPost("add")]
        public async Task<IActionResult> AddEventLoc(EventLocVisitedAdd EventLocVisitedData)
        {

          List<Team> uTeam = await context.Teams.Include(t=>t.Membros).ToListAsync();
          EventLoc Loc = await context.EventLocs.FirstOrDefaultAsync(a=>a.Id == EventLocVisitedData.EventLocID);

          Team TeamToEdit = new Team();

          uTeam.ForEach(delegate (Team t){
            if(t.EventId == Loc.EventId){
              t.Membros.ForEach(delegate (User u){
                if(u.QRcode == EventLocVisitedData.USerQR){
                  TeamToEdit = t;
                }
              });
            }
          });

          TeamToEdit.Pontos += EventLocVisitedData.pontos;

          EventLocVisited toAdd = new EventLocVisited{Team = TeamToEdit,Location = Loc, timestamp = DateTime.Now};

          await context.EventLocsVisited.AddAsync(toAdd);

          context.Teams.Update(TeamToEdit);

          var result = context.SaveChanges();
          
          if (result >= 1)
            {
                return StatusCode(201);
            }
          return BadRequest();
        }

    }
}
