using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class QRToScan
    {
        [Required]
        public string UserQR{get;set;}      //QR do User que ler
        
        [Required]
        public string ScanQR{get;set;}      //QR a analisar
    }
}