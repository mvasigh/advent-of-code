const fs = require('fs');
const path = require('path');
const { runProgram } = require('./lib');

const inputFile = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(inputFile, 'utf-8');

  // Do some corrections per instructions!
  // - replace position 1 with the value 12
  // - replace position 2 with the value 2
  const inputArr = input
    .trim()
    .split(',')
    .map(val => parseInt(val));
  inputArr[1] = 12;
  inputArr[2] = 2;
  const correctedInput = inputArr.join(',');

  const output = runProgram(correctedInput);
  const outputArr = output.split(',');

  console.log(`The value at position 0 is ${outputArr[0]}`);
}

main();
