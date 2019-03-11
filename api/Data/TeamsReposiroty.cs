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

        public async Task<List<Team>> GetEventTeam(int id)
        {
            List<Team> allTeams = await _context.Teams.Include(a=>a.Cap).ToListAsync();
            List<Team> rTeam = new List<Team>();
            allTeams.ForEach(delegate(Team t){
                if(t.EventId == id){
                    rTeam.Add(t);
                }
            });
            
            return rTeam;
        }

        public async Task<Team> GetUserTeam(String QR)
        {
            var rTeam = (await _context.Users.FirstAsync(u=>u.QRcode == QR)).team;
            
            return rTeam;
        }

        public async Task<IEnumerable<Team>> GetTeams()
        {
            var rTeams = await _context.Teams.Include(a=>a.Cap).ToListAsync();
            
            return rTeams;
        }

    }
}