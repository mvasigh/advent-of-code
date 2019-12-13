const asteroidRegex = /#/g;

const getOffset = (dx, dy) => {
  // rotated by Math.PI / 2 so 0 is facing up
  if (dx > 0 && dy < 0) {
    return (3 * Math.PI) / 2;
  } else if (dx < 0 && dy < 0) {
    return 0;
  } else if (dx < 0 && dy > 0) {
    return Math.PI / 2;
  } else if (dx > 0 && dy > 0) {
    return Math.PI;
  }
};

const sort = asteroids => {
  const _asteroids = [...asteroids];
  _asteroids.sort((a, b) => {
    let _aAngle = a.angle === 0 ? 999 : a.angle;
    let _bAngle = b.angle === 0 ? 999 : b.angle;
    if (_aAngle < _bAngle) {
      return 1;
    } else if (_aAngle > _bAngle) {
      return -1;
    } else {
      return a.distance > b.distance ? 1 : -1;
    }
  });
  return _asteroids;
};

exports.createGrid = inputData =>
  inputData
    .trim()
    .split('\n')
    .map(row => row.trim());

exports.relativeAsteroids = (grid, [ax, ay]) => {
  if (grid[ay][ax] !== '#') return [];
  const h = grid.length;
  let matches;
  let x;
  let asteroids = [];
  for (let y = 0; y < h; y++) {
    while ((matches = asteroidRegex.exec(grid[y])) !== null) {
      x = matches.index;
      if (ax === x && ay === y) continue;
      let angle;
      let dx = x - ax;
      let dy = y - ay;
      if (ay === y) {
        // rotated to accomodate laser
        angle = x > ax ? (3 * Math.PI) / 2 : Math.PI / 2;
      } else if (ax === x) {
        angle = y > ay ? Math.PI : 0;
      } else {
        let offset = getOffset(dx, dy);
        let o = (dx > 0 && dy < 0) || (dx < 0 && dy > 0) ? dy : dx;
        let a = (dx > 0 && dy < 0) || (dx < 0 && dy > 0) ? dx : dy;
        angle = Math.atan(Math.abs(o) / Math.abs(a)) + offset;
      }
      asteroids.push(
        JSON.stringify({
          coords: [x, y],
          distance: Math.abs(dx) + Math.abs(dy),
          angle
        })
      );
    }
  }
  return asteroids.sort();
};

exports.visibleAsteroids = (grid, [ax, ay]) => {
  const asteroids = this.relativeAsteroids(grid, [ax, ay]);
  const angles = asteroids.map(a => JSON.parse(a).angle);
  return new Set(angles).size;
};

exports.maxAsteroids = inputData => {
  const grid = this.createGrid(inputData);
  let maxCoords;
  const maxNum = grid.reduce((max, row, y) => {
    for (let x = 0; x < row.length; x++) {
      const visible = this.visibleAsteroids(grid, [x, y]);
      if (visible > max) {
        maxCoords = [x, y];
        max = visible;
      }
    }
    return max;
  }, 0);
  return { num: maxNum, coords: maxCoords };
};

exports.laserHitNumber = (inputData, origin, hitNumber = 200) => {
  const grid = this.createGrid(inputData);
  const relAsteroids = this.relativeAsteroids(grid, origin).map(a => JSON.parse(a));
  const asteroids = sort(relAsteroids);
  let hits = [];
  let i = 0;
  let iter = 0;
  while (hits.length < hitNumber && iter < 9999) {
    let lastHit = hits[hits.length - 1];
    const asteroid = asteroids[i];
    if (!lastHit || asteroid.angle !== lastHit.angle) {
      hits.push(asteroid)
    }
    i = i === asteroids.length - 1 ? 0 : i + 1;
    iter++;
  }
  return hits;
};
