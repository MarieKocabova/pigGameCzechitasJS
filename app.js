/*
PRAVIDLA HRY:

- Hra má dva hráče, kteří se střídají každé kolo
- V každé kole hází hráč kostkou kolikrát chce. Hodnota každého hodu se přičítá k jeho bodů v daném kole.
- Pokud na kostce padne 1, ztrácí všechny body v daném kole a na řadu se dostává hráč dvě.
- Hráč může zvolit "dost", což znamená, že všechny body nahrané v jeho kole se přičtou k jeho celkovým bodům. Poté je na řadě hráč dvě.
- Hra končí jakmile jeden z hráčů dosáhne dopředu určeného počtu bodů (typicky 100 bodů).

*/


let body;  //kolik mají oba hráči aktuálně bodů
let bodyVKole; //kolik hodil v tomto kole
let aktivniHrac; //udržuje v sobě číslo hráče, který je na tahu
let kostka;  //hodnota, která zrovna padla na kostce
let koncoveBody //kolik bodů, aby hra skončila
let hraProbiha
let jmenoHrace0 = prompt('Zadej jméno 1. hráče:');
let jmenoHrace1 = prompt('Zadej jméno 2. hráče:');

init();

document.querySelector('.tlacitko-hod').addEventListener('click', function() {
        if (hraProbiha) {
        //získat náhodné číslo
        kostka = Math.floor(Math.random() * 6) + 1;

        //zobrazit výsledek ve hře
        let kostkaDOM = document.querySelector('.kostka');
        kostkaDOM.style.display = 'block';
        kostkaDOM.textContent = kostka;

        //aktualizovat body kola pokud padla/nepadla 1
        if (kostka !==1) {
            //přičti body
            bodyVKole += kostka;
            document.querySelector('#soucasne-' + aktivniHrac).textContent = bodyVKole;
        } else {
        dalsiHrac();
        }
    }
});

document.querySelector('.tlacitko-dost').addEventListener('click', function() {
    if (hraProbiha) {
        //Přidat současné body k celkovým bodům hráče
        body[aktivniHrac] +=bodyVKole;
        
        //aktualizovat učivatelské prostředí
        document.querySelector('#body-' + aktivniHrac).textContent = body[aktivniHrac];
        document.querySelector('.kostka').style.display = 'none';

        //Zkontrolovat zda hráč již vyhrál
        if (body[aktivniHrac] >= koncoveBody) {
            document.querySelector('#jmeno-' + aktivniHrac).textContent = "Vítěz!!!";
            document.querySelector('.hrac-'+ aktivniHrac +'-panel').classList.remove('aktivni');
            document.querySelector('.hrac-'+ aktivniHrac +'-panel').classList.add('vitez');
            document.querySelector('.kostka').style.display = 'none';
            hraProbiha = false;

        } else {
            //Přepnout hráče
            dalsiHrac();
        }
    }
});

function dalsiHrac() {
    //přepni hráče

    /* if (aktivniHrac === 0) {
        aktivniHrac = 1;
    } else {
        aktivniHrac = 0;
    } */

    //ternární operátor -> místo if/else nahoře - zkrácení
    aktivniHrac === 0 ? aktivniHrac = 1 : aktivniHrac = 0
    bodyVKole = 0

    //vynulovat body v kole    
    document.getElementById('soucasne-0').textContent = '0';
    document.getElementById('soucasne-1').textContent = '0';

    //přepnout design bloků (šedé pozadí, puntík, aktivní třída)
    document.querySelector('.hrac-0-panel').classList.toggle('aktivni');
    document.querySelector('.hrac-1-panel').classList.toggle('aktivni');
}

document.querySelector('.tlacitko-novy').addEventListener('click', init);

function init() {
     //vynuluj všechny proměnné
     body = [0, 0];
     aktivniHrac = 0;
     bodyVKole = 0;
     koncoveBody = 50;
     hraProbiha = true;
 
     document.querySelector('.kostka').style.display = 'none';
 
     document.getElementById('body-0').textContent = '0';
     document.getElementById('body-1').textContent = '0';
     document.getElementById('soucasne-0').textContent = '0';
     document.getElementById('soucasne-1').textContent = '0';

     document.querySelector('#jmeno-0').textContent = jmenoHrace0;
     document.querySelector('#jmeno-1').textContent = jmenoHrace1;

     document.querySelector('.hrac-0-panel').classList.remove('aktivni');
     document.querySelector('.hrac-1-panel').classList.remove('aktivni');
     document.querySelector('.hrac-0-panel').classList.remove('vitez');
     document.querySelector('.hrac-1-panel').classList.remove('vitez');
     document.querySelector('.hrac-0-panel').classList.add('aktivni');
}