'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const markers = [];

let map;
let lat;
let lng;
let markerId = 0;

const createMarker = function (markerOptions) {
  const marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        minWidth: 100,
        maxWidth: 250,
        autoClose: false,
        closeOnClick: false,
        className: `${markerOptions.type}-popup`,
      })
    )
    .setPopupContent(`${markerOptions.getPopupContent()}`)
    .openPopup();
  marker.id = markerOptions.id;
  marker.lat = lat;
  marker.lng = lng;
  markers.push(marker);
  console.log(markers);
};

const createMarkerListItem = function (markerOptions) {
  console.log(markerOptions);
  const innerHtml = `<li class="workout workout--${
    markerOptions.type
  }" data-id="${markerOptions.id}">
          <h2 class="workout__title">${markerOptions.getTitle()}</h2>
          <div class="workout__details">
            <span class="workout__icon">${markerOptions.getWorkoutIcon()}</span>
            <span class="workout__value">${markerOptions.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${markerOptions.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${markerOptions.getSpeed()}</span>
            <span class="workout__unit">${markerOptions.getSpeedUnit()}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${markerOptions.getCadenceOrElevationIcon()}</span>
            <span class="workout__value">${markerOptions.getCadenceOrElevation()}</span>
            <span class="workout__unit">${markerOptions.getCadenceOrElevationUnit()}</span>
          </div>
        </li>`;

  form.insertAdjacentHTML('afterend', innerHtml);
  createMarker(markerOptions);
};

const startMarkerForm = function (mapEvent) {
  form.reset();
  lat = mapEvent.latlng.lat;
  lng = mapEvent.latlng.lng;

  form.classList.remove('hidden');
};

const createMarkerOptions = function () {
  const formData = new FormData(form);
  const date = new Date();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const markerOptions = {
    id: ++markerId,
    type: inputType.value,
    distance: formData.get('distance'),
    duration: formData.get('duration'),
    cadence: formData.get('cadence'),
    elevation: formData.get('elevation'),
    day,
    month,
    getTitle() {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} on ${
        this.month
      } ${this.day}`;
    },
    getSpeed() {
      return this.type === 'running'
        ? (this.duration / this.distance).toFixed(1)
        : this.distance * (60 / this.duration); //if is running, then it shows how many minutes it takes per KM, if cycling, KM per Hour
    },
    getSpeedUnit() {
      return this.type === 'running' ? 'MIN/KM' : 'KM/H';
    },
    getWorkoutIcon() {
      return this.type === 'running' ? '🏃‍♂️' : '🚴‍♀️';
    },
    getCadenceOrElevation() {
      return this.type === 'running' ? this.cadence : this.elevation;
    },
    getCadenceOrElevationUnit() {
      return this.type === 'running' ? 'SPM' : 'M';
    },
    getCadenceOrElevationIcon() {
      return this.type === 'running' ? '🦶🏼' : '⛰';
    },
    getPopupContent() {
      return `${this.getWorkoutIcon()} ${this.getTitle()}`;
    },
  };
  return markerOptions;
};

const submitForm = function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const fields = [
    { name: 'Distance', key: 'distance' },
    { name: 'Duration', key: 'duration' },
    inputType.value === 'cycling'
      ? { name: 'Elevation', key: 'elevation' }
      : { name: 'Cadence', key: 'cadence' },
  ];

  const missingOrInvalid = fields
    .filter(f => {
      const value = formData.get(f.key);
      return !value || isNaN(value) || Number(value) <= 0;
    })
    .map(f => f.name);

  if (missingOrInvalid.length)
    return alert(
      `Please fill in valid numbers for: ${missingOrInvalid.join(', ')}`
    );
  createMarkerListItem(createMarkerOptions());
  form.reset();
  form.classList.add('hidden');
};

form.addEventListener('submit', submitForm);

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    map = L.map('map').setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.on('click', startMarkerForm);
    console.log(`https://www.google.com/maps/@${latitude},${longitude},20z`);
  },
  function () {
    alert(`Could not get your position!`);
  }
);
const goToWorkout = function (e) {
  if (e.target.classList.contains('workout') || e.target.closest('.workout')) {
    const id = Number(e.target.closest('.workout').dataset.id);
    const marker = markers.find(m => m.id === id);
    console.log(marker);
    map.setView([marker.lat, marker.lng], 14);
  }
};
containerWorkouts.addEventListener('click', goToWorkout);
