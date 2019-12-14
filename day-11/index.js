const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const hull = lib.deployRobot(input);
  const unique = new Set(Array.from(hull.keys()))
  console.log(`There were ${unique.size} tiles painted at least once`)
}

main();
