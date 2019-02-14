using System;

namespace api.Models

{
    public class EventLoc
    {
        public int Id{get;set;}
        public int Event{get;set;}
        public string Nome{get;set;}
        public double Lat{get;set;}
        public double Long{get;set;}
        public string Desc{get;set;}

        public int PhotoId{get;set;}
    }
}