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
        public async Task<List<Cromos>> GetCromos(string QR)
        {
            var usr = await context.Users.FirstOrDefaultAsync(u=>u.QRcode == QR);
            string[] usrCromos = usr.cromos.Substring(1).Split(",");
            Console.WriteLine(usrCromos[0]);
            var allCromos = await context.Cromos.ToListAsync();

            List<Cromos> rList = new List<Cromos>();
            
            allCromos.ForEach(delegate(Cromos c){
                for(int i=0;i<usrCromos.Length;i++){
                    if(Int32.Parse(usrCromos[i])==c.Id){
                        Cromos toAdd = new Cromos{Id = c.Id,Nome=c.Nome,DescMostrar=c.DescUnlocked,QRCode=c.QRCode,img=c.img, unlocked=true, websiteCromo=c.websiteCromo,pontos=c.pontos};
                        rList.Add(toAdd);
                    }else{              //user NAO tem o cromo
                        Cromos toAdd = new Cromos{Id = c.Id,Nome=c.Nome,DescMostrar=c.DescLocked,QRCode=c.QRCode,img=c.img , unlocked=false, websiteCromo=c.websiteCromo,pontos=c.pontos};
                        rList.Add(toAdd);
                    }
                }
            });
            return rList;
        }

    }
}
