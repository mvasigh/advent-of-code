const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

async function main() {
  const inputData = fs.readFileSync(filePath, 'utf-8');
  const max = await lib.maxThrusterSignal(inputData, [0, 1, 2, 3, 4]);
  console.log(`The maximum possible thruster signal is ${max}`);
}

main();