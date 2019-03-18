using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class TeamRemoveMEmber
    {
        [Required]
        public int TeamID{get;set;}    //teamid
        
        [Required]
        public string UserQR{get;set;}      //user qr

        [Required]
        public string UserToRemoveQR{get;set;}      //user qr

    }
}