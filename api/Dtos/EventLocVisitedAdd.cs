using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class EventLocVisitedAdd
    {
        [Required]
        public String USerQR{get;set;}    //User ID

        [Required]
        public int EventLocID{get;set;}      //Loc id

        [Required]
        public int pontos{get;set;}     //Pontos a adicionar

    }
}