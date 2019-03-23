using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class TeamDelete
    {
        [Required]
        public int TeamID{get;set;}    //teamid
        
        [Required]
        public string UserQR{get;set;}      //user qr

    }
}