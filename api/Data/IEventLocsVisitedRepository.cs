using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IEventLocsVisitedRepository
    {
      
        Task<IEnumerable<EventLocVisited>> GetEventLocsVisited();
        Task<List<EventLocVisited>> GetEventLocsVisitedTeam(int id);
        Task<List<EventLocVisited>> GetEventLocsVisitedEvent(int id);
      

    }
}