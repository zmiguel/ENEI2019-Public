using System;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
    public class TeamsRepository : ITeamsRepository
    {
        public TeamsRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext _context { get; }

        public async Task<Team> GetEventTeam(int id)
        {
            var rTeam = await _context.Teams.FirstOrDefaultAsync(e=>e.EventId == id);
            
            return rTeam;
        }

        public async Task<IEnumerable<Team>> GetTeams()
        {
            var rTeams = await _context.Teams.ToListAsync();
            
            return rTeams;
        }

    }
}