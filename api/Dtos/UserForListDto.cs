using System;

namespace api.Dtos
{
    public class UserForListDto
    {
        public int Id{get;set;}
        public string Username{get;set;}
        public string FullName {get;set;}
        public string Gender {get;set;}
        public int Age{get;set;}
        public int Phone{get;set;}
        public string University{get;set;}
        public string Adress{get;set;}
        public string linkedIn{get;set;}
        public string QRcode{get;set;}
        public string Degree{get;set;}
        public string ProfileIcon {get;set;}
        public string About{get;set;}
        public string PhotoUrl{get;set;}
    }
}