using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace api.Models

{
    public class User: IdentityUser<int>
    {
       
        public string FullName {get;set;}
        public string Gender {get;set;}
        public int Age{get;set;}
        public int Phone{get;set;}
        public string University{get;set;}
        public string Adress{get;set;}
        public string Country{get;set;}
        public string City{get;set;}
        public string linkedIn{get;set;}
        public DateTime LastLogin {get;set;}
        public DateTime Registed{get;set;}
        public string QRcode{get;set;}
        public string Role{get;set;}
        public string Degree{get;set;}
        public int SchoolYear{get;set;}
        public string ProfileIcon {get;set;}
        public string Company{get;set;}
        public string Position{get;set;}   
        public string About{get;set;}
        public ICollection<UserRole> UserRoles{get;set;}
        

    }
}