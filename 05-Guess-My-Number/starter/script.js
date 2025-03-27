'use strict';
let againBtn = document.querySelector('.again');
let checkBtn = document.querySelector('.check');
let input = document.querySelector('.guess');
let currentScoreField = document.querySelector('.score');
let highScoreField = document.querySelector('.highscore');
let numberField = document.querySelector('.number');
let secretNumber = getRandomNumber();
let messageField = document.querySelector('.message');
let body = document.body;
console.log(secretNumber);

let currentScore = 20;
let highScore = 0;
let gameFinished = false;

againBtn.addEventListener('click', resetGame);
checkBtn.addEventListener('click', checkNumber);

const displayMessage = function (message) {
  messageField.textContent = `${message}`;
};

const resetGame = function () {
  currentScore = 20;
  currentScoreField.textContent = '20';
  numberField.textContent = '?';
  input.value = '';
  displayMessage('Start guessing...');
  gameFinished = false;
  secretNumber = getRandomNumber();
  body.style.backgroundColor = '#222';
  numberField.style.width = '15rem';
};

const getRandomNumber = function () {
  return Math.floor(Math.random() * 20) + 1;
};

const checkNumber = function () {
  let inputNumber = parseInt(input.value);
  if (gameFinished) {
    return;
  }
  if (inputNumber > 20 || inputNumber < 1 || inputNumber == NaN) {
    displayMessage('Please enter a number between 1 and 20!');
    return;
  }
  if (inputNumber !== secretNumber) {
    currentScore--;
    currentScoreField.textContent = currentScore;
    if (currentScore < 1) {
      displayMessage('Game Over!!!');
      body.style.backgroundColor = 'red';
      gameFinished = true;
      return;
    }
    if (inputNumber < secretNumber) displayMessage('Too low!');
    if (inputNumber > secretNumber) displayMessage('Too high!');
    return;
  }

  winGame();
};

const winGame = function () {
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreField.textContent = highScore;
  }
  body.style.backgroundColor = '#60b347';
  numberField.textContent = secretNumber;
  displayMessage(`Congratulations! You've guessed the number!!!`);
  numberField.style.width = '30rem';
  gameFinished = true;
};
