'use strict';

class Workout {
  constructor({
    id,
    type,
    distance,
    duration,
    cadence,
    elevation,
    day,
    month,
    lat,
    lng,
  }) {
    this.id = id;
    this.type = type;
    this.distance = +distance;
    this.duration = +duration;
    this.cadence = +cadence;
    this.elevation = +elevation;
    this.day = day;
    this.month = month;
    this.lat = lat;
    this.lng = lng;
  }

  getTitle() {
    return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} on ${
      this.month
    } ${this.day}`;
  }

  getSpeed() {
    return this.type === 'running'
      ? (this.duration / this.distance).toFixed(1)
      : (this.distance * (60 / this.duration)).toFixed(1);
  }

  getSpeedUnit() {
    return this.type === 'running' ? 'MIN/KM' : 'KM/H';
  }

  getWorkoutIcon() {
    return this.type === 'running' ? '🏃‍♂️' : '🚴‍♀️';
  }

  getCadenceOrElevation() {
    return this.type === 'running' ? this.cadence : this.elevation;
  }

  getCadenceOrElevationUnit() {
    return this.type === 'running' ? 'SPM' : 'M';
  }

  getCadenceOrElevationIcon() {
    return this.type === 'running' ? '🦶🏼' : '⛰';
  }

  getPopupContent() {
    return `${this.getWorkoutIcon()} ${this.getTitle()}`;
  }
}
