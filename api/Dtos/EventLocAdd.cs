using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class EventLocAdd
    {
        [Required]
        public int EventId{get;set;}    //Event ID

        [Required]
        public float Lat{get;set;}      //latitude

        [Required]
        public float Long{get;set;}     //longitude

        [Required]
        public String Nome{get;set;}    //Nome da localização

        [Required]
        public String Desc{get;set;}    //Descrição

        
        public Photo Img{get;set;}      //Foto da localização
    }
}