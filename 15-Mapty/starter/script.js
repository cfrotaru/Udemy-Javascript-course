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
const saved = JSON.parse(localStorage.getItem('workoutsData')) || [];
const workoutsData = saved.map(data => new Workout(data)); // convert plain objects to class instances

const saveToLocalStorage = function () {
  localStorage.setItem('workoutsData', JSON.stringify(workoutsData));
};

let map;
let lat;
let lng;
let markerId = workoutsData.at(-1)?.id ?? 0;

const addWorkoutMarkerToMap = function (marker, workoutInfo) {
  marker
    .addTo(map)
    .bindPopup(
      L.popup({
        minWidth: 100,
        maxWidth: 250,
        autoClose: false,
        closeOnClick: false,
        className: `${workoutInfo.type}-popup`,
      })
    )
    .setPopupContent(`${workoutInfo.getPopupContent()}`)
    .openPopup();
};

const createWorkoutMarker = function (workoutInfo) {
  const marker = L.marker([workoutInfo.lat, workoutInfo.lng]);
  marker.id = workoutInfo.id;
  addWorkoutMarkerToMap(marker, workoutInfo);
  markers.push(marker);
  workoutsData.push(workoutInfo);
};

const createWorkoutListItem = function (workoutInfo) {
  const innerHtml = `<li class="workout workout--${
    workoutInfo.type
  }" data-id="${workoutInfo.id}">
          <h2 class="workout__title">${workoutInfo.getTitle()}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workoutInfo.getWorkoutIcon()}</span>
            <span class="workout__value">${workoutInfo.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workoutInfo.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workoutInfo.getSpeed()}</span>
            <span class="workout__unit">${workoutInfo.getSpeedUnit()}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${workoutInfo.getCadenceOrElevationIcon()}</span>
            <span class="workout__value">${workoutInfo.getCadenceOrElevation()}</span>
            <span class="workout__unit">${workoutInfo.getCadenceOrElevationUnit()}</span>
          </div>
        </li>`;

  form.insertAdjacentHTML('afterend', innerHtml);
};

const startMarkerForm = function (mapEvent) {
  form.reset();
  lat = mapEvent.latlng.lat;
  lng = mapEvent.latlng.lng;

  form.classList.remove('hidden');
};

const createWorkoutInfo = function () {
  const formData = new FormData(form);
  const date = new Date();

  return new Workout({
    id: ++markerId,
    type: inputType.value,
    distance: formData.get('distance'),
    duration: formData.get('duration'),
    cadence: formData.get('cadence'),
    elevation: formData.get('elevation'),
    day: date.getDate(),
    month: months[date.getMonth()],
    lat,
    lng,
  });
};
const resetForm = function () {
  form.reset();
  inputCadence.parentElement.classList.remove('form__row--hidden');
  inputElevation.parentElement.classList.add('form__row--hidden');
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

  const workoutInfo = createWorkoutInfo();
  createWorkoutListItem(workoutInfo);
  createWorkoutMarker(workoutInfo);
  saveToLocalStorage();
  resetForm();
  form.classList.add('hidden');
};

const goToWorkout = function (e) {
  if (e.target.classList.contains('workout') || e.target.closest('.workout')) {
    const id = Number(e.target.closest('.workout').dataset.id);
    const marker = workoutsData.find(m => m.id === id);

    map.flyTo([marker.lat, marker.lng], 14, {
      animate: true,
      duration: 0.5, // duration in seconds
    });
  }
};

form.addEventListener('submit', submitForm);

const initMap = function () {
  map = L.map('map').setView([0, 0], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  map.on('click', startMarkerForm);

  if (workoutsData.length) {
    workoutsData.forEach(data => {
      createWorkoutMarker(data);
      createWorkoutListItem(data);
    });
    map.flyTo([workoutsData.at(-1).lat, workoutsData.at(-1).lng], 14, {
      animate: true,
      duration: 0.5, // duration in seconds
    });
  } else {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];
        map.setView(coords, 12);
      },
      function () {
        alert(`Could not get your position!`);
      }
    );
  }
};

initMap();

const toggleWorkoutType = function () {
  inputCadence.parentElement.classList.toggle('form__row--hidden');
  inputElevation.parentElement.classList.toggle('form__row--hidden');
};

inputType.addEventListener('change', toggleWorkoutType);
containerWorkouts.addEventListener('click', goToWorkout);
