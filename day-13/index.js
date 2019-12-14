const fs = require('fs');
const path = require('path');
const IntcodeVM = require('./IntcodeVM');

const filePath = path.resolve(__dirname, 'input.txt');

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const computer = new IntcodeVM(input);
  let grid = Array(200).fill(null).map(() => Array(200).fill(null).map(() => ' '))
  let centerX = 100;
  let centerY = 100;
  let str = ''
  while (!computer.halted) {
    computer.run();
    let x = computer.output + centerX;
    computer.run();
    let y = computer.output + centerY;
    computer.run();
    let block = computer.output;
    if (Number.isNaN(x) || Number.isNaN(y) || !grid[y] || !grid[y][x]) {
      throw new Error(`Invalid coordinates: ${x},${y}`)
    }
    grid[y][x] = block;
    str = grid.map(row => row.join('')).join('\n')
    console.log(str)
  }
  console.log(str.match(/2/g).length)
}

main();
