'use strict';
import { Countries } from './countries.js';

const btn = document.querySelector('.btn-country');
const inputCountry = document.querySelector('.input-country');
const inputLat = document.querySelector('.input-lat');
const inputLng = document.querySelector('.input-lng');
const btnRender = document.querySelector('.btn-render-countries');
const countryNameForm = document.querySelector('.country-search');
const countryCoordsForm = document.querySelector('.coords-search');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
const countries = new Countries();
const countryName = 'argentina';
const images = document.querySelector('.images');
let image;
const clearAndRenderCurrentCountry = function () {
  countriesContainer.innerHTML = '';
  countries.renderCurrentCountryAndNeighbours.call(countries);
};
btn.addEventListener('click', clearAndRenderCurrentCountry);

countryNameForm.addEventListener('submit', function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = '';
  countries.getCountryDataByNameFromApi(inputCountry.value);
});

countryCoordsForm.addEventListener('submit', function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = '';
  countries.getCountryAndNeighboursByLatLng(inputLat.value, inputLng.value);
});

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() > 0.5) {
      resolve('You win');
    } else {
      reject(new Error('You lost'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!'))
  .then(x => console.error(x))
  .catch(err => console.log(err));

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      image = img;
      images.append(image);
      resolve(image);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

createImage(`img/img-1.jpg`)
  .then(() => {
    return wait(2);
  })
  .then(() => {
    image.style.display = 'none';
    return createImage(`img/img-2.jpg`);
  })
  .then(() => wait(2))
  .then(() => {
    image.style.display = 'none';
  })
  .catch(err => console.log(err));

await countries.get3Countries('Romania', 'Bulgaria', 'Moldova');
