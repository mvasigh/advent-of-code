const Moon = require('./Moon');

const axes = ['x', 'y', 'z'];

exports.parseMoons = inputData => {
  const moons = inputData
    .trim()
    .replace(' ', '')
    .split('\n')
    .map(moonData => {
      const coordsData = moonData
        .trim()
        .replace(/<|>|\s/g, '')
        .split(',')
        .map(t => t.split('='))
        .flat();
      let coords = {};
      for (let i = 0; i < coordsData.length; i += 2) {
        coords[coordsData[i]] = parseInt(coordsData[i + 1]);
      }
      return new Moon(coords);
    });
  return moons;
};

exports.processStep = moons => {
  for (let i = 0; i < moons.length; i++) {
    const moon = moons[i];
    for (let j = i + 1; j < moons.length; j++) {
      const paired = moons[j];
      if (!paired) break;
      for (let axis of axes) {
        if (moon.position[axis] === paired.position[axis]) continue;
        if (moon.position[axis] > paired.position[axis]) {
          moon.velocity[axis] -= 1;
          paired.velocity[axis] += 1;
        } else if (moon.position[axis] < paired.position[axis]) {
          moon.velocity[axis] += 1;
          paired.velocity[axis] -= 1;
        }
      }
    }
  }

  moons.forEach(moon => {
    for (let axis of axes) {
      moon.position[axis] += moon.velocity[axis];
    }
  });
};

exports.getEnergy = (inputData, steps = 10) => {
  const moons = this.parseMoons(inputData);
  // First, process all the steps
  for (let i = 0; i < steps; i++) {
    this.processStep(moons);
  }

  // Then, sum up all the energy and return
  const totalEnergy = moons.reduce((sum, moon) => {
    const pot = Object.entries(moon.position).reduce(
      (potSum, [, val]) => potSum + Math.abs(val),
      0
    );
    const kin = Object.entries(moon.velocity).reduce(
      (kinSum, [, val]) => kinSum + Math.abs(val),
      0
    );
    return (sum += pot * kin);
  }, 0);
  return totalEnergy;
};
