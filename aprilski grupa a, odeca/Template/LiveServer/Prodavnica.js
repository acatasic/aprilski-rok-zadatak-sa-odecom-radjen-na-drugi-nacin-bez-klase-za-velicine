import { Proizvod } from "./Proizvod.js";
export class Prodavnica{
    constructor (id,naziv){
    this.id=id;
    this.naziv=naziv;
    this.kontejner=null;
    }
    crtaj(host)
    {
        var divCelogPrikazaProdavnice=document.createElement("div");
        host.appendChild(divCelogPrikazaProdavnice);
        divCelogPrikazaProdavnice.className="divCelogPrikazaProdavnice";
        this.kontejner=divCelogPrikazaProdavnice;

        var divUnos=document.createElement("div");
        divCelogPrikazaProdavnice.appendChild(divUnos);
        divUnos.className="divUnos";

        var divPrikaz=document.createElement("div");
        divCelogPrikazaProdavnice.appendChild(divPrikaz);
        divPrikaz.className="divPrikaz";
        divPrikaz.innerHTML="prikaz nadjenih proizvoda";

        var divPrikaz2=document.createElement("div");
        divPrikaz2.className="divPrikaz2";
        divPrikaz.appendChild(divPrikaz2);

        this.crtajUnos(divUnos,divPrikaz,divPrikaz2);
     
    }

    crtajUnos(host,divPrikaz,divPrikaz2)
    {
        let label=document.createElement("label");
        label.innerHTML='Brend';
        host.appendChild(label);

        var divSelekt=document.createElement("div");
        host.appendChild(divSelekt);

        let sel=document.createElement("select");
        sel.name="selektBrendova";
        divSelekt.appendChild(sel);
        fetch("https://localhost:5001/Ispit/PreuzmiBrendove/"+ this.id,{
        method:"GET",
        }).then(p=>p.json().then(data=>{

            data.forEach(elem => {
            let opcija=document.createElement("option");
            opcija.value=elem.id;
            opcija.innerHTML=elem.naziv;
            sel.appendChild(opcija);
            });
        }
        ));
        
        var labelCena=document.createElement("label");
        labelCena.innerHTML="cena od :";
        host.appendChild(labelCena);

        var inputCenaOd=document.createElement("input");
        inputCenaOd.className="inputCenaOd";
        inputCenaOd.type="number";
        host.appendChild(inputCenaOd);

        var labelCenaDo=document.createElement("label");
        labelCenaDo.innerHTML="cena do :";
        host.appendChild(labelCenaDo);

        var inputCenaDo=document.createElement("input");
        inputCenaDo.className="inputCenaDo";
        inputCenaDo.type="number";
        host.appendChild(inputCenaDo);

        var divIzborVelicine=document.createElement("div");
        host.appendChild(divIzborVelicine);
        divIzborVelicine.className="divIzborVelicine";

        var NizVelicina=['S','M','L'];

            NizVelicina.forEach(elem => {
                
            let opcija=document.createElement("input");
            opcija.type="radio";
            opcija.name="izborVelicine";
            opcija.value=elem;

            let labelIzborVelicine=document.createElement("label");
            labelIzborVelicine.innerHTML=elem;
                       
            divIzborVelicine.appendChild(opcija);
            divIzborVelicine.appendChild(labelIzborVelicine); 
          
            });
    
        var dugme=document.createElement("button");
        dugme.innerHTML="Nadji";
        host.appendChild(dugme);
        
        dugme.onclick=(ev)=>{

            var izabranBrend=this.kontejner.querySelector('select[name="selektBrendova"]').value;
            var izabranaCenaOd=this.kontejner.querySelector(".inputCenaOd").value;
            var izabranaCenaDo=this.kontejner.querySelector(".inputCenaDo").value;
            var izabranaVelicina = this.kontejner.querySelector('input[type="radio"]:checked').value;
           
            var nadjenDivZaPrikaz=this.kontejner.getElementsByClassName("divPrikaz");
            var nadjenChildDiv=this.kontejner.getElementsByClassName("divPrikaz2");


            nadjenDivZaPrikaz[0].removeChild(nadjenChildDiv[0]);////////////////zato sto vraca niz pa mora da pristupis prvom elementu preko[0]
            
            
            var divPrikaz2=document.createElement("div");
            divPrikaz2.className="divPrikaz2";
            divPrikaz.appendChild(divPrikaz2);



        fetch("https://localhost:5001/Ispit/TraziProizvode/"+ this.id+"/"+izabranBrend+"/"+izabranaCenaOd+"/"+izabranaCenaDo+"/"+izabranaVelicina,{
        method:"GET",
        }).then(p=>{p.json().then(data=>{

            data.forEach(elem => {
            var noviProizvod=new Proizvod(elem.id,elem.sifra,elem.naziv,elem.kolicina,elem.velicina,elem.cena);
            console.log(noviProizvod.naziv);
         //   host.innerHTML=elem.naziv;//            var divZaPrikazProizvodaNadjen=this.kontejner.querySelector('div[name="divPrikaz2"]');//
            noviProizvod.crtajProizvod(divPrikaz,divPrikaz2,this.kontejner,this.id);
            });
        })});
    
        }
    }
    
}