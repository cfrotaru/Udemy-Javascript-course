'use strict';

//CC#1 version CC#2
class Car {
  constructor(make, speed, unit = 'km/h') {
    this.make = make;
    this.unit = unit === 'mph' ? 'mph' : 'km/h';
    this.speed = speed;
  }
  logSpeed() {
    console.log(`${this.make} going at ${this.speed.toFixed(2)} ${this.unit}`);
  }
  accelerate() {
    this.speed += 10;
    this.logSpeed();
  }
  brake() {
    this.speed -= 5;
    this.logSpeed();
  }

  get speed() {
    return this._speed;
  }
  set speed(speed) {
    this._speed = speed;
  }

  setUnitToMPH() {
    if (this.unit === 'km/h') {
      this.unit = 'mph';
      this.speed /= 1.6;
      this.logSpeed();
    }
  }

  setUnitToKMH() {
    if (this.unit === 'mph') {
      this.unit = 'km/h';
      this.speed *= 1.6;
      this.logSpeed();
    }
  }
}

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);
const car3 = new Car('Ford', 120, 'mph');

car1.accelerate();
car2.accelerate();
car1.brake();
car1.brake();
car1.brake();
car2.brake();
car2.brake();
car2.accelerate();
car2.setUnitToMPH();

car3.accelerate();
car3.brake();
console.log(car3);
car3.accelerate();
car3.accelerate();
car3.accelerate();
car3.setUnitToKMH();
car3.setUnitToMPH();
car3.accelerate();
