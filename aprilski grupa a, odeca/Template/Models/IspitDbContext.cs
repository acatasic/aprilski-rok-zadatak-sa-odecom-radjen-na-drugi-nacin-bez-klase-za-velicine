using Microsoft.EntityFrameworkCore;
using Template.Models;

namespace Template
{
    public class IspitDbContext : DbContext
    {
        public DbSet<Prodavnica> Prodavnica{get;set;}
        public DbSet<Proizvod> Proizvod{get;set;}
        public DbSet<Brend> Brend {get;set;}
// DbSet...

        public IspitDbContext(DbContextOptions options) : base(options)
        {

        }
    }
}
