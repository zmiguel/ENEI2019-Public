using System;

namespace api.Models

{
    public class User
    {
        public int id{get;set;}
        public string username {get;set;}
        public string fullname {get;set;}
        public string gender {get;set;}
        public int age{get;set;}
        public int phone{get;set;}
        public string email{get;set;}
        public byte[] passwordhash{get;set;}
        public byte[] passwordsalt{get;set;}
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