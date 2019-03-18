using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class tokenDto
    {
       
        public string access_token{get;set;}    //teamid
        
      
        public string token_type{get;set;}      //user qr


        public int expires_in{get;set;}

        public string refresh_token{get;set;}


    }
}