using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models

{
    public class Team
    {
        public int Id{get;set;}                         //id
        public int EventId{get;set;}                    //equipa para o evento ID
        public string Nome{get;set;}                    //Nome da equipa

        [ForeignKey("CapID")]
        public User Cap{get;set;}                       //Capitao da equipa
        public int NMembros {get;set;}                  //Numero de Membros na equipa
        public int Pontos {get;set;}                    //Postos da equipa
    }
}