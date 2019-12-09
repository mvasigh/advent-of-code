const fs = require('fs');
const path = require('path');
const { findIntersects, parseInstructions } = require('./lib');

const inputPath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(inputPath, 'utf-8');
  const lines = input.trim().split('\n').map(raw => parseInstructions(raw))
  const intersects = findIntersects(...lines)
  const shortestPath = intersects.reduce((min, intersect) => {
    return intersect.pathLength < min.pathLength ? intersect : min;
  })
  console.log(`The shortest combined path is ${shortestPath.pathLength}`);
}

main();
