'use strict';
export default class UIManager {
  diceImg;
  btnNewGame;
  btnRollDice;
  btnHoldScore;
  DICE_SELECTOR = '.dice';
  NEWGAME_BTN_SELECTOR = '.btn--new';
  ROLL_BTN_SELECTOR = '.btn--roll';
  HOLD_BTN_SELECTOR = '.btn--hold';
  init(players) {
    this.diceImg = document.querySelector(this.DICE_SELECTOR);
    this.btnNewGame = document.querySelector(this.NEWGAME_BTN_SELECTOR);
    this.btnRollDice = document.querySelector(this.ROLL_BTN_SELECTOR);
    this.btnHoldScore = document.querySelector(this.HOLD_BTN_SELECTOR);

    this.diceImg.classList.toggle('hidden', 1);
    this.resetGame(players);
  }

  resetGame(players) {
    this.getPlayerSection(players[0]).classList.toggle('player--active', true);
    this.getPlayerSection(players[1]).classList.toggle('player--active', false);
    this.getPlayerSection(players[0]).classList.toggle('player--winner', false);
    this.getPlayerSection(players[1]).classList.toggle('player--winner', false);
    this.updatePlayersData(players);
  }

  getPlayerSection(player) {
    return document.querySelector(`.player--${player.id}`);
  }

  updatePlayerScore(player) {
    document.querySelector(`#score--${player.id}`).textContent = player.score;
    console.log('this happened', player);
  }

  updatePlayerCurrentScore(player) {
    document.querySelector(`#current--${player.id}`).textContent =
      player.currentScore;
  }

  updatePlayersData(players) {
    this.updatePlayerData(players[0]);
    this.updatePlayerData(players[1]);
  }

  updatePlayerData(player) {
    this.updatePlayerCurrentScore(player);
    this.updatePlayerScore(player);
  }

  updateRolledDice(rolledNumber) {
    this.diceImg.classList.toggle('hidden', 0);
    this.diceImg.setAttribute('src', `dice-${rolledNumber}.png`);
  }

  toggleActiveSection(player) {
    this.getPlayerSection(player).classList.toggle('player--active');
  }

  highlightWinner(player) {
    this.getPlayerSection(player).classList.toggle('player--winner', true);
    this.getPlayerSection(player).classList.toggle('player--active', false);
    this.diceImg.classList.toggle('hidden', true);
  }
}
