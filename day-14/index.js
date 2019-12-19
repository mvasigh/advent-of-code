const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt')

function main() {
  const input = fs.readFileSync(filePath, 'utf-8')
  const ore = lib.oreForFuel(input, 'FUEL');
  console.log(`We need ${ore} ore for one FUEL`)
}

main();
