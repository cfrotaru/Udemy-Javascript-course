'use strict';
import { Countries } from './countries.js';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
const countries = new Countries();
const countryName = 'romania';

await countries.getCountryDataByNameFromApi(countryName);
