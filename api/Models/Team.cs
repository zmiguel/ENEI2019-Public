using System;
using System.Collections.Generic;


namespace api.Models

{
    public class Team
    {
        public int Id{get;set;}
        public string Nome{get;set;}
        public int Event{get;set;}
        
        public ICollection<User> Users{get;set;}
        public int NumMemb{get;set;}

        public int VisitedNum{get;set;}
        public int Pontos{get;set;}

        public ICollection<EventQR> QRs{get;set;}
    }
}