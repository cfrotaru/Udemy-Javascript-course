'use strict';

const flight = 'LH234';
const jonas = {
  name: 'Jonas',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
};

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {};

transformer('This is my new string', upperFirstWord);

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//A Closer Look at Functions
//Coding Challenge #1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer(displayResultsFn) {
    let answer = parseInt(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log('Answer1: ', answer);
    while (isNaN(answer) || answer > 3 || answer < 0) {
      console.log(
        `Your input is invalid. Please enter a number between 0 and ${
          this.options.length - 1
        }`
      );

      answer = parseInt(
        prompt(
          `${this.question}\n${this.options[0]}\n${this.options[1]}\n${this.options[2]}\n${this.options[3]}\n(Write option number)`
        )
      );
    }

    this.answers[answer]++;
    displayResultsFn();
  },
};

const displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'string') {
    console.log(`Poll results are: ${this.answers.join(', ')}`);
  }
};

const registerNewAnswer = poll.registerNewAnswer.bind(
  poll,
  displayResults.bind(poll)
);
document.querySelector('.poll').addEventListener('click', registerNewAnswer);

const testData1 = {
  answers: [5, 2, 3],
};
const testData2 = {
  answers: [1, 5, 3, 9, 6, 1],
};

displayResults.call(testData1, 'string');
displayResults.call(testData1);

displayResults.call(testData2, 'string');
displayResults.call(testData2);

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
