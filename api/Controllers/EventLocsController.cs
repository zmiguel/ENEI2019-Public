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
    public class EventLocsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IEventLocsRepository _repo;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        public EventLocsController(DataContext context,IEventLocsRepository repo, IMapper mapper,RoleManager<Role> roleManager,UserManager<User> UserManager)
        {
            this.context = context;
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = UserManager;
            _repo = repo;
        }
        
        // GET api/EventLocs
        // GET all EventLocs
        [HttpGet]
        public async Task<IActionResult> GetEventLocs()
        {
          var Teams = await _repo.GetEventLocs();
          return Ok(Teams);
        }

        // GET api/EventLocs/[id]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventLoc(int id)
        {
          var Teams = await _repo.GetEventLoc(id);
          return Ok(Teams);
        }

        // GET api/EventLocs/[id]
        [HttpGet("e/{id}")]
        public async Task<IActionResult> GetEventLocEvent(int id)
        {
          var Teams = await _repo.GetEventLocEvent(id);
          return Ok(Teams);
        }

        // POST api/eventLocs/add
        // add new event
        [HttpPost("add")]
        public async Task<IActionResult> AddEventLoc(EventLocAdd EventLocData)
        {
          EventLoc EAdd = new EventLoc{EventId = EventLocData.EventId, Lat = EventLocData.Lat, Long = EventLocData.Long, Nome = EventLocData.Nome, Desc = EventLocData.Desc, Img = EventLocData.Img};
          await context.EventLocs.AddAsync(EAdd);

          var result = context.SaveChanges();
          
          if (result == 1)
            {
                return StatusCode(201);
            }
          return BadRequest();
        }
    }
}
