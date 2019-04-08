using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class getProfileImage
    {
        [Required]
        public string QRcode{get;set;}
    
    }
}