using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class TeamToReturn
    {
        public int Id{get;set;}                         //id
        public int EventId{get;set;}                    //equipa para o evento ID
        public string Nome{get;set;}                    //Nome da equipa
        public UserForListDto Cap{get;set;}                       //Capitao da equipa
        public int NMembros {get;set;}                  //Numero de Membros na equipa

        public  List<UserForListDto> Membros{get;set;}
        public int Pontos {get;set;}                    //Postos da equipa
    }
}