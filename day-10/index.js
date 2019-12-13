const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const max = lib.maxAsteroids(input);
  console.log(`Max number of asteroids is ${max}`)
}

main();
