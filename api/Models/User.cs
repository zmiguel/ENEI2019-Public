using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace api.Models

{
    public class User: IdentityUser<int>
    {
       public string fullName{get;set;}
       public string university{get;set;}
        public string QRcode{get;set;}
        public ICollection<UserRole> UserRoles{get;set;}
        public ICollection<Log> logsFebrada{get;set;}
        public ICollection<Log> logsFestarola{get;set;}
        public ICollection<Photo> Photos {get;set;}
        public int drinks{get;set;}
        public int food{get;set;}

        [ForeignKey("teamID")]
        public Team team{get;set;}

        public string cromos {get;set;}
        public string profileImage{get;set;}
    }
}