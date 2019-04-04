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
        public async Task<IActionResult> doScan(QRToScan ScanData)
        {
            User usr = await context.Users.FirstOrDefaultAsync(b => b.QRcode == ScanData.UserQR);
            var allUsers = await context.Users.ToListAsync();
            var allCromos = await context.Cromos.ToListAsync();

            var userAProcurar = await context.Users.FirstOrDefaultAsync(c => c.QRcode == ScanData.ScanQR);

            ScanReturn toReturn = new ScanReturn { tipo = -1 };

            if (userAProcurar != null)
            {

                UserForListDto ru = new UserForListDto();
                _mapper.Map(userAProcurar, ru);
                toReturn.user = ru;
                toReturn.tipo = 1;
                return Ok(toReturn);

            }
            else
            {
                bool repetido = false;

                allCromos.ForEach(delegate (Cromos c)
                {

                    if (c.QRCode == ScanData.ScanQR)
                    {
                        toReturn.tipo = 0;

                        string[] usrCromos = usr.cromos.Substring(1).Split(",");

                        foreach (string cromo in usrCromos)
                        {
                            Console.WriteLine("cromo: "+cromo);
                            if (ScanData.ScanQR == cromo)
                            {
                                repetido = true;
                                Console.WriteLine("cromo repetido");
                            }
                        }

                        if (!repetido)
                        {
                            usr.cromos = usr.cromos + "," + c.Id;
                            context.Users.Update(usr);
                            context.SaveChanges();
                            toReturn.resp = "Cromo Adicionado!";
                        }

                    }
                });

                if (repetido)
                {
                    return Unauthorized();
                }
                return Ok(toReturn);
            }
        }

    }
}
