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
const runningType = 'running';
const cyclingType = 'cycling';

class App {
  #map;
  #markers = [];
  workoutsData = [];
  _currentCoords;
  constructor() {
    this._showForm = this._showForm.bind(this);
    this._submitForm = this._submitForm.bind(this);
    this._goToWorkout = this._goToWorkout.bind(this);

    form.addEventListener('submit', this._submitForm);
    inputType.addEventListener('change', this._toggleWorkoutType);
    containerWorkouts.addEventListener('click', this._goToWorkout);
    this._loadFromLocalStorage();
    this._loadMap();
  }

  _loadFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem('workoutsData')) || [];
    this.workoutsData = saved.map(data => {
      if (data.type === runningType) return new Running(data);
      else return new Cycling(data);
    });
  }

  _loadMap() {
    let coords = [0, 0];
    this.#map = L.map('map').setView(coords, 5);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm);

    if (this.workoutsData.length) {
      this.workoutsData.forEach(data => {
        this._createWorkoutMarker(data, true);
        this._createWorkoutListItem(data);
      });
      coords = [this.workoutsData.at(-1).lat, this.workoutsData.at(-1).lng];
      this.#map.flyTo(coords, 14, {
        animate: true,
        duration: 0.5, // duration in seconds
      });
    } else {
      this._getPosition();
    }
  }
  _saveToLocalStorage() {
    localStorage.setItem('workoutsData', JSON.stringify(this.workoutsData));
  }
  _getPosition() {
    const coords = [];
    const map = this.#map;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        coords.push(latitude, longitude);
        map.flyTo(coords, 14, {
          animate: true,
          duration: 0.5, // duration in seconds
        });
      },
      function () {
        alert(`Could not get your position!`);
      }
    );
    return coords;
  }

  _showForm(mapEvent) {
    form.reset();
    inputDistance.focus();
    this._currentCoords = [mapEvent.latlng.lat, mapEvent.latlng.lng];

    form.classList.remove('hidden');
  }

  _toggleWorkoutType() {
    inputCadence.parentElement.classList.toggle('form__row--hidden');
    inputElevation.parentElement.classList.toggle('form__row--hidden');
  }

  _addWorkoutMarkerToMap(marker, workoutInfo) {
    marker
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          minWidth: 100,
          maxWidth: 250,
          autoClose: false,
          closeOnClick: false,
          className: `${workoutInfo.type}-popup`,
        })
      )
      .setPopupContent(`${workoutInfo.popupContent}`)
      .openPopup();
  }

  _createWorkoutMarker(workoutInfo, loadedFromLocalStorage = false) {
    const marker = L.marker([workoutInfo.lat, workoutInfo.lng]);
    marker.id = workoutInfo.id;
    this._addWorkoutMarkerToMap(marker, workoutInfo);
    this.#markers.push(marker);
    if (!loadedFromLocalStorage) this.workoutsData.push(workoutInfo);
  }

  _createWorkoutListItem(workoutInfo) {
    const running = workoutInfo.type === runningType;
    const innerHtml = `<li class="workout workout--${
      workoutInfo.type
    }" data-id="${workoutInfo.id}">
            <h2 class="workout__title">${workoutInfo.title}</h2>
            <div class="workout__details">
              <span class="workout__icon">${workoutInfo.workoutIcon}</span>
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
              <span class="workout__value">${
                running ? workoutInfo.pace : workoutInfo.speed
              }</span>
              <span class="workout__unit">${running ? 'MIN/KM' : 'KM/H'}</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">${running ? '🦶🏼' : '⛰'}</span>
              <span class="workout__value">${
                running ? workoutInfo.cadence : workoutInfo.elevation
              }</span>
              <span class="workout__unit">${running ? 'SPM' : 'M'}</span>
            </div>
          </li>`;

    form.insertAdjacentHTML('afterend', innerHtml);
  }

  _submitForm(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const fields = [
      { name: 'Distance', key: 'distance' },
      { name: 'Duration', key: 'duration' },
      inputType.value === cyclingType
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

    const workoutInfo = this._createWorkoutInfo();
    this._createWorkoutListItem(workoutInfo);
    this._createWorkoutMarker(workoutInfo);
    this._saveToLocalStorage();
    this._resetForm();
    form.classList.add('hidden');
  }

  _goToWorkout(e) {
    if (
      e.target.classList.contains('workout') ||
      e.target.closest('.workout')
    ) {
      const id = Number(e.target.closest('.workout').dataset.id);
      const marker = this.workoutsData.find(m => m.id === id);

      this.#map.flyTo([marker.lat, marker.lng], 14, {
        animate: true,
        duration: 0.5, // duration in seconds
      });
    }
  }

  _createWorkoutInfo() {
    const formData = new FormData(form);
    const date = new Date();
    const info = {
      id: crypto.randomUUID,
      type: inputType.value,
      distance: formData.get('distance'),
      duration: formData.get('duration'),
      cadence: formData.get('cadence'),
      elevation: formData.get('elevation'),
      day: date.getDate(),
      month: months[date.getMonth()],
      lat: this._currentCoords[0],
      lng: this._currentCoords[1],
    };
    return info.type === runningType ? new Running(info) : new Cycling(info);
  }

  _resetForm() {
    form.reset();
    inputCadence.parentElement.classList.remove('form__row--hidden');
    inputElevation.parentElement.classList.add('form__row--hidden');
  }
}

const app = new App();
