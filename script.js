const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let moves = 0;
let flippedCards = [];
let matchedCards = [];
let isGameStarted = false;
let timerInterval;
let seconds = 0;

// Função para embaralhar as cartas
function shuffleCards(array) {
    return array.sort(() => 0.5 - Math.random());
}

// Função para criar o tabuleiro do jogo
function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledCards = shuffleCards(cardsArray);
    
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card', card);
        cardElement.setAttribute('id', `card-${index}`);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Função para virar uma carta
function flipCard() {
    if (!isGameStarted) {
        startTimer();
        isGameStarted = true;
    }

    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-card');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Função para verificar se há um par
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cardsArray.length) {
            clearInterval(timerInterval);
            alert('Parabéns, você ganhou!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    moves++;
    document.getElementById('moves').textContent = moves;
    flippedCards = [];
}

// Função para iniciar o temporizador
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = seconds % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Inicializa o jogo
createBoard();
