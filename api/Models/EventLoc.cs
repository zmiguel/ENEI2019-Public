using System;
using System.Collections.Generic;

namespace api.Models

{
    public class EventLoc
    {
        public int Id{get;set;}         //id
        public int EventId{get;set;}    //Event ID
        public float Lat{get;set;}      //latitude
        public float Long{get;set;}     //longitude
        public String Nome{get;set;}    //Nome da localização
        public String Desc{get;set;}    //Descrição
        public Photo Img{get;set;}      //Foto da localização
    
    }
}