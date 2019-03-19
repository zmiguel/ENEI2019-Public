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
    {
        private readonly DataContext context;
        private readonly IMapper _mapper;
        public CromosController(DataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }
        
        // GET api/cromos/QR
        // GET cromos do user QR
        [HttpGet("{QR}")]
        public async Task<IActionResult> GetCromos(string QR)
        {
            int soma=0;
            var usr = await context.Users.FirstOrDefaultAsync(u=>u.QRcode == QR);
            string[] usrCromos = usr.cromos.Substring(1).Split(",");
            Console.WriteLine(usrCromos[0]);
            var allCromos = await context.Cromos.ToListAsync();

            List<Cromos> rList = new List<Cromos>();
            
            allCromos.ForEach(delegate(Cromos c){

                for(int i=0;i<usrCromos.Length;i++){
                
                    if(Int32.Parse(usrCromos[i])==c.Id){
                        soma+=c.pontos;
                        Cromos toAdd = new Cromos{Id = c.Id,Nome=c.Nome,DescMostrar=c.DescUnlocked,QRCode=c.QRCode,img=c.img, unlocked=true, websiteCromo=c.websiteCromo,pontos=c.pontos, logo=c.logo};
                        rList.Add(toAdd);

                    }else{ 

                        Cromos toAdd = new Cromos{Id = c.Id,Nome=c.Nome,DescMostrar=c.DescLocked,QRCode=c.QRCode,img=c.img , unlocked=false, websiteCromo=c.websiteCromo,pontos=c.pontos};
                        rList.Add(toAdd);
                    }
                }
            });

        cromosToReturn a= new cromosToReturn();
        a.cromos= rList;
        a.pontuacao=soma;
            return Ok(a);
        }

    }
}
