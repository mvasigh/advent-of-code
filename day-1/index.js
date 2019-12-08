const fs = require('fs');
const { getTotalFuel } = require('./lib');

function main() {
  const input = fs.readFileSync('./input.txt', 'utf-8');
  const moduleMasses = input
    .trim()
    .split('\n')
    .map(mass => parseInt(mass));
  const totalFuel = getTotalFuel(moduleMasses);
  console.log(`Total fuel required: ${totalFuel}`);
}

main();
