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

  getCountryAndNeighboursByLatLng(lat, lng) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`,
      {
        headers: {
          'User-Agent': 'YourAppNameHere/1.0',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(`You are in ${data.address.city}, ${data.address.country}`);
        this.getCountryDataByNameFromApi(data.address.country);
      })
      .catch(err => {
        console.error('Geolocation error:', err);
        this.showToast(`Geolocation error: ${err.message}`);
      });
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

  getCountryDataByNameFromApi(countryName) {
    return fetch(this.#getCountryLinkByName(countryName))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Country not found! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(resultData => {
        if (!Array.isArray(resultData) || resultData.length === 0) {
          throw new Error('No country data found.');
        }

        const data = resultData[0];
        data.flagURL = this.getFlagURL(data.cca2);
        this.#renderCountry(data);

        data.borders?.forEach(countryCode => {
          this.#getCountryDataByCodeFromApi(countryCode);
        });
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        this.showToast(`Error fetching country data: ${error.message}`);
      });
  }

  #getCountryDataByCodeFromApi(countryCode) {
    return fetch(this.#getCountryLinkByCode(countryCode))
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(resultData => {
        if (!Array.isArray(resultData) || resultData.length === 0) {
          throw new Error('No country data found.');
        }

        const data = resultData[0];
        data.flagURL = this.getFlagURL(data.cca2);
        this.#renderCountry(data, 'neighbour');
      })
      .catch(error => {
        console.error(
          `Error fetching data for country code ${countryCode}:`,
          error
        );
        showToast(
          `Error fetching data for country code: ${countryCode} : ${error.message}`
        );
      });
  }

  #getCurrentPositionPromise() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  renderCurrentCountryAndNeighbours() {
    this.#getCurrentPositionPromise().then(data => {
      const lat = data.coords.latitude;
      const lng = data.coords.longitude;

      this.getCountryAndNeighboursByLatLng(lat, lng);
    });
  }

  getFlagURL(code) {
    console.log(`code: ${code}`);
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
    const countriesContainer = document.querySelector('.countries');

    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  }

  showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    console.log(`toast happened`);
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}
