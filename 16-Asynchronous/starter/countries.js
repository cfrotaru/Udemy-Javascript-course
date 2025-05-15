'use strict';

export class Countries {
  #data;
  #countryData;
  constructor() {
    this.#initData();
  }

  async #initData() {
    await this.#fetchCountriesData();
  }

  #getCountryLinkByName(countryName) {
    return `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}?fullText=true`;
  }

  #getCountryLinkByCode(countryCode) {
    return `https://restcountries.com/v3.1/alpha/${countryCode.toLowerCase()}`;
  }

  async #fetchCountriesData() {
    try {
      if (!this.#data) {
        const res = await fetch('./countries.json');
        if (!res.ok) throw new Error('Failed to fetch country data');
        this.#data = await res.json();
      }
    } catch (err) {
      console.error('Error fetching country:', err);
      return null;
    }
  }

  async getCountryData(countryName) {
    try {
    } catch (error) {}
    if (!this.#data) await this.#fetchCountriesData();
    const country = this.#data.find(
      c =>
        c.name.common.toLowerCase() === countryName.toLowerCase() ||
        c.altSpellings.some(s => s.toLowerCase() === countryName.toLowerCase())
    );

    return country || null;
  }

  async getCountryDataByNameFromApi(countryName) {
    const request = new XMLHttpRequest();
    request.open('GET', this.#getCountryLinkByName(countryName));
    request.send();
    request.addEventListener('load', () => {
      const [data] = JSON.parse(request.responseText);
      data.flagURL = this.getFlagURL(data.cca2);
      this.#renderCountry(data);
      console.log(data);
      data.borders.forEach(countryCode => {
        this.#getCountryDataByCodeFromApi(countryCode);
      });
    });
  }

  async #getCountryDataByCodeFromApi(countryCode) {
    const request = new XMLHttpRequest();
    request.open('GET', this.#getCountryLinkByCode(countryCode));
    request.send();
    request.addEventListener('load', () => {
      const [data] = JSON.parse(request.responseText);
      data.flagURL = this.getFlagURL(data.cca2);
      this.#renderCountry(data, 'neighbour');
    });
  }

  getFlagURL(code) {
    return `https://flagcdn.com/${code.toLowerCase()}.svg`;
  }

  #renderCountry(data, className = '') {
    const html = `<article class="country ${className}">
            <img class="country__img" src="${data.flagURL}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${Object.values(
                data.languages
              ).join(', ')}</p>
              <p class="country__row"><span>💰</span>${Object.keys(
                data.currencies
              ).join(', ')}</p>
            </div>
          </article>`;
    console.log(html);
    const countriesContainer = document.querySelector('.countries');

    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  }
}
