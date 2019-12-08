const fs = require('fs');
const path = require('path');
const { parse, setInputs, runProgram } = require('./lib');

const inputFile = path.resolve(__dirname, 'input.txt');

function main() {
  const raw = fs.readFileSync(inputFile, 'utf-8');
  const program = parse(raw);

  let noun = 2;
  let verb = 2;
  let output = null;
  const TARGET = 19690720;

  while (output !== TARGET) {
    const input = setInputs(program, noun, verb);
    output = runProgram(input)[0];
    if (output === TARGET) break;
    if (output > TARGET) {
      verb++;
      noun = 0;
    }
    noun++;
  }

  console.log('Done!');
  console.log(`Output is ${output}, 100 * noun + verb is ${100 * noun + verb}`);
}

main();
