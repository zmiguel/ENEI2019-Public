using System;
using System.Collections.Generic;

namespace api.Models

{
    public class Event
    {
        public int Id{get;set;}
        public string Nome{get;set;}
        public string Desc{get;set;}
        public ICollection<EventLoc> Locations{get;set;}

    }
}