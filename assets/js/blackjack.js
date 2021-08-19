

let deck = [];
const letters = ['C', 'D', 'H', 'S'];
const mayors = ['A','J','Q','K']

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
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

const requestCard = () => {
    return deck.pop(_.sample(deck));
}
deckGenerator();

console.log(requestCard(), deck);
