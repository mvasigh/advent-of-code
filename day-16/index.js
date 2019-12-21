const fs = require('fs');
const path = require('path');
const lib = require('./lib');
const run = require('../util/run')

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8').repeat(10000);
  const offset = Number(input.slice(0, 7))
  console.log({ offset })
  const output = lib.calcFFT(input, 100, offset);
  console.log(`The first 8 digits of the output are ${output.slice(offset, offset + 8)}`)
}

run(main)
