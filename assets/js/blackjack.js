
// Las siguientes líneas me permiten generar el mazo de cartas con base en el tipo de cartas que se usan generalmetne en este juego.

let deck = [];
const letters = ['C', 'D', 'H', 'S'];
cons mayors = ['A','J','Q','K']

// Otras variables

let playerScore = 0, machineScore = 0;

// Las siguientes líneas crean variables que hacen referencias a los elementos del DOM.

const btnQueryCard = document.querySelector('#btnQueryCard');
const btnStop = document.querySelector('#btnStop')
const btnNewGame = document.querySelector('#btnNewGame')
const smallScore = document.querySelectorAll('small');
const divPlayerCards = document.querySelector('#player-cards')
const divMachineCards = document.querySelector('#machine-cards')

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
    deck = _.shuffle(deck); // La función shuffle se importa desde la librería underscore. Permite desordenar el mazo.
    return deck;
}

// Las siguientes líneas me permiten extraer una carta aleatoria del mazo. Esta función se usará dentro de la característica "Pedir carta".
const requestCard = () => {
    if (deck.length >= 1) {
        let card = deck.pop();
        return card;
    }
    else {
        throw "No hay cartas en el mazo." // throw me permite mostrar en consola mensaje de excepción.
    }
}

// Las siguientes líneas me permitirán asignar un valor a la carta que retorna la función requestCard.
const cardValue = ( card ) => {
    let value = card.substring( 0, card.length-1);  // El método substring usado sobre el string, me permite tomar determinado rango de caracteres dentro del rango completo de la cadena que es un string. 
    return isNaN(value) ? 
        (value === 'A' ? 11 : 10)
        : value * 1
} // En las anteriores líneas, después del return, se hizo uso del operador ternario para evaluar un conjunto de condiciones en pocas líneas.\

// Turno computadora.
machineTurn = ( minScore ) => {
    do {
        const card = requestCard();
        machineScore = machineScore + cardValue(card);
        smallScore[1].innerText = machineScore;

        const cardImage = document.createElement('img'); // Estas líneas permiten mostrar las imágenes de las cartas cada vez que se pida una carta.
        cardImage.src =`/assets/cards/${card}.png`;
        cardImage.classList.add('carta');
        divMachineCards.append(cardImage);

        if(minScore > 21) {
            break;
        }
    } while( (machineScore < minScore) && (minScore < 21));

    setTimeout( () => {
    if (machineScore === minScore) {
        alert("Nadie ha ganado.");
    } else if (minScore > 21) {
        alert("La máquina ha ganado.");
    } else if (machineScore > 21) {
        alert("¡Has ganado!");
    } else {
        alert("Computadora gana.")
    }},100);
}

// Las siguientes líneas generan los eventos de los botones asociados al turno del jugador.
deckGenerator();
btnQueryCard.addEventListener('click', () => {
    const card = requestCard();
    playerScore = playerScore + cardValue(card);
    smallScore[0].innerText = playerScore;

    const cardImage = document.createElement('img'); // Estas líneas permiten mostrar las imágenes de las cartas cada vez que se pida una carta.
    cardImage.src =`/assets/cards/${card}.png`;
    cardImage.classList.add('carta');
    divPlayerCards.append(cardImage);

    if (playerScore > 21) {
        btnStop.disabled = true;
        btnQueryCard.disabled = true;
        machineTurn(playerScore);
    } else if (playerScore === 21) {
        alert("¡Has ganado!");
        btnStop.disabled = true;
        btnQueryCard.disabled = true;
        machineTurn(playerScore);
    }
})

btnStop.addEventListener('click', () =>{
    btnStop.disabled = true;
    btnQueryCard.disabled = true;
    machineTurn(playerScore);
})

btnNewGame.addEventListener('click', () => {
    console.clear();
    
    deck = []
    deck = deckGenerator();
    playerScore = 0, machineScore = 0;
    
    divPlayerCards.innerHTML = " ";
    divMachineCards.innerHTML = " ";

    smallScore[0].innerHTML = " ";
    smallScore[1].innerHTML = " ";

    btnQueryCard.disabled = false;
    btnStop.disabled = false;
    
}
)
