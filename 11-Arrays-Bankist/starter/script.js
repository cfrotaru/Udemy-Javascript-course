'use strict';
import AppLogic from './AppLogic.js';
import CodingChallange from './CodingChallanges.js';

//const al = new AppLogic();
console.log('script is running!!!');
//cc#1
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

//cc#2
const cc2testData1 = [5, 2, 4, 1, 15, 8, 3];
const cc2testData2 = [16, 6, 10, 5, 6, 1, 4];
cc.calcAverageHumanAge(cc2testData1);
cc.calcAverageHumanAge(cc2testData2);

//cc#3

const cc3testData1 = [5, 2, 4, 1, 15, 8, 3];
const cc3testData2 = [16, 6, 10, 5, 6, 1, 4];

cc.calcAverageHumanAge(cc3testData1);
cc.calcAverageHumanAge(cc3testData2);

//cc#4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

cc.checkDogsEatingPortions(dogs);
