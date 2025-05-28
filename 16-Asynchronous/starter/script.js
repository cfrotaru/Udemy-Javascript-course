'use strict';
import { Countries } from './countries.js';

const btn = document.querySelector('.btn-country');
const inputCountry = document.querySelector('.input-country');
const btnRender = document.querySelector('.btn-render-countries');
const searchForm = document.querySelector('.country-search');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
const countries = new Countries();
const countryName = 'argentina';

// btnRender.addEventListener('click', function () {
//   countriesContainer.innerHTML = '';
//   countries.getCountryDataByNameFromApi(inputCountry.value);
// });

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = '';
  countries.getCountryDataByNameFromApi(inputCountry.value);
});
