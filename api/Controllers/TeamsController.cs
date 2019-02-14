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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class TeamsController : ControllerBase
    {

        private readonly ITeamsRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;

        public TeamsController(DataContext context, ITeamsRepository repo, IMapper mapper,UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
            _repo = repo;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            var result = await _repo.GetTeams();

            return Ok(result);
        }
    }
}