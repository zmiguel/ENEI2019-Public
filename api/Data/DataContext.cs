using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : IdentityDbContext<User,Role,int,IdentityUserClaim<int>,
    UserRole,IdentityUserLogin<int>,IdentityRoleClaim<int>,IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options):base(options) { }
    
        public DbSet<Value> Values{get;set;}

        public DbSet<Photo> Photos {get;set;}

        public DbSet<Team> Teams {get;set;}


    protected override void OnModelCreating(ModelBuilder builder)
    {
       base.OnModelCreating(builder);


        //para o ef saber as relações 
       builder.Entity<UserRole>(userRole =>
       {
           userRole.HasKey(ur=> new {ur.UserId, ur.RoleId});

           userRole.HasOne( ur=>ur.Role)
           .WithMany(r=>r.UserRoles)
           .HasForeignKey(ur=> ur.RoleId)
           .IsRequired();


           userRole.HasOne( ur=>ur.User)
           .WithMany(r=>r.UserRoles)
           .HasForeignKey(ur=> ur.UserId)
           .IsRequired();
           
       });
    }
    
    }
}