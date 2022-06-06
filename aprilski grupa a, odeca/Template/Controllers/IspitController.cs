using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;///////!!!!!!dodato za tu list asinc
using Template.Models;

namespace Template.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IspitController : ControllerBase
    {
        IspitDbContext Context { get; set; }

        public IspitController(IspitDbContext context)
        {
            Context = context;
        }

        [Route("PreuzmiBrendove/{idProdavnice}")]
        [HttpGet]
        public async Task<List<Brend>> PreuzmiBrendove(int idProdavnice){
            var nadjenaProdavnica=await Context.Prodavnica.Where(p=>p.ID==idProdavnice).FirstAsync();
            var brendovi=await Context.Brend.Where(p=>p.Prodavnica.Contains(nadjenaProdavnica)).ToListAsync();
            return brendovi;
        }

        
        [Route("PreuzmiProdavnice")]
        [HttpGet]
        public async Task<List<Prodavnica>> PreuzmiProdavnice(){
            var nadjeneProdavnice=await Context.Prodavnica.ToListAsync();
            
            return nadjeneProdavnice;
        }

        [Route("TraziProizvode/{idProd}/{idBrenda}/{cenaOd}/{cenaDo}/{izabranaVelicina}")]
        [HttpGet]
        public async Task<List<Proizvod>> TraziProizvode(int idProd,int idBrenda,int cenaOd,int cenaDo,char izabranaVelicina){

            var nadjeniBrend=await Context.Brend.Where(p=>p.ID==idBrenda).FirstAsync();
            var nadjeniProizvodi=await Context.Proizvod.Where(p=>p.Prodavnica.ID==idProd && p.Brend.Contains(nadjeniBrend) && p.cena>cenaOd && p.cena<cenaDo && p.velicina==izabranaVelicina).ToListAsync();
            
            return nadjeniProizvodi;
        }

        [Route("Kupovina/{idProiz}")]
        [HttpPut]
        public async Task<ActionResult> Kupovina(int idProiz){
            var Element=await Context.Proizvod.Where(p=> p.ID==idProiz).FirstAsync();
        
                Element.kolicina--;
                if (Element.kolicina==0){

                    Context.Proizvod.Remove(Element);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno");}

                    else if (Element.kolicina==-1){
                        return BadRequest("Nema dovoljno proizvoda za realizovanje kupovine");}
                         else{
                        Context.Proizvod.Update(Element);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno");
                }
                return BadRequest("404");
                
        }
    }
}
