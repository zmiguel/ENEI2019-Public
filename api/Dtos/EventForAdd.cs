using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class EventForAdd
    {
        [Required]
        public string Nome{get;set;}                    //equipa id
        
        [Required]
        public string Desc{get;set;}              //novo membro
    }
}