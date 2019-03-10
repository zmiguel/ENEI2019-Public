using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IEventLocsRepository
    {
      
        Task<IEnumerable<EventLoc>> GetEventLocs();
        Task<EventLoc> GetEventLoc(int id);
        Task<List<EventLoc>> GetEventLocEvent(int id);
      

    }
}