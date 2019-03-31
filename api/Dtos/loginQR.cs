using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class loginQr
    {
        [Required]
        public string QRcode{get;set;}
         [Required]
         public string token{get;set;}

    }
}