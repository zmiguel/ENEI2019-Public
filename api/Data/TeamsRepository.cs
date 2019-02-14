using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class TeamsRepository : ITeamsRepository
    {
        private readonly DataContext _context;

        public TeamsRepository(DataContext context)
        {
            this._context = context;
        }
         public async Task<IEnumerable<Team>> GetTeams()
        {
            var teams = await _context.Teams.ToListAsync();
            
            return teams;
        }
    }
}