const {createBike,turnOn,turnOff,accelerate,decelerate,} = require('./bike');

test('bike is off when i create the bike', () => {
    const bike = createBike();
    expect(bike.gearStatus).toBe(0);
});

test('gear stays 0 after turnOn until accelerate', () => {
  const bike = createBike();
  expect(bike.gearStatus).toBe(0);
  turnOn(bike);
  expect(bike.gearStatus).toBe(0);
  accelerate(bike);
  expect(bike.gearStatus).toBe(1);
});

test('turnOn sets running to true', () => {
  const bike = createBike();
  turnOn(bike);
  expect(bike.running).toBe(true);
});

test('turnOff sets running false and resets accelerator and gear', () => {
  const bike = createBike(10, 3);
  turnOn(bike);
  expect(bike.running).toBe(true);
  turnOff(bike);
  expect(bike.running).toBe(false);
  expect(bike.accelerator).toBe(0);
  expect(bike.gearStatus).toBe(0);
});

test('accelerate increases speed according to gear and updates gear', () => {
  const bike = createBike();
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
  const bike = createBike(24, 2);
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
  const bike = createBike();
  expect(accelerate(bike)).toBeNull();
  expect(decelerate(bike)).toBeNull();
});
