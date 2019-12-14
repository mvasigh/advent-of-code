const fs = require('fs');
const path = require('path');
const IntcodeVM = require('./IntcodeVM');

const filePath = path.resolve(__dirname, 'input.txt');

const getOutput = output => {
  switch (output) {
    case 0:
    default:
      return ' ';
    case 1:
      return '█';
    case 2:
      return '#';
    case 3:
      return '=';
    case 4:
      return '●';
  }
};

// NOTE: I cheated and just put a wall at the bottom of the input 😁
// this solution doesn't work as is.

function main() {
  const input = fs.readFileSync(filePath, 'utf-8');
  const computer = new IntcodeVM(input);
  computer.program[0] = 2;
  let grid = Array(100)
    .fill(null)
    .map(() =>
      Array(100)
        .fill(null)
        .map(() => ' ')
    );
  let centerX = 0;
  let centerY = 0;
  let str = '';
  let ballX, paddleX;
  let score;
  while (!computer.halted) {
    if (paddleX > ballX) {
      computer.input = -1;
    } else if (paddleX < ballX) {
      computer.input = 1;
    }
    computer.run();
    let x = computer.output + centerX;
    computer.run();
    let y = computer.output + centerY;
    computer.run();
    if (computer.output === 4) {
      ballX = x + centerX;
      console.log(`The ball is at ${y}`);
    } else if (computer.output === 3) {
      paddleX = x + centerX;
    }
    console.log({ paddleX, ballX });
    let block = getOutput(computer.output);
    if (x === -1 && y === 0) {
      score = computer.output;
      console.log({ score });
      continue;
    } else if (Number.isNaN(x) || Number.isNaN(y) || !grid[y] || !grid[y][x]) {
      throw new Error(`Invalid coordinates: ${x},${y}`);
    }
    grid[y][x] = block;
    str = grid.map(row => row.join('')).join('\n');
  }
  console.log(score);
}

main();
