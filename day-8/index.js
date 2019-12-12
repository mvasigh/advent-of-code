const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const inputData = fs.readFileSync(filePath, 'utf-8');
  lib.verifyImage(inputData);
}

main();
