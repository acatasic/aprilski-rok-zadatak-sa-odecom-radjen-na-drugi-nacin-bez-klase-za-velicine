using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Template.Models
{
    [Table("Proizvod")]
    public class Proizvod
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [Column("Sifra")]
        public int sifra{get;set;}
        
        [Column("Naziv")]
        public string naziv{get;set;}

        [Column("Kolicina")]
        public int kolicina{get;set;}

        [Column("Velicina")]
        public char velicina{get;set;}

        [Column("Cena")]
        public int cena{get;set;}
        
        public virtual Prodavnica Prodavnica {get;set;}

        [JsonIgnore]
        public List<Brend> Brend{get;set;}
       
        public Proizvod()
        {
        }
    }
}


/*using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Template.Models{
public class Proizvod{

[Key]
public int ID{get;set;}

[StringLength(30)]
public string ime{get;set;}

[StringLength(30)]
public string sifra{get;set;}

[StringLength(1)]
public string velicina{get;set;}

public int cena{get;set;}

public List<Brend> Brend{get;set;}

public int kolicina{get;set;}

[JsonIgnore]
public Prodavnica Prodavnica {get;set;}
}
}*/