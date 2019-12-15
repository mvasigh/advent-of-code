const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const totalEnergy = lib.getEnergy(input, 1000);
  console.log(`The total energy is ${totalEnergy}`);
}

main();
