using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface ITeamsRepository
    {
      
        Task<IEnumerable<Team>> GetTeams();
        Task<List<Team>> GetEventTeam(int id);
        Task<Team> GetUserTeam(String QR);
      

    }
}