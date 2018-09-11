using System;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AuthRepository : IAuthRepository
    {
        public AuthRepository(DataContext context)
        {
            Context = context;
        }

        public DataContext Context { get; }

        public async Task<User> Login(string username, string password)
        {

            var user =await Context.Users.FirstOrDefaultAsync(x=> x.UserName== username);
            
            if(user==null)
            {
                return null;
            }

            return user;

        }


        public async Task<User> Register(User user, string Password)
        {
            await Context.Users.AddAsync(user);
           
            await Context.SaveChangesAsync();

           return user;

        }

    }
}