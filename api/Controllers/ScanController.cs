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
    public class ScanController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper _mapper;
        public ScanController(DataContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }
        
        // PSOT api/scan
        // POST scan de QR code
        [HttpPost]
        public async Task<ScanReturn> doScan(QRToScan ScanData)
        {
            User usr = await context.Users.FirstOrDefaultAsync(b=>b.QRcode == ScanData.UserQR);
            var allUsers = await context.Users.ToListAsync();
            var allCromos = await context.Cromos.ToListAsync();

            var userAProcurar = await context.Users.FirstOrDefaultAsync(c=>c.QRcode == ScanData.ScanQR);

            ScanReturn toReturn = new ScanReturn{tipo = -1};

            if(userAProcurar != null){
                _mapper.Map(toReturn.user,userAProcurar);
                toReturn.tipo=1;
                return toReturn;
            }else{
                allCromos.ForEach(delegate(Cromos c){
                    if(c.QRCode == ScanData.ScanQR){
                        toReturn.tipo=0;
                        usr.cromos = usr.cromos + "," + c.Id;
                        context.Users.Update(usr);
                        context.SaveChanges();

                        toReturn.resp = "Cromo Adicionado!";
                    }
                });
                
                return toReturn;
            }

            return toReturn;
        }

    }
}
