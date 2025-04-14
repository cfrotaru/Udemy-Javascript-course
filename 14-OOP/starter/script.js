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
    return this;
  }
  brake() {
    this.speed -= 5;
    this.logSpeed();
    return this;
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

class EV extends Car {
  constructor(make, speed, charge, unit = 'km/h') {
    super(make, speed, unit);
    this.charge = charge;
  }
  set charge(charge) {
    this._charge = charge;
  }

  get charge() {
    return this._charge;
  }
  chargeBattery(chargeTo) {
    if (isNaN(chargeTo) || chargeTo < this.charge) {
      console.log(`Charger is not connected!`);
      return this;
    }
    if (chargeTo > 100) {
      console.log(`KBOOOOOM! ${this.make} is gone!`);
      return this;
    }
    this.charge = chargeTo;
    console.log(`${this.make} has reached ${chargeTo}% battery!`);
    return this;
  }
  accelerate() {
    if (this.charge < 1) {
      console.log(`No battery left`);
      return this;
    }

    this.speed += 20;
    this.charge--;
    console.log(
      `${this.make} going at ${this.speed} ${this.unit}, with a charge of ${this.charge}%`
    );
    return this;
  }
}

const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.chargeBattery(120);
tesla.chargeBattery(100);
tesla.brake();
tesla.accelerate();
tesla.accelerate().accelerate().brake().accelerate();
