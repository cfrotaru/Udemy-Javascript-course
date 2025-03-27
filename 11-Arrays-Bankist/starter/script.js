'use strict';
import AppLogic from './AppLogic.js';
import CodingChallange from './CodingChallanges.js';

//const al = new AppLogic();
console.log('script is running!!!');
const juliaData = [
  [3, 5, 2, 12, 7],
  [9, 16, 6, 8, 3],
];
const kateData = [
  [4, 1, 15, 8, 3],
  [10, 5, 6, 1, 4],
];
const cc = new CodingChallange();
cc.checkDogs(juliaData[0], kateData[0]);
cc.checkDogs(juliaData[1], kateData[1]);
