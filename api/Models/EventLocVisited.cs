using System;
using System.Collections.Generic;

namespace api.Models

{
    public class EventLocVisited
    {
        public int Id{get;set;}             //id
        public Team Team{get;set;}          //team
        public EventLoc Location{get;set;}  //location
        public DateTime timestamp{get;set;} //time

        public Boolean complete{get;set;}
    }
}