using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class UserRole: IdentityUserRole<int>
    {
        public User User{get;set;}

        public Role Role{get;set;}
    }
}