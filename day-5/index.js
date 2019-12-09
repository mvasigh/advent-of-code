const fs = require('fs');
const path = require('path');
const { runProgram } = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

async function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const output = await runProgram(input);
}

main();
