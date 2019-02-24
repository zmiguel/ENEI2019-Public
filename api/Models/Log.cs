using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models

{
    public class Log
    {  
         [Key()] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]        public int Id{get;set;}
       //public User user{get;set;}
        public int amount{get;set;}
        public int available{get;set;}
        public Product product{get;set;}
        public string transactionId{get;set;}
        public string logType{get;set;}

    }
}