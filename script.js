const emojis = ['🍎','🍌','🍇','🍒','🍉','🥑','🍍','🥝'];
let cards = [...emojis, ...emojis]; // duplicate for pairs

let flippedCards = [];
let matchedCount = 0;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create game board
const gameBoard = document.getElementById('game-board');
cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    if (flippedCards.length === 2) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 1;
        document.getElementById('status').textContent = `Pairs matched: ${matchedCount}`;

        if (matchedCount === emojis.length) {
            document.getElementById('status').textContent = '🎉 You Win! All pairs matched!';
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card1.classList.remove('flipped');
            card2.textContent = '';
            card2.classList.remove('flipped');
        }, 800);
    }
    flippedCards = [];
}