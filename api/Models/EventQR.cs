using System;

namespace api.Models

{
    public class EventQR
    {
        public int Id{get;set;}
        public int Event{get;set;}
        public int TeamId{get;set;}
        public int EventLocId{get;set;}
        public int Pontos{get;set;}

        public DateTime TimeGen{get;set;}

        public string QRData{get;set;}
    }
}