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

  checkDogsEatingPortions(dogs) {
    //1 //2
    dogs.forEach(dog => {
      dog.recommendedFood = dog.weight ** 0.75 * 28;
      if (dog.owners.some(owner => owner === 'Sarah')) {
        if (dog.curFood < dog.recommendedFood * 0.9) {
          console.log(`Sarah's dog eats too little`);
        } else if (dog.curFood > dog.recommendedFood * 1.1) {
          console.log(`Sarah's dog eats too much`);
        } else console.log(`Sarah's dog eats a normal portion of food`);
      }
    });

    //3
    const ownersEatTooMuch = dogs
      .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
      .reduce((owners, dog) => owners.concat(dog.owners), []);
    const ownersEatTooLittle = dogs
      .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
      .reduce((owners, dog) => owners.concat(dog.owners), []);

    console.log(`ownersEatTooMuch: `, ownersEatTooMuch);
    console.log(`ownersEatTooLittle: `, ownersEatTooLittle);

    //4
    console.log(`${ownersEatTooLittle.join(' and ')}' dogs eat too little!`);
    console.log(`${ownersEatTooMuch.join(' and ')}' dogs eat too much!`);

    //5
    console.log(
      dogs.some(dog => dog.recommendedFood === dog.curFood)
        ? `#5 Yes, there is a dog eating the exact recommended amount of food`
        : `#5 No, there is no dog eating the exact recommended amount of food`
    );

    //6
    console.log(
      dogs.some(
        dog =>
          dog.curFood <= dog.recommendedFood * 1.1 &&
          dog.curFood >= dog.recommendedFood * 0.9
      )
        ? `#6 Yes, there is a dog eating an ok amount of food`
        : `#6 No, there is no dog eating an ok amount of food`
    );

    //7
    const dogsEatingOk = dogs.filter(
      dog =>
        dog.curFood <= dog.recommendedFood * 1.1 &&
        dog.curFood >= dog.recommendedFood * 0.9
    );
    console.log(`#7: `, dogsEatingOk);

    //8
    const dogsArr = dogs.slice();
    console.log(`dogsArr: `, dogsArr, `dogs: `, dogs);
    dogsArr.sort((a, b) => a.recommendedFood - b.recommendedFood);
    console.log(`#8: `, dogsArr);
  }
}
