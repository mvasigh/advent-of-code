const fs = require('fs');
const path = require('path');
const { parse, setInputs, runProgram } = require('./lib');

const inputFile = path.resolve(__dirname, 'input.txt');

function main() {
  const raw = fs.readFileSync(inputFile, 'utf-8');
  const input = setInputs(parse(raw), 12, 2);
  const output = runProgram(input);

  console.log(`The value at position 0 is ${output[0]}`);
}

main();
