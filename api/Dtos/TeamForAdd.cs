using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class TeamForAdd
    {
        [Required]
        public int EventId{get;set;}                    //equipa para o evento ID

        [Required]
        public string Nome{get;set;}                    //Nome da equipa
        
        [Required]
        public string capQR{get;set;}                       //Capitao da equipa
    }
}