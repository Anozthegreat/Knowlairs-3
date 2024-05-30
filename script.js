// script.js
document.addEventListener('DOMContentLoaded', () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    let playerHand = [];
    let dealerHand = [];
    let playerScore = 0;
    let dealerScore = 0;
    let gameOver = false;
    let dealerRevealed = false;

    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerScoreDiv = document.getElementById('dealer-score');
    const playerScoreDiv = document.getElementById('player-score');
    const messageDiv = document.getElementById('message');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const restartButton = document.getElementById('restart-button');

    const dealSound = document.getElementById('deal-sound');
    const hitSound = document.getElementById('hit-sound');
    const standSound = document.getElementById('stand-sound');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const tieSound = document.getElementById('tie-sound');

    function playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    function createDeck() {
        deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
        shuffleDeck();
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function dealCard(hand) {
        const card = deck.pop();
        hand.push(card);
        return card;
    }

    function calculateScore(hand) {
        let score = 0;
        let aceCount = 0;

        for (let card of hand) {
            if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
                score += 10;
            } else if (card.value === 'A') {
                score += 11;
                aceCount += 1;
            } else {
                score += parseInt(card.value);
            }
        }

        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount -= 1;
        }

        return score;
    }

    function updateScores() {
        playerScore = calculateScore(playerHand);
        dealerScore = calculateScore(dealerHand);
        playerScoreDiv.textContent = `Score: ${playerScore}`;
        if (dealerRevealed) {
            dealerScoreDiv.textContent = `Score: ${dealerScore}`;
        }
    }

    function displayCard(card, container) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.textContent = card.value + getSuitSymbol(card.suit);
        container.appendChild(cardDiv);
    }

    function getSuitSymbol(suit) {
        switch (suit) {
            case 'hearts':
                return '♥';
            case 'diamonds':
                return '♦';
            case 'clubs':
                return '♣';
            case 'spades':
                return '♠';
        }
    }

    function resetGame() {
        deck = [];
        playerHand = [];
        dealerHand = [];
        playerScore = 0;
        dealerScore = 0;
        gameOver = false;
        dealerRevealed = false;
        dealerCardsDiv.innerHTML = '';
        playerCardsDiv.innerHTML = '';
        messageDiv.textContent = '';
        dealerScoreDiv.textContent = 'Score: 0';
        playerScoreDiv.textContent = 'Score: 0';
        hitButton.disabled = false;
        standButton.disabled = false;
        createDeck();
        startGame();
    }

    function startGame() {
        dealCard(playerHand);
        dealCard(dealerHand);
        dealCard(playerHand);
        dealCard(dealerHand);

        updateScores();

        displayCard(playerHand[0], playerCardsDiv);
        displayCard(playerHand[1], playerCardsDiv);

        const dealerFirstCard = dealerHand[0];
        const dealerSecondCard = dealerHand[1];
        displayCard(dealerFirstCard, dealerCardsDiv);
        displayHiddenCard(dealerSecondCard, dealerCardsDiv);
    }

    function displayHiddenCard(card, container) {
        const hiddenCardDiv = document.createElement('div');
        hiddenCardDiv.classList.add('card', 'hidden-card');
        container.appendChild(hiddenCardDiv);
    }

    function revealDealerHand() {
        dealerRevealed = true;
        dealerCardsDiv.innerHTML = '';
        for (let card of dealerHand) {
            displayCard(card, dealerCardsDiv);
        }
        updateScores();
    }

    function checkGameOver() {
        if (playerScore > 21) {
            playSound(loseSound);
            messageDiv.textContent = 'You bust! Dealer wins.';
            gameOver = true;
        } else if (dealerScore > 21) {
            playSound(winSound);
            messageDiv.textContent = 'Dealer busts! You win.';
            gameOver = true;
        } else if (dealerRevealed && dealerScore >= 17) {
            if (playerScore > dealerScore) {
                playSound(winSound);
                messageDiv.textContent = 'You win!';
            } else if (playerScore < dealerScore) {
                playSound(loseSound);
                messageDiv.textContent = 'Dealer wins.';
            } else {
                playSound(tieSound);
                messageDiv.textContent = 'It\'s a tie!';
            }
            gameOver = true;
        }

        if (gameOver) {
            hitButton.disabled = true;
            standButton.disabled = true;
        }
    }

    hitButton.addEventListener('click', () => {
        if (!gameOver) {
            playSound(hitSound);
            const card = dealCard(playerHand);
            displayCard(card, playerCardsDiv);
            updateScores();
            checkGameOver();
        }
    });

    standButton.addEventListener('click', () => {
        if (!gameOver) {
            playSound(standSound);
            revealDealerHand();
            while (dealerScore < 17) {
                playSound(dealSound);
                const card = dealCard(dealerHand);
                displayCard(card, dealerCardsDiv);
                updateScores();
            }
            checkGameOver();
        }
    });

    restartButton.addEventListener('click', () => {
        resetGame();
    });

    // Initialize the game
    resetGame();
});


