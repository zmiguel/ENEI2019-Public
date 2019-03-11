using System;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
    public class EventsRepository : IEventsRepository
    {
        public EventsRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext _context { get; }

        public async Task<Event> GetEvent(int id)
        {
            var Event = await _context.Events.FirstOrDefaultAsync(e=>e.Id == id);
            
            return Event;
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            var Events = await _context.Events.ToListAsync();
            
            return Events;
        }

    }
}