using System;

namespace api.Models

{
    public class EventLocVisited
    {
        public int Id{get;set;}
        public int Event{get;set;}
        public int TeamId{get;set;}
        public String UserQR{get;set;}
        public int QRId{get;set;}

        public DateTime Time{get;set;}
    }
}