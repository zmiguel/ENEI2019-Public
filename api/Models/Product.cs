using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models

{
    public class Product
    {
         [Key()]      
         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
           public int Id{get;set;}
       public string name{get;set;}
       public int basePrice{get;set;}
       public int sold{get;set;}
       public float revenue{get;set;}

    }
}