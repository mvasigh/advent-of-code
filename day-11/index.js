const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const hull = lib.deployRobot(input, 0);
  const unique = new Set(Array.from(hull.keys()))
  console.log(`There were ${unique.size} tiles painted at least once`)

  const part2Hull = lib.deployRobot(input, 1);
  lib.paintHull(part2Hull);
}

main();
