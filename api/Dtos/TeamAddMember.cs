using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class TeamAddMember
    {
        [Required]
        public int id{get;set;}                    //equipa id
        
        [Required]
        public string newQR{get;set;}              //novo membro
    }
}