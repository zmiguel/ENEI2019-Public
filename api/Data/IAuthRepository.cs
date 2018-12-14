using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IAuthRepository
    {
      
      Task<User> Register(User user, string Password);
      
      Task<User> Login(string username, string password);
    
    }
}