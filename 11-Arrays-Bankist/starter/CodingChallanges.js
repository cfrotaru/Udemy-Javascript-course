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
}
