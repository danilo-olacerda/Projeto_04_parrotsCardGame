let cards = document.querySelectorAll(".card");
let upsidedownCards = 0;
let firstCard;
let cardNumber = prompt("Com quantas cartas você quer jogar ? (Use números pares entre 4 e 14)");
let playCards=[];
let plays=0;
let corret=0;
let sec=0;
let idTimer;
time=document.querySelector(".container-timer h2");
start();
function scramble() { 
	return Math.random() - 0.5; 
}

function start () {
    if (cardNumber%2==0 && cardNumber >= 4 && cardNumber <=14){
        for (let i=0; i<cardNumber; i++) {
            playCards.push(cards[i]);
        }
        playCards = playCards.sort(scramble);

        for (let i=0; i<playCards.length; i++){
            document.querySelector(".container-game").innerHTML += `<div class="card new" onclick="turn(this)"> ${playCards[i].innerHTML} </div>`;
        }
        document.querySelector(".container-timer").classList.remove("hidden");
        idTimer = setInterval(timer, 1000);
        timer();
    }
    else {
        cardNumber = prompt("Com quantas cartas você quer jogar ? (Use números pares entre 4 e 14)");
        start();
    }
}

async function turn(el) {
    if (!el.classList.contains("rotate")) {
    if (upsidedownCards==0) {
        el.classList.add("rotate");
        firstCard=el;
        upsidedownCards++;
        plays++;
        return;
    }
    if (upsidedownCards==1) {
        plays++;
        el.classList.add("rotate");
        upsidedownCards++;
    await sleep(500);
    if (firstCard.innerHTML==el.innerHTML) {
        upsidedownCards=0;
        corret++;
    } else {
        upsidedownCards=0;
        firstCard.classList.remove("rotate");
        el.classList.remove("rotate");
    }
   }
  }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function timer () {
    sec++;
    time.innerHTML = `${sec} SEC`;
    if (corret==cardNumber/2) {
      clearInterval(idTimer);
      alert(`Você ganhou em ${plays} jogadas e levou ${sec} segundos!`);
      let reinicio = prompt('Gostaria de reiniciar a partida ? (responda com "sim" ou "não")');
      if (reinicio=="sim") {
       sec=0;
       plays=0;
       corret=0;
       for (let i=0; i<playCards.length; i++) {
  
            document.querySelector(".new").remove();
 
        }
       playCards=[];
       cardNumber=prompt("Com quantas cartas você quer jogar ? (Use números pares entre 4 e 14)");
       start();
     }
   }  
 }