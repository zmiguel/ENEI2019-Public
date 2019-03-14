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
        [HttpGet]
        public async Task<List<Cromos>> GetCromos(string QR)
        {
            var usr = await context.Users.Include(a=>a.cromos).FirstOrDefaultAsync(u=>u.QRcode == QR);
            var allCromos = await context.Cromos.ToListAsync();

            List<Cromos> rList = new List<Cromos>();
            
            allCromos.ForEach(delegate(Cromos c){
                usr.cromos.ForEach(delegate(int cid){
                    if(c.Id == cid){    //user tem o cromo
                        Cromos toAdd = new Cromos{Id = c.Id,Nome=c.Nome,DescMostrar=c.DescUnlocked,QRCode=c.QRCode,img=c.img};
                        rList.Add(toAdd);
                    }else{              //user NAO tem o cromo
                        Cromos toAdd = new Cromos{Id = c.Id,Nome=c.Nome,DescMostrar=c.DescLocked,QRCode=c.QRCode,img=c.img};
                        rList.Add(toAdd);
                    }
                });
            });
            return rList;
        }

    }
}
