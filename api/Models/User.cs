using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace api.Models

{
    public class User: IdentityUser<int>
    {
       
        public string QRcode{get;set;}
        public ICollection<UserRole> UserRoles{get;set;}
        public ICollection<Log> logsFebrada{get;set;}
        public ICollection<Log> logsFestarola{get;set;}
        public ICollection<Photo> Photos {get;set;}
        public int drinks{get;set;}
        public int food{get;set;}
   
        
    }
}