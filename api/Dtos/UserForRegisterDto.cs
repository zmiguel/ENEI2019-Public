using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string username {get;set;}

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must specify password between 4 and 8 cars")]
        public string password{get;set;}
        public string fullname {get;set;}
        public string gender {get;set;}
        public int age{get;set;}
        public int phone{get;set;}
        public string email{get;set;}
        public string university{get;set;}
        public string adress{get;set;}
        public string country{get;set;}
        public string city{get;set;}
        public string linkedin{get;set;}
        public DateTime lastlogin {get;set;}
        public DateTime registed{get;set;}
        public string qrcode{get;set;}
        public string role{get;set;}
        public string degree{get;set;}
        public int schoolyear{get;set;}
        public string profileicon {get;set;}
        public string company{get;set;}
        public string position{get;set;}   
        public string about{get;set;}

    }
}