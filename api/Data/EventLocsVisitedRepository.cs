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
            var rEventLocsVisitedList = await _context.EventLocsVisited.Include(e=>e.Team).Include(e=>e.Location).ToListAsync();
            
            return rEventLocsVisitedList;
        }

        public async Task<List<EventLocVisited>> GetEventLocsVisitedTeam(int id)
        {
            List<EventLocVisited> allLocs = await _context.EventLocsVisited.Include(e=>e.Team).Include(e=>e.Location).ToListAsync();

            List<EventLocVisited> rList = new List<EventLocVisited>();
           
            for(var i=0;i<allLocs.Count;i++){
                
                EventLocVisited a=allLocs[i];
               
                if(allLocs[i].Team.Id == id){
                    
                
                        a.complete=true;
                }else{
                    a.complete=false;
                }

                rList.Add(a);
            }
            return rList;
        }

         public async Task<List<EventLocVisited>> GetEventLocsVisitedEvent(int id)
        {
            List<EventLocVisited> allLocs = await _context.EventLocsVisited.Include(e=>e.Team).Include(e=>e.Location).ToListAsync();
            List<EventLocVisited> rList = new List<EventLocVisited>();
            for(var i=0;i<allLocs.Count;i++){
                if(allLocs[i].Location.EventId == id){
                    rList.Add(allLocs[i]);
                }
            }
            return rList;
        }

    }
}