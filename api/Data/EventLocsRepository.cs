using System;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
    public class EventLocsRepository : IEventLocsRepository
    {
        public EventLocsRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext _context { get; }

        public async Task<EventLoc> GetEventLoc(int id)
        {
            var rEventLocs = await _context.EventLocs.FirstOrDefaultAsync(e=>e.Id == id);
            
            return rEventLocs;
        }

        public async Task<EventLoc> GetEventLocEvent(int id)
        {
            var rEventLocs = await _context.EventLocs.FirstOrDefaultAsync(e=>e.EventId == id);
            
            return rEventLocs;
        }

        public async Task<IEnumerable<EventLoc>> GetEventLocs()
        {
            var rEventLocs = await _context.EventLocs.ToListAsync();
            
            return rEventLocs;
        }

    }
}