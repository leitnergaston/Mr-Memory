// script.js

// Event listener para escuchar los clics en las tarjetas
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

let score = 0;
const attemptsElement = document.getElementById('attempts');
const scoreElement = document.getElementById('score');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let attempts = 0;

// Array de imágenes para las tarjetas
const cardImages = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg',
];

// Duplica las imágenes y las mezcla en el tablero
(function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cardImages.length);
        card.style.order = randomPos;
    });
})();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  
    isMatch ? disableCards() : unflipCards();
  
    attempts++;
    updateAttempts();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
  
    resetBoard();
    matches++;
    score += 10;
    updateScore();
  
    if (matches === cardImages.length) {
      setTimeout(() => {
        alert(`¡Felicidades! Has encontrado todas las parejas en ${attempts} intentos. Tu puntuación es ${score}.`);
        resetGame();
      }, 500);
    }
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1000);
  }

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Puntuación: ${score}`;
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
    matches++;
    score += 10;
    updateScore();

    if (matches === cardImages.length / 2) {
        setTimeout(() => {
          alert(`¡Felicidades! Has encontrado todas las parejas en ${attempts} intentos. Tu puntuación es ${score}.`);
          resetGame();
        }, 500);
    }
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}



function resetGame() {
    cards.forEach(card => {
      card.classList.remove('flip', 'matched');
      card.addEventListener('click', flipCard);
    });
  
    matches = 0;
    attempts = 0;
    score = 0;
    updateAttempts();
    updateScore();
  
    (function shuffle() {
      cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cardImages.length);
        card.style.order = randomPos;
      });
    })();
  }
  
  function updateAttempts() {
    attemptsElement.textContent = `Intentos: ${attempts}`;
  }
  
  function updateScore() {
    scoreElement.textContent = `Puntuación: ${score}`;
  }
