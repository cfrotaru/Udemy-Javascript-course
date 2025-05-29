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
