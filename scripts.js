let cards = document.querySelectorAll(".card");
let upsidedownCards = 0;
let firstCard;
let cardNumber = prompt("Com quantas cartas você quer jogar ? (Use números pares entre 4 e 14)");
let playCards=[];
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
            document.querySelector(".container-game").innerHTML += `<div class="card" onclick="turn(this)"> ${playCards[i].innerHTML} </div>`;
        }
    }
    else {
        cardNumber = prompt("Com quantas cartas você quer jogar ? (Use números pares entre 4 e 14)");
        start();
    }
}

async function turn(el) {
    if (upsidedownCards==0) {
        el.classList.add("rotate");
        firstCard=el;
        upsidedownCards++;
        return;
    }
    if (upsidedownCards==1) {
        el.classList.add("rotate");
        upsidedownCards++;
    }
    await sleep(500);
    if (firstCard.innerHTML==el.innerHTML) {
        upsidedownCards=0;
    } else {
        upsidedownCards=0;
        firstCard.classList.remove("rotate");
        el.classList.remove("rotate");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }