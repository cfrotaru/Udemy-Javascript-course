'use strict';

export default class CodingChallange {
  constructor() {}

  checkDogs(dogsJulia, dogsKate) {
    const cDogsJulia = dogsJulia.slice(1, -2);
    const juliaKateData = [...cDogsJulia, ...dogsKate];
    juliaKateData.forEach((dog, index) => {
      console.log(
        `Dog number ${index + 1} is ${
          dog >= 3 ? 'an adult,' : 'still a puppy 🐶,'
        } and is ${dog} years old`
      );
    });
  }
  calcAverageHumanAge(ages) {
    const humanAges = [];
    ages.forEach(dog => {
      if (dog <= 2) humanAges.push(2 * dog);
      else humanAges.push(16 + 4 * dog);
    });
    let average = humanAges
      .filter(age => age >= 18)
      .reduce((averageAge, age, _, arr) => averageAge + age / arr.length, 0);
    console.log(`Human Ages: ${humanAges}`);
    console.log(`Average human ages: ${average}`);
  }
}
