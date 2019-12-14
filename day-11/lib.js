const IntcodeVM = require('./IntcodeVM');

exports.turn = (orientation, direction) => {
  let _orientation;
  if (orientation === '^') {
    _orientation = direction ? '>' : '<';
  } else if (orientation === '>') {
    _orientation = direction ? 'v' : '^';
  } else if (orientation === 'v') {
    _orientation = direction ? '<' : '>';
  } else if (orientation === '<') {
    _orientation = direction ? '^' : 'v';
  } else {
    throw new Error(`Invalid orientation ${orientation}`);
  }
  return _orientation;
};

exports.deployRobot = inputData => {
  let x = 0,
    y = 0;
  let orientation = '^';
  const hull = new Map();
  const computer = new IntcodeVM(inputData);
  while (!computer.halted) {
    const key = JSON.stringify([x, y])
    computer.input = hull.get(key) || 0;
    computer.run();
    hull.set(key, computer.output);
    computer.run();
    orientation = this.turn(orientation, computer.output);
    let delta = (orientation === 'v' || orientation === '<') ? -1 : 1;
    x = (orientation === '>' || orientation === '<') ? x + delta : x;
    y = (orientation === '^' || orientation === 'v') ? y + delta : y;
  }
  return hull;
};
