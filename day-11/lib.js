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

exports.deployRobot = (inputData, initial = 0) => {
  let x = 0,
    y = 0;
  let orientation = '^';
  const hull = new Map();
  const computer = new IntcodeVM(inputData);
  while (!computer.halted) {
    const key = JSON.stringify([x, y])
    computer.input = hull.get(key) || initial;
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

exports.paintHull = hull => {
  const block = '█'
  const centerX = 100;
  const centerY = 100;
  let grid = Array(200).fill(null).map(() => '.'.repeat(200));
  for (let tile of hull) {
    let [coords, color] = tile;
    let [x, y] = JSON.parse(coords);
    const output = color === 1 ? block : ' ' 
    let row = grid[centerY + y].split('');
    row[centerX + x] = output;
    grid[centerY + y] = row.join('');
  }
  const str = grid.join('\n')
  console.log(str)
}
