// This needs some HEAVY refactoring

Array.prototype.equals = function(array) {
  // if the other array is a falsy value, return
  if (!array) return false;
  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

exports.instructionsToArray = input =>
  input.match(/[A-Z][0-9]+/g).map(raw => [raw[0], parseInt(raw.slice(1))]);

exports.parseInstructions = (instructions, options = {}) => {
  const instructionsArr = this.instructionsToArray(instructions);
  let x = options.x || 0;
  let y = options.y || 0;
  let line = [];

  for (let [direction, distance] of instructionsArr) {
    const multiplier = direction === 'L' || direction === 'D' ? -1 : 1;

    const points = Array(distance)
      .fill(null)
      .map((_, i) => {
        const coordValue = multiplier * (i + 1);
        if (direction === 'U' || direction === 'D') {
          return [x, y + coordValue];
        } else if (direction === 'L' || direction === 'R') {
          return [x + coordValue, y];
        }
      });

    line = line.concat(points);

    switch (direction) {
      case 'U':
      case 'D':
        y += multiplier * distance;
        break;
      case 'L':
      case 'R':
        x += multiplier * distance;
        break;
    }
  }

  return line;
};

exports.calculateDistance = ([x1, y1], [x2, y2]) => Math.abs(y2 - y1) + Math.abs(x2 - x1);

exports.findIntersects = (line1, line2) => {
  const intersects = line1.reduce((intersects, point, i) => {
    const j = line2.findIndex(p => point.equals(p));
    if (j !== -1) {
      intersects.push({
        point,
        distance: this.calculateDistance([0, 0], point),
        pathLength: i + j + 2
      });
    }
    return intersects;
  }, []);
  return intersects;
};

exports.shortestDistance = (line1, line2) => {
  const intersects = this.findIntersects(line1, line2);
  const shortest = intersects.reduce((min, intersect) =>
    intersect.distance < min.distance ? intersect : min
  );
  return shortest;
};
