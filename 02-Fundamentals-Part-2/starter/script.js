"use strict";

const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
const bills = [125, 555, 44];
let tips = [];
let totals = [];
bills.forEach((value) => {
  tips.push(calcTip(value));
  totals.push(calcTip(value) + value);
});
console.log(bills, tips, totals);

// let dataSet = 0;
// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
// const checkWinner = (avgDolphins, avgKoalas) => {
//   dataSet++;
//   console.log(`Data set: ${dataSet}`);
//   if (avgDolphins >= avgKoalas * 2) {
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//     return;
//   }

//   if (avgDolphins * 2 <= avgKoalas) {
//     console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//     return;
//   }

//   console.log(`No team wins!`);
//   return;
// };

// checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49));
// checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27));
