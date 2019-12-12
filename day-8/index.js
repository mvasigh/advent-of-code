const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const inputData = fs.readFileSync(filePath, 'utf-8');
  const decoded = lib.decodeImage(inputData, [25, 6])
  console.log('The decoded image:')
  console.log(decoded)
}

main();
