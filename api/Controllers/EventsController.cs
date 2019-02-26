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
    public class EventsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IEventsRepository _repo;
        private readonly IMapper _mapper;
        public EventsController(DataContext context,IEventsRepository repo, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
            _repo = repo;
        }
        
        // GET api/events
        // GET all events
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
          var Events = await _repo.GetEvents();
          return Ok(Events);
        }

        // GET api/events/[id]
        // GET events id x
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
          var Event = await _repo.GetEvent(id);
          return Ok(Event);
        }
    }
}
