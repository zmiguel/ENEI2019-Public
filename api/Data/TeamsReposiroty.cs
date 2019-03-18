using System;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
    public class TeamsRepository : ITeamsRepository
    {
        public TeamsRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext _context { get; }

    }
}