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

            var user =await Context.Users.FirstOrDefaultAsync(x=> x.Username== username);
            
            if(user==null)
            {
                return null;
            }

            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt))
                
                return null;


            return user;

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
              var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for(int i=0; i< computedHash.Length; i++)
                {
                    if(computedHash[i]!= passwordHash[i]) return false;
                }
                return true;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
        public async Task<User> Register(User user, string Password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(Password,out passwordHash, out passwordSalt);

            user.PasswordHash=passwordHash;
           
            user.PasswordSalt=passwordSalt;

            await Context.Users.AddAsync(user);
           
            await Context.SaveChangesAsync();

           return user;

        }


        public async Task<bool> UserExists(string username)
        {
            if(await Context.Users.AnyAsync(x=>x.Username== username))
            {
                return true;
            }
            return false;
        }
    }
}