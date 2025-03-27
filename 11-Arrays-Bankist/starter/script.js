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
const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];
cc.calcAverageHumanAge(testData1);
cc.calcAverageHumanAge(testData2);

cc.calcAverageHumanAgeZ(testData1);
cc.calcAverageHumanAgeZ(testData2);
