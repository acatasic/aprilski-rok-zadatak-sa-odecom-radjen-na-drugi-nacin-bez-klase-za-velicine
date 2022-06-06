export class Proizvod{
    constructor (id,sifra,naziv,kolicina,velicina,cena){
    this.id=id;
    this.sifra=sifra;
    this.naziv=naziv;
    this.kolicina=kolicina;
    this.velicina=velicina;
    this.cena=cena;
    this.kontejner=null;
    }
    crtajProizvod(divPrikaz,host,glavniKontejner,idProdavnice)
    {
        var divZaPrikazProizvoda=document.createElement("div");
        divZaPrikazProizvoda.className="divZaPrikazProizvoda";
        divZaPrikazProizvoda.innerHTML=this.naziv+" Kolicina: "+this.kolicina+" Velicina: "+this.velicina+" Cena: "+this.cena;
        host.appendChild(divZaPrikazProizvoda);
        this.kontejner=divZaPrikazProizvoda;

        var dugmeKupovina=document.createElement("button");
        dugmeKupovina.innerHTML="kupi";
        divZaPrikazProizvoda.appendChild(dugmeKupovina);

        dugmeKupovina.onclick=(ev)=>{
        fetch("https://localhost:5001/Ispit/Kupovina/" + this.id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(p => {
            if (p.ok) {
                alert("Uspesna kupovina");
                
/*Kod u nastavku je iskopiran iz Prodavnica.js , gde se pribavljaju svi proizvodi, isto kao i ovde nakon kupovine nekog artikla.Poboljsanje bi bilo da se azurira samo proizvod koji se kupuje,tj samo njegov div */
                var izabranBrend=glavniKontejner.querySelector('select[name="selektBrendova"]').value;
                var izabranaCenaOd=glavniKontejner.querySelector(".inputCenaOd").value;
                var izabranaCenaDo=glavniKontejner.querySelector(".inputCenaDo").value;
                var izabranaVelicina = glavniKontejner.querySelector('input[type="radio"]:checked').value;
               
                var nadjenDivZaPrikaz=glavniKontejner.getElementsByClassName("divPrikaz");
                var nadjenChildDiv=glavniKontejner.getElementsByClassName("divPrikaz2");
    
    
                nadjenDivZaPrikaz[0].removeChild(nadjenChildDiv[0]);////////////////zato sto vraca niz pa mora da pristupis prvom elementu preko[0]
                
                
                var divPrikaz2=document.createElement("div");
                divPrikaz2.className="divPrikaz2";
                divPrikaz.appendChild(divPrikaz2);
    
    
    
            fetch("https://localhost:5001/Ispit/TraziProizvode/"+ idProdavnice +"/"+izabranBrend+"/"+izabranaCenaOd+"/"+izabranaCenaDo+"/"+izabranaVelicina,{
            method:"GET",
            }).then(p=>{p.json().then(data=>{
    
                data.forEach(elem => {
                var noviProizvod=new Proizvod(elem.id,elem.sifra,elem.naziv,elem.kolicina,elem.velicina,elem.cena);
                console.log(noviProizvod.naziv);
            
                noviProizvod.crtajProizvod(divPrikaz,divPrikaz2,glavniKontejner,idProdavnice);
                });
            })});

            }
            else{
                
                alert("Neuspesna kupovina");
             

            }
        })
    }
}
}