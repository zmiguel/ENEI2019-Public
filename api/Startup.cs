﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddAutoMapper();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IEventsRepository, EventsRepository>();
            services.AddScoped<ITeamsRepository, TeamsRepository>();
            services.AddScoped<IEventLocsRepository, EventLocsRepository>();
            services.AddScoped<IEventLocsVisitedRepository, EventLocsVisitedRepository>();
            
            //define a connection string indicada em appsettings.json
            services.AddDbContext<DataContext>(x=>x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
           
           
            IdentityBuilder builder = services.AddIdentityCore<User>(Options=>
            {
             //mudar isto no fim por questoes de segurança 
             Options.Password.RequireDigit = false;
             Options.Password.RequiredLength=4;
             Options.Password.RequireNonAlphanumeric= false;
             Options.Password.RequireUppercase= false;
            
            }
            );

            builder=  new IdentityBuilder(builder.UserType,typeof(Role),builder.Services);

            builder.AddEntityFrameworkStores<DataContext>();

            builder.AddRoleValidator<RoleValidator<Role>>();

            builder.AddRoleManager<RoleManager<Role>>();

            builder.AddSignInManager<SignInManager<User>>();
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options=> {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                   ValidateIssuer = false,
                   ValidateAudience= false,
                };
            });

            services.AddAuthorization(options => {
                options.AddPolicy("RequireAdminRole",policy => policy.RequireRole("Admin"));
                //adicionar mais roles aqui
            });
            
            services.AddMvc(Options=> 
            {
                var policy= new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                Options.Filters.Add(new AuthorizeFilter(policy));

            }
            ).
                SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //cors support 
            services.AddCors();
            services.AddMvc();
            //autenticação para o token
           

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //globar exception handler ∏
                app.UseExceptionHandler(builder => {
                    
                    builder.Run(async context => {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    var error= context.Features.Get<IExceptionHandlerFeature>();

                        if(error!= null){
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    }); 
             });
              //  app.UseHsts();
            }

          // app.UseHttpsRedirection();

          //cores supporte
          app.UseCors(x=>x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
         app.UseAuthentication();
         app.UseMvc();
        }
    }
}