'use strict';

//CC#1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.logSpeed = function () {
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  this.logSpeed();
};

Car.prototype.brake = function () {
  this.speed -= 5;
  this.logSpeed();
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.accelerate();
car1.brake();
car1.brake();
car1.brake();
car2.brake();
car2.brake();
car2.accelerate();
