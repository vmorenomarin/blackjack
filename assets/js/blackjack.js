
// Las siguientes líneas me permiten generar el mazo de cartas con base en el tipo de cartas que se usan generalmetne en este juego.

let deck = [];
const letters = ['C', 'D', 'H', 'S'];
const mayors = ['A','J','Q','K']

// Otras variables

let playerPoints = 0, machinePoints = 0;

// Las siguientes líneas crean variables que hacen referencias a los elementos del HTML.

const btnQueryCard = document.querySelector('#btnQueryCard');
console.log(btnQueryCard);
const smallPoints = document.querySelectorAll('small');
const divplayerCards = document.querySelector('#player-cards')

const deckGenerator = () => {
    for ( let number = 2; number <= 10;number++ ) {
        for (let letter of letters) {
            deck.push(number + letter)
        }
    }

    for (let letter of letters ) {
        for (let mayor of mayors) {
            deck.push(mayor + letter)
        }
    }
    deck = _.shuffle(deck); // La función shufle se importa desde la librería underscore. Permite desordenar el mazo.
    console.log(deck);
    return deck;
}

// Las siguientes líneas me permiten extraer una carta aleatoria del mazo. Esta función se usará dentro de la característica "Pedir carta"
const requestCard = () => {
    if (deck.length >= 1) {
        let card = deck.pop();
        return card;
    }
    else {
        throw "No hay cartas en el mazo."
    }
}

// Las siguientes líneas me permitirán asignar un valor a la carta que retorna la función requestCard.
const cardValue = ( card ) => {
    let value = card.substring( 0, card.length-1);
    return isNaN(value) ? 
        (value === 'A' ? 11 : 10)
        : value * 1
}

// Las siguientes cuentan generan los eventos de los botones.
deckGenerator();
btnQueryCard.addEventListener('click', () => {
    const card = requestCard();
    playerPoints = playerPoints + cardValue(card);
    smallPoints[0].innerText = playerPoints;

    const cardImage = document.createElement('img');
    cardImage.src =`/assets/cards/${card}.png`;
    cardImage.classList.add('carta');
    divplayerCards.append(cardImage);

    if (playerPoints > 21) {
        console.warn("Has perdido.");
        btnQueryCard.disabled = true;
    } else if (playerPoints === 21) {
        console.warn("21, has ganado.");
    }

})

/* <img class="carta" src="/assets/cards/10C.png" alt="" ></img> */