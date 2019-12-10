const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const inputData = fs.readFileSync(filePath, 'utf-8');
  const orbits = lib.countOrbits(inputData);
  const directOrbits = lib.countDirectOrbits(inputData);
  const indirectOrbits = lib.countIndirectOrbits(inputData);
  console.log(`There are ${orbits} total orbits`);
  console.log({ directOrbits, indirectOrbits })

  const transfers = lib.countOrbitalTransfers(inputData, 'YOU', 'SAN');
  console.log(`There are ${transfers} orbital transfers required between YOU and SAN`)
}

main();
