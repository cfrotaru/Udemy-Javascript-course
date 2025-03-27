'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here's your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
};

// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);

// console.log(ordersSet);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');

// for (const order of ordersSet) console.log(order);

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// const questions = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);

// console.log(questions);

// console.log(questions.get('question'));
// console.log(questions.get(true));
// console.log(questions.get(1));

// for (const [key, value] of questions) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// let isCorrect = false;
// console.log(questions.get('question'));
// while (!isCorrect) {
//   let promptValue = Number(prompt('Your answer'));
//   console.log(promptValue);
//   console.log(questions.get(promptValue));
//   isCorrect = promptValue === questions.get('correct');
//   console.log(questions.get(isCorrect));
// }
// console.log(questions.get('question'));
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags);

// // const ingredients = [
// //   prompt(`Let's make pasta! Ingredient 1?`),
// //   prompt(`Ingredient 2?`),
// //   prompt(`Ingredient 3?`),
// // ];

// //console.log(ingredients);

// //restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// //restaurant.orderPasta(...ingredients);

// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
// const testRestaurant = { ...restaurant };
// console.log(restaurant, testRestaurant);

// testRestaurant.name = 'new Restaurant';
// console.log(restaurant, testRestaurant);

// function add(...numbers) {
//   let sum = 0;
//   numbers.forEach(function (value) {
//     sum += value;
//   });
//   return sum;
// }

// const rest1 = {
//   name: 'Capri',
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';
// console.log(rest1);
// console.log(rest2);

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// // cc1. 1.

// const [players1, players2] = game.players;
// // cc1. 2.

// const [gk, ...fieldPlayers] = [...players1];
// // cc1. 3.

// const allPlayers = [...players1, ...players2];
// // cc1. 4.

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// // cc1. 5.

// const { team1, x: draw, team2 } = game.odds;

// // cc1. 6.

// function printGoals(...playerNames) {
//   let goalsScored = 1;
//   console.log(
//     `${playerNames.length} goals were scored, the players that scored are:`
//   );
//   playerNames.sort();
//   playerNames.forEach((player, index) => {
//     if (player === playerNames[index + 1]) goalsScored++;
//     else {
//       console.log(
//         `${player} scored: ${goalsScored} ${goalsScored > 1 ? 'goals' : 'goal'}`
//       );
//       goalsScored = 1;
//     }
//   });
// }

// printGoals(...game.scored);

// // cc1. 7.

// team1 < team2 && console.log(`${game.team1} is more likely to win!`);
// team1 > team2 && console.log(`${game.team2} is more likely to win!`);

// //cc2. 1.

// game.scored.forEach((player, index) =>
//   console.log(`Goal ${index + 1}: ${player}`)
// );

// //cc2. 2.

// let sum = 0;
// console.log(Object.entries(game.odds));
// Object.entries(game.odds).forEach((_, odd) => (sum += odd));
// console.log(sum);
// console.log(`Average odd is: ${sum / Object.values(game.odds)}`);

// //cc2. 3.
// // console.log(Object.entries(game));
// // console.log(Object.entries(game.odds));
// Object.entries(game.odds).forEach(([property, odd]) => {
//   // console.log(`Property: ${property}`);
//   // console.log(`Odd: ${odd}`);
//   // console.log(`game[${property}]: ${game[property]}`);
//   let oddString = `Odd of ${
//     game[property] ? `victory ${game[property]}` : `draw`
//   } : ${odd}`;
//   console.log(oddString);
// });
// //cc2. 4.

// let scorers = {};
// game.scored.forEach(player =>
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1)
// );
// console.log(scorers);

// //CC#3
// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// //1
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// //2
// console.log(gameEvents.delete(64));

// //3
// console.log(
//   `An event happened, on average, every ${Math.round(
//     90 / gameEvents.size
//   )} minutes`
// );

// //4
// for (const [minute, event] of gameEvents) {
//   console.log(`[${minute < 46 ? 'FIRST' : 'SECOND'} HALF] ${minute}: ${event}`);
// }

// const capitalizeName = function (name) {
//   return name[0].toUpperCase() + name.toLowerCase().slice(1);
// };

// const capitalizeNames = function (names) {
//   const namesArray = names.split(' ');
//   console.log(namesArray);
//   for (const [index, name] of namesArray.entries()) {
//     console.log(`name: ${name}, index: ${index}`);
//     namesArray[index] = capitalizeName(name);
//     console.log(namesArray[index]);
//   }

//   return namesArray.join(' ');
// };

// const namesString = `anduzza florin lori cristian`;

// console.log(capitalizeNames(namesString));

// const maskCreditCard = function (number) {
//   console.log(number.toString().slice(-4).padStart(16, '*'));
// };

//CC#4
const textArea = document.createElement('textarea');
const button = document.createElement('button');
document.body.append(textArea);
document.body.append(button);

const convertUnderscoreToCamelCase = function (string) {
  const splitString = string.trim().toLowerCase().split('_');
  let camelCase = splitString[0];
  for (let index = 1; index < splitString.length; index++) {
    camelCase +=
      splitString[index][0].toUpperCase() + splitString[index].slice(1);
  }
  return camelCase;
};

const convertAllToCamelCase = function (text) {
  const splitText = text.split('\n');
  const camelCasedTextArray = [];
  let maxLength = 0;
  for (const row of splitText) {
    const camelCasedRow = convertUnderscoreToCamelCase(row);
    if (camelCasedRow.length > maxLength) maxLength = camelCasedRow.length;
    camelCasedTextArray.push(camelCasedRow);
  }

  return [camelCasedTextArray, maxLength];
};

const displayToLogConvertedText = function (text) {
  const [textArray, rowMaxLength] = convertAllToCamelCase(text);
  for (const [index, row] of textArray.entries()) {
    console.log(row.padEnd(rowMaxLength + 3, ' ') + '✅'.repeat(index + 1));
  }
};

function buttonFunction() {
  displayToLogConvertedText(textArea.value);
}

button.addEventListener('click', buttonFunction);

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const rawFlightsArray = flights.split('+');
const flightArray = [];
let maxLength = 0;

for (const information of rawFlightsArray) {
  const [rawEvent, rawFromCode, rawToCode, rawTime] = information.split(';');
  const event = `${rawEvent.includes('Delayed') ? '🔴' : ''} ${rawEvent
    .replaceAll('_', ' ')
    .trimStart()}`;
  const fromCode = rawFromCode.slice(0, 3).toUpperCase();
  const toCode = rawToCode.slice(0, 3).toUpperCase();
  const time = rawTime.replace(':', 'h');
  const flightInfo = `${event} from ${fromCode} to ${toCode} (${time})`;
  flightArray.push(flightInfo);
  if (flightInfo.length > maxLength) maxLength = flightInfo.length;
}

for (const information of flightArray) {
  console.log(information.padStart(maxLength));
}
