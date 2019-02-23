using System;
using System.Collections.Generic;

namespace api.Models

{
    public class Team
    {
        public string QRcode{get;set;}                  //QR ID code
        public int EventId{get;set;}                    //equipa para o evento ID
        public string Nome{get;set;}                    //Nome da equipa
        public User Cap{get;set;}                       //Capitao da equipa
        public ICollection<User> Membros {get;set;}     //Membros da equipa
        public int NMembros {get;set;}                  //Numero de Membros na equipa
        public int Pontos {get;set;}                    //Postos da equipa
    }
}