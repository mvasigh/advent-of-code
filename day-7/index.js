const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const inputData = fs.readFileSync(filePath, 'utf-8');
  const max = lib.thrusterFeedback(inputData, [5, 6, 7, 8, 9]);
  console.log(`The maximum possible thruster signal is ${max}`);
}

main();
