const { createBike, turnOn, turnOff, accelerate, decelerate } = require('./bike');

let bike;

beforeEach(() => {
  bike = createBike();
});

test('bike is off when i create the bike', () => {
  expect(bike.gearStatus).toBe(0);
  expect(bike.accelerator).toBe(0);
});

test('gear stays at 0 after turnOn until accelerate', () => {
  expect(bike.gearStatus).toBe(0);
  turnOn(bike);
  expect(bike.gearStatus).toBe(0);
  accelerate(bike);
  expect(bike.gearStatus).toBe(1);
});

test('turnOn sets running to true', () => {
  turnOn(bike);
  expect(bike.running).toBe(true);
});

test('turnOff sets running false and resets accelerator and gear', () => {
  bike = createBike(10, 3);
  turnOn(bike);
  expect(bike.running).toBe(true);
  turnOff(bike);
  expect(bike.running).toBe(false);
  expect(bike.accelerator).toBe(0);
  expect(bike.gearStatus).toBe(0);
});

test('accelerate increases speed according to gear and updates gear', () => {
  turnOn(bike);
  accelerate(bike);
  expect(bike.accelerator).toBe(1);
  expect(bike.gearStatus).toBe(1);

  bike.accelerator = 22;
  bike.gearStatus = 2;
  accelerate(bike);
  expect(bike.accelerator).toBe(24);
  expect(bike.gearStatus).toBe(2);
});

test('decelerate decreases speed according to gear and updates gear', () => {
  bike = createBike(24, 2);
  turnOn(bike);
  decelerate(bike);
  expect(bike.accelerator).toBe(22);
  expect(bike.gearStatus).toBe(2);

  bike.accelerator = 1;
  bike.gearStatus = 1;
  decelerate(bike);
  expect(bike.accelerator).toBe(0);
  expect(bike.gearStatus).toBe(0);
});

test('accelerate or decelerate does nothing if bike is off', () => {
  expect(accelerate(bike)).toBeNull();
  expect(decelerate(bike)).toBeNull();
});

test('gear changes to 3 when speed passes 31', () => {
  bike = createBike(30, 2);
  turnOn(bike);
  accelerate(bike);
  expect(bike.gearStatus).toBe(3);
});

test('gear changes to 4 when speed passes 41', () => {
  bike = createBike(40, 3);
  turnOn(bike);
  accelerate(bike);
  expect(bike.gearStatus).toBe(4);
});

test('speed does not go negative on multiple decelerates', () => {
  bike = createBike(1, 1);
  turnOn(bike);
  decelerate(bike);
  decelerate(bike);
  decelerate(bike);
  expect(bike.accelerator).toBe(0);
  expect(bike.gearStatus).toBe(0);
});

test('multiple accelerates increase speed correctly', () => {
  turnOn(bike);
  accelerate(bike);
  accelerate(bike);
  accelerate(bike);
  expect(bike.accelerator).toBe(3);
  expect(bike.gearStatus).toBe(1);
});

test('gear resets to 0 after turning off from moving state', () => {
  bike = createBike(25, 2);
  turnOn(bike);
  turnOff(bike);
  expect(bike.gearStatus).toBe(0);
  expect(bike.accelerator).toBe(0);
  expect(bike.running).toBe(false);
});
