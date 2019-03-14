using System;
using System.Collections.Generic;

namespace api.Models

{
    public class Cromos
    {
        public int Id{get;set;}         //id
        public String QRCode{get;set;}    //QR
        public String Nome{get;set;}    //Nome
        public String DescPub{get;set;}    //descrição geral nao visto
        public String DescVis{get;set;}    //descrição visto
        
    }
}