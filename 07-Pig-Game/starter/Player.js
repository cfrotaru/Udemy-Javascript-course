'use strict';
export default class Player {
  id;
  score;
  currentScore;

  constructor(id) {
    this.id = id;
    this.score = 0;
    this.currentScore = 0;
  }

  resetCurrentScore() {
    this.currentScore = 0;
  }
}
