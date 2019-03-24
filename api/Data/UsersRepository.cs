using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;
        public UsersRepository(DataContext context)
        {
            this._context = context;
        }
        public void Add<T>(T enity) where T : class
        {
            _context.Add(enity);

        }

        public async Task<User> changeProfileImage(profileImage a)
        {

            var utilizador = await _context.Users.FirstOrDefaultAsync(t => t.QRcode == a.QRcode);
            if (utilizador != null)
            {
                utilizador.profileImage = a.base64;
                
                _context.Users.Update(utilizador);

                var result = _context.SaveChanges();

                 if (result >= 1)
                {
                    return utilizador;
                }
               
                return null;
            }

            return null;
        }
        public void Delete<T>(T entity) where T : class
        {

            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;

        }

    }
}