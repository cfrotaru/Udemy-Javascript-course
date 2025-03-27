'use strict';
//import { UIUpdater as ui } from './UIUpdater.js';
import UIManager from './UIManager.js';
import Player from './Player.js';

const ui = new UIManager();

export default class GameLogic {
  init() {
    this.players = [];
    this.activePlayer;
    this.lastRoll;
    this.scoreToWin = 15;
    this.resetGame();
  }

  rollDice() {
    console.log('rollDice', this.isPlaying);
    if (this.isPlaying) {
      this.lastRoll = Math.trunc(Math.random() * 6 + 1);
      ui.updateRolledDice(this.lastRoll);
      console.log('score before roll', this.activePlayer.currentScore);
      if (this.lastRoll === 1) {
        this.rolledOne();
      } else {
        this.activePlayer.currentScore += this.lastRoll;
        ui.updatePlayerCurrentScore(this.activePlayer);
        console.log('score after roll', this.activePlayer.currentScore);
      }
    }
  }

  rolledOne() {
    this.activePlayer.resetCurrentScore();
    ui.updatePlayerCurrentScore(this.activePlayer);
    this.toggleActivePlayer();
  }

  endCurrentPlayerRound() {
    this.activePlayer.score += this.activePlayer.currentScore;
    this.activePlayer.currentScore = 0;
    ui.updatePlayerData(this.activePlayer);

    if (this.activePlayer.score >= this.scoreToWin) {
      this.gameOver();
    } else {
      this.toggleActivePlayer();
    }
  }
  resetGame() {
    this.isPlaying = true;
    console.log('resetGame');
    this.players = [new Player(0), new Player(1)];
    this.activePlayer = this.players[0];
    ui.init(this.players);
    this.initializeButtons();
  }

  gameOver() {
    this.isPlaying = false;
    ui.highlightWinner(this.activePlayer);
  }

  toggleActivePlayer() {
    console.log('toggle current player', this.activePlayer, this.players);
    ui.toggleActiveSection(this.activePlayer);
    this.activePlayer = this.players.find(
      player => player !== this.activePlayer
    );
    ui.toggleActiveSection(this.activePlayer);
  }

  initializeButtons() {
    ui.btnHoldScore.addEventListener(
      'click',
      this.endCurrentPlayerRound.bind(this)
    );
    ui.btnNewGame.addEventListener('click', this.resetGame.bind(this));
    ui.btnRollDice.addEventListener('click', this.rollDice.bind(this));
  }
}
