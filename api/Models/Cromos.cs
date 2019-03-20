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
        public string img {get;set;}         //imagem
        public string websiteCromo{get;set;} 
        public Boolean unlocked{get;set;} // se está desbloqueado ou não

        public string logo{get;set;} //logotipo para os detalhes
        public int pontos{get;set;} //pontos que este cromo concede
         
    }
}