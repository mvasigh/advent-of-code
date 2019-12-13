const asteroidRegex = /#/g;
const toRad = deg => (deg * Math.PI) / 180;
const getOffset = (dx, dy) => {
  if (dx > 0 && dy < 0) {
    return 0;
  } else if (dx < 0 && dy < 0) {
    return Math.PI / 2;
  } else if (dx < 0 && dy > 0) {
    return Math.PI;
  } else if (dx > 0 && dy > 0) {
    return (3 * Math.PI) / 2;
  }
};

exports.createGrid = inputData =>
  inputData
    .trim()
    .split('\n')
    .map(row => row.trim());

exports.visibleAsteroids = (grid, [ax, ay]) => {
  if (grid[ay][ax] !== '#') return 0;
  const w = grid[0].length,
    h = grid.length;

  let matches;
  let x;
  let angles = new Set();
  for (let y = 0; y < h; y++) {
    while ((matches = asteroidRegex.exec(grid[y])) !== null) {
      x = matches.index;
      if (ax === x && ay === y) continue;
      let angle;
      if (ay === y) {
        angle = x > ax ? 0 : Math.PI;
      } else if (ax === x) {
        angle = y > ay ? (3 * Math.PI) / 2 : Math.PI / 2;
      } else {
        let dx = x - ax;
        let dy = y - ay;
        let offset = getOffset(dx, dy);
        angle = Math.atan(Math.abs(dy) / Math.abs(dx)) + offset;
      }
      angles.add(angle);
    }
  }

  return angles.size;
};

exports.maxAsteroids = inputData => {
  const grid = this.createGrid(inputData);
  let maxCoords;
  const maxNum = grid.reduce((max, row, y) => {
    for (let x = 0; x < row.length; x++) {
      const visible = this.visibleAsteroids(grid, [x, y]);
      if (visible > max) {
        maxCoords = [x, y]
        max = visible;
      }
    }
    return max;
  }, 0);
  return maxNum;
};
