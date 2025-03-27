'use strict';
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const winScore = 100;
let playing = true;

const createPlayer = function (id) {
  return {
    id,
    score: 0,
    currentScore: 0,
    fieldScore: document.querySelector(`#score--${id}`),
    fieldCurrentScore: document.querySelector(`#current--${id}`),
    updateScoreFields: function () {
      this.fieldScore.textContent = this.score;
      this.fieldCurrentScore.textContent = this.currentScore;
    },
    section: document.querySelector(`.player--${id}`),
  };
};

const players = {};
let currentPlayer;

const resetPlayers = function () {
  players[0] = createPlayer(0);
  players[1] = createPlayer(1);
  players[0].updateScoreFields();
  players[1].updateScoreFields();
};

const resetGame = function () {
  diceImg.classList.toggle('hidden', 1);
  resetPlayers();
  currentPlayer = players[0];
  players[0].section.classList.toggle('player--active', true);
  players[1].section.classList.toggle('player--active', false);
  players[0].section.classList.toggle('player--winner', false);
  players[1].section.classList.toggle('player--winner', false);
  playing = true;
};

resetGame();

const toggleCurrentPlayer = function () {
  currentPlayer.section.classList.toggle('player--active', false);
  currentPlayer = players[(currentPlayer.id + 1) % 2];
  currentPlayer.section.classList.toggle('player--active', true);
};

const endCurrentPlayerRound = function (rolledOne = false) {
  if (rolledOne) {
    console.log(rolledOne);
    currentPlayer.currentScore = 0;
    currentPlayer.updateScoreFields();
    toggleCurrentPlayer();
  } else {
    currentPlayer.score += currentPlayer.currentScore;
    currentPlayer.currentScore = 0;
    currentPlayer.updateScoreFields();
    if (currentPlayer.score >= winScore) {
      playing = false;
      currentPlayer.section.classList.toggle('player--winner', true);
      currentPlayer.section.classList.toggle('player--active', false);
      diceImg.classList.toggle('hidden', true);
    } else {
      toggleCurrentPlayer();
    }
  }
};

const rollDice = function () {
  if (playing) {
    const rolledNumber = Math.trunc(Math.random() * 6 + 1);
    diceImg.classList.toggle('hidden', 0);
    diceImg.setAttribute('src', `dice-${rolledNumber}.png`);
    if (rolledNumber === 1) {
      endCurrentPlayerRound(true);
    } else {
      currentPlayer.currentScore += rolledNumber;
      currentPlayer.updateScoreFields();
    }
  }
};

const holdScore = function () {
  endCurrentPlayerRound();
};

btnHoldScore.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', resetGame);
btnRollDice.addEventListener('click', rollDice);
