using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CromosController : ControllerBase
    {   private readonly IUsersRepository _repo;
        private readonly DataContext context;
        private readonly IMapper _mapper;
        public CromosController(IUsersRepository repo,DataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
            _repo = repo;
        }

        // GET api/cromos/QR
        // GET cromos do user QR
      
        [HttpGet("{QR}")]

        public async Task<IActionResult> GetCromos(string QR)
        {
            int soma = 0;
            int somaCTF=0; 
            var usr = await context.Users.FirstOrDefaultAsync(u => u.QRcode == QR);
            string[] usrCromos = usr.cromos.Substring(1).Split(",");
            Console.WriteLine(usrCromos[0]);
            var allCromos = await context.Cromos.ToListAsync();

            List<Cromos> rList = new List<Cromos>();

            allCromos.ForEach(delegate (Cromos c)
            {
                Boolean found = false;
                for (int i = 0; i < usrCromos.Length; i++)
                {


                    if (Int32.Parse(usrCromos[i]) == c.Id)
                    {
                     
                        Cromos toAdd = new Cromos { Id = c.Id, Nome = c.Nome, DescMostrar = c.DescUnlocked, QRCode = c.QRCode, img = c.img, unlocked = true, websiteCromo = c.websiteCromo, pontos = c.pontos, logo = c.logo };

                        var d = rList.Find(x => x.Id == c.Id);

                        if (d != null)
                            continue;
                        else
                        {  
                            if(c.Id == 4 || c.Id==5 || c.Id==6  || c.Id==7  || c.Id==8  || c.Id==9 || c.Id==10  || c.Id==11  || c.Id==12   || c.Id==13  || c.Id==14  || c.Id==16){
                                somaCTF += c.pontos;
                            }
                            soma += c.pontos;
                            rList.Add(toAdd);
                            found = true;
                        }


                    }

                }
                if (!found)
                {


                    Cromos toAdd = new Cromos { Id = c.Id, Nome = c.Nome, DescMostrar = c.DescLocked, QRCode = c.QRCode, img = c.img, unlocked = false, websiteCromo = c.websiteCromo, pontos = c.pontos };
                    rList.Add(toAdd);

                }
            });

            cromosToReturn a = new cromosToReturn();
            a.cromos = rList;
            a.pontuacao = soma;
         

             var userFromRepo = await _repo.GetUser(usr.Id);

             userFromRepo.food   = somaCTF;
             userFromRepo.drinks = soma;


            if (await _repo.SaveAll()){}
             

            return Ok(a);
        }

    }
}
