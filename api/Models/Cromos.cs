using System;
using System.Collections.Generic;

namespace api.Models

{
    public class Cromos
    {
        public int Id{get;set;}             //id
        public String QRCode{get;set;}      //QR
        public String Nome{get;set;}        //Nome
        public String DescLocked{get;set;}  //descrição nao visto
        public String DescUnlocked{get;set;}//descrição visto
        public String DescMostrar{get;set;} //descrição a mostrar
        public Photo img {get;set;}         //imagem
        
    }
}