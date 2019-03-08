using System;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
    public class EventLocsVisitedRepository : IEventLocsVisitedRepository
    {
        public EventLocsVisitedRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext _context { get; }

        public async Task<IEnumerable<EventLocVisited>> GetEventLocsVisited()
        {
            var rEventLocsVisitedList = await _context.EventLocsVisited.ToListAsync();
            
            return rEventLocsVisitedList;
        }

        public Task<IEnumerable<EventLocVisited>> GetEventLocsVisitedTeam(int id)
        {
            var allLocs = _context.EventLocsVisited.ToListAsync();
            allLocs.ForEach(i=>Console.Write("{0}\t", i));
            Console.WriteLine("teste");
            List<EventLocVisited> rList = new List<EventLocVisited>();
            for(var i=0;i<allLocs.Count;i++){
                if(allLocs[i].Team.Id == id){
                    rList.Add(allLocs[i]);
                }
            }
           
          return allLocs;
        }

    }
}