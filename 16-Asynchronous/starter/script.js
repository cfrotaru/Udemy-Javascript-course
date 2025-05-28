'use strict';
import { Countries } from './countries.js';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
const countries = new Countries();
const countryName = 'argentina';

btn.addEventListener('click', function () {
  countries.getCountryDataByNameFromApi(countryName);
});
