const fs = require('fs');
const path = require('path');
const IntcodeVM = require('./IntcodeVM');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const computer = new IntcodeVM(input, { log: true })
  computer.input = 1;
  computer.run();

}

main();
