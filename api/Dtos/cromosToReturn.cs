using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class cromosToReturn
    {
        [Required]
        public List<Cromos> cromos{get;set;}                    //equipa id
        
        [Required]
        public int pontuacao{get;set;}              //novo membro
    }
}