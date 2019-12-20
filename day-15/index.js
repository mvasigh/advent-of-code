const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

async function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  await lib.run(input);
}

main();
