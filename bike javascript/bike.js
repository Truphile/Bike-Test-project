function createBike(accelerator = 0, gearStatus = 0) {
  return {
    accelerator: accelerator, 
    gearStatus: gearStatus, 
    deceleration: 0, 
    running: false, 
  };
}

function turnOn(bike) {
  bike.running = true;
  return bike.gearStatus;
}

function turnOff(bike) {
  bike.running = false;
  bike.accelerator = 0;
  bike.gearStatus = 0;
  return bike.gearStatus;
}

function accelerate(bike) {
  if (!bike.running) return null;
  if (bike.gearStatus === 0) bike.gearStatus = 1;
  bike.accelerator += bike.gearStatus;
  updateGear(bike);
  return bike.accelerator;
}

function decelerate(bike) {
  if (!bike.running) return null;
  bike.accelerator -= bike.gearStatus;
  if (bike.accelerator < 0) bike.accelerator = 0;
  updateGear(bike);
  return bike.accelerator;
}

function updateGear(bike) {
  if (!bike.running) {
    bike.gearStatus = 0;
    return;
  }
  if (bike.accelerator === 0) {
    bike.gearStatus = 0;
  } else if (bike.accelerator >= 41) {
    bike.gearStatus = 4;
  } else if (bike.accelerator >= 31) {
    bike.gearStatus = 3;
  } else if (bike.accelerator >= 21) {
    bike.gearStatus = 2;
  } else {
    bike.gearStatus = 1;
  }
}

module.exports = {createBike,turnOn,turnOff,accelerate,decelerate,updateGear,
};
