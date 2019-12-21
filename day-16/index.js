const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const output = lib.calcFFT(input, 100);
  console.log(`The first 8 digits of the output are ${output.slice(0, 8)}`)
}

main()
