const fs = require('fs');
const path = require('path');
const { shortestDistance } = require('./lib');

const inputPath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(inputPath, 'utf-8');
  const shortest = shortestDistance(input);
  console.log(`The shortest distance is ${shortest.distance}`);
}

main();
