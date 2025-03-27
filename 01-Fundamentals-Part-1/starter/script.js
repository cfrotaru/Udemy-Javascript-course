/** P1 CC #1 #2
let setPersonDetails = (mass, height) => {
  return {
    mass: mass,
    height: height,
    BMI: mass / height ** 2,
  };
};

let markHigherBMI = (mark, john) => mark.BMI > john.BMI;
let createNiceAnswer = (mark, john) => {
  console.log(mark, john, markHigherBMI(mark, john));
  return markHigherBMI(mark, john)
    ? `Mark's BMI (${mark.BMI}) is higher than John's (${john.BMI})!`
    : `Mark's BMI (${mark.BMI}) is not higher than John's (${john.BMI})!`;
};

let mark = setPersonDetails(78, 1.69);
let john = setPersonDetails(92, 1.95);

console.log(
  `TEST DATA 1:
    `,
  mark,
  john,
  createNiceAnswer(mark, john)
);

mark = setPersonDetails(95, 1.88);
john = setPersonDetails(85, 1.76);

console.log(
  `TEST DATA 2:
    `,
  mark,
  john,
  createNiceAnswer(mark, john)
);
*/

/** P1 CC #3
let calculateArrayAverage = (array) =>
  (
    array.reduce((sum, currentElement) => sum + currentElement, 0) /
    array.length
  ).toFixed(2);

let calculateGameAverages = (array) => {
  let averages = [];
  array.forEach((game) => averages.push(calculateArrayAverage(game)));
  return averages;
};

let dolphinsScores = [
  [96, 108, 89],
  [97, 112, 101],
  [97, 112, 101],
];
let koalasScores = [
  [89, 91, 110],
  [109, 95, 123],
  [109, 95, 106],
];

let dolphinsAvgScores = calculateGameAverages(dolphinsScores);
let koalasAvgScores = calculateGameAverages(koalasScores);

let gamesAverages = [];
dolphinsAvgScores.forEach((value, index) => {
  gamesAverages.push([value, koalasAvgScores[index]]);
});

gamesAverages.forEach((value, index) => {
  if ((value[0] < 100) & (value[1] < 100))
    console.log(
      `Both teams have under 100 points, nobody has won (${value[0]} vs ${value[1]})`
    );
  else if (value[0] > value[1])
    console.log(`Dolphins have won (${value[0]} vs ${value[1]})`);
  else if (value[0] < value[1])
    console.log(`Koalas have won (${value[1]} vs ${value[0]})`);
  else
    console.log(
      `Koalas and Dolphins tied with an average score of: ${value[0]}`
    );
});

console.log(dolphinsAvgScores, koalasAvgScores);
*/

/** P1 CC #4

let billTipTotalCalculator = (bill) => {
  let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  let total = bill + tip;
  let data = { bill, tip, total };
  console.log(data);
  return data;
};

let bills = [275, 40, 430];

bills.forEach((element) => {
  let data = billTipTotalCalculator(element);
  console.log(
    `The bill was ${data.bill}, the tip was ${data.tip}, and the total value ${data.total}`
  );
});
*/

/** P2 CC #1
let calculateArrayAverage = (array) =>
  (
    array.reduce((sum, currentElement) => sum + currentElement, 0) /
    array.length
  ).toFixed(2);

let calculateGameAverages = (array) => {
  let averages = [];
  array.forEach((game) => averages.push(calculateArrayAverage(game)));
  return averages;
};

let dolphinsScores = [
  [44, 23, 71],
  [97, 112, 101],
];
let koalasScores = [
  [65, 54, 49],
  [23, 34, 27],
];

let dolphinsAvgScores = calculateGameAverages(dolphinsScores);
let koalasAvgScores = calculateGameAverages(koalasScores);

let gamesAverages = [];
dolphinsAvgScores.forEach((value, index) => {
  gamesAverages.push([value, koalasAvgScores[index]]);
});

gamesAverages.forEach((value, index) => {
  if (value[0] >= value[1] * 2)
    console.log(`Dolphins have won (${value[0]} vs ${value[1]})`);
  else if (value[1] >= value[0] * 2)
    console.log(`Koalas have won (${value[1]} vs ${value[0]})`);
  else
    console.log(`No team won! (Dolphins: ${value[0]} vs Koalas: ${value[1]})`);
});

console.log(dolphinsAvgScores, koalasAvgScores);
*/

//** P2 CC #2 done previously

/** P2 CC #3 
let setPersonDetails = (name, mass, height) => {
  return {
    name,
    mass,
    height,
    BMI: (mass / height ** 2).toFixed(2),
  };
};

let markHigherBMI = (mark, john) => mark.BMI > john.BMI;
let createNiceAnswer = (mark, john) => {
  return markHigherBMI(mark, john)
    ? `${mark.name.split(" ")[0]}'s BMI (${mark.BMI}) is higher than ${
        john.name.split(" ")[0]
      }'s (${john.BMI})!`
    : `${john.name.split(" ")[0]}'s BMI (${john.BMI}) is higher than ${
        mark.name.split(" ")[0]
      }'s (${mark.BMI})!`;
};

let mark = setPersonDetails("Mark Miller", 78, 1.69);
let john = setPersonDetails("John Smith", 92, 1.95);

console.log(`TEST DATA 1:`, createNiceAnswer(mark, john));

mark = setPersonDetails("Mark Miller", 95, 1.88);
john = setPersonDetails("John Smith", 85, 1.76);

console.log(`TEST DATA 2:`, createNiceAnswer(mark, john));
*/

/** P2 CC #4 

let billTipTotalCalculator = (bill) => {
  let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  let total = bill + tip;
  let data = { bill, tip, total };
  console.log(data);
  return data;
};

let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

bills.forEach((element) => {
  let data = billTipTotalCalculator(element);
  console.log(
    `The bill was ${data.bill}, the tip was ${data.tip}, and the total value ${data.total}`
  );
});
*/

/** Developer skills & Editor Setup CC #1 
let printForecast = (temperatures) => {
  temperatures.forEach((temperature, index) =>
    console.log(` ${temperature}ºC in ${index + 1} days ...`)
  );
};

let dataOne = [17, 21, 23];
let dataTwo = [12, 5, -5, 0, 4];

printForecast(dataOne);
printForecast(dataTwo);
*/
