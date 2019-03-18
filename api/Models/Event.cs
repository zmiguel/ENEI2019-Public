using System;
using System.Collections.Generic;

namespace api.Models

{
    public class Event
    {
        public int Id{get;set;}         //id
        public String Nome{get;set;}    //nome
        public String Desc{get;set;}    //descrição
        public String imagem{get;set;}

        public String horas{get;set;}

        public bool aDecorrer{get;set;}

        public string localizacao{get;set;}

        public string notas{get;set;}

        public string custo{get;set;}
        
    }
}