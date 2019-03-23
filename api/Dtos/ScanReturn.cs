using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos
{
    public class ScanReturn
    {
        public int tipo{get;set;}      //tipo de retorno, 0 = cromo // 1 = user

        public UserForListDto user{get;set;}    //user

        public string resp{get;set;}        //reposta
    }
}