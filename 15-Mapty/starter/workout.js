'use strict';

class Workout {
  constructor({ id, type, distance, duration, day, month, lat, lng }) {
    this.id = id;
    this.type = type;
    this.distance = +distance;
    this.duration = +duration;
    this.day = day;
    this.month = month;
    this.lat = lat;
    this.lng = lng;
    this.workoutIcon;
  }
}

class Running extends Workout {
  constructor({ id, distance, duration, cadence, day, month, lat, lng }) {
    super({
      id,
      distance,
      duration,
      day,
      month,
      lat,
      lng,
    });
    this.type = 'running';
    this.pace = (this.duration / this.distance).toFixed(1);
    this.workoutIcon = '🏃‍♂️';
    this.cadence = +cadence;
    this.title = `Running on ${this.month} ${this.day}`;
    this.popupContent = `${this.workoutIcon} ${this.title}`;
  }
}

class Cycling extends Workout {
  constructor({ id, distance, duration, elevation, day, month, lat, lng }) {
    super({
      id,
      distance,
      duration,
      day,
      month,
      lat,
      lng,
    });
    this.type = 'cycling';
    this.speed = (this.distance * (60 / this.duration)).toFixed(1);
    this.workoutIcon = '🚴‍♀️';
    this.elevation = +elevation;
    this.title = `Cycling on ${this.month} ${this.day}`;
    this.popupContent = `${this.workoutIcon} ${this.title}`;
  }
}
