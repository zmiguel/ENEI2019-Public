using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IEventsRepository
    {
      
        Task<IEnumerable<Event>> GetEvents();
        Task<Event> GetEvent(int id);
      

    }
}