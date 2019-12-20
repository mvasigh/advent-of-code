const IntcodeVM = require('./IntcodeVM');
const prompt = require('./prompt');

const stringify = grid => grid.reduce((output, row) => output + '\n' + row.join(''), '');

const flip = instruction => {
  if (instruction === 1) return 2;
  if (instruction === 2) return 1;
  if (instruction === 3) return 4;
  if (instruction === 4) return 3;
}

const peek = (program, grid, [x, y], [dx, dy]) => {
  for (let i = 1; i <= 4; i++) {
    const opposite = flip(i);
    program.input = i;
    program.run();
    switch(program.output) {
      case 0:
        grid[y + dy][x + dx] = '█';
        break;
      case 1:
        grid[y + dy][x + dx] = '.';
        program.input = opposite;
        program.run();
        // grid[y][x] = grid[y][x] === 'O' ? 'O' : '.';
        // y += dy;
        // x += dx;
        // grid[y][x] = 'D';
        break;
      case 2:
        // grid[y][x] = grid[y][x] === 'O' ? 'O' : '.';
        // y += dy;
        // x += dx;
        // grid[y][x] = 'O';
        grid[y + dy][x + dx] = 'O';
        program.input = opposite;
        program.run();
        break;
    }
  }
}

exports.run = async inputData => {
  // create an empty grid and position self at center
  const program = new IntcodeVM(inputData);
  const grid = Array(50)
    .fill(null)
    .map(() => Array(50).fill(' '));
  const cx = 25;
  const cy = 25;

  let x = cx;
  let y = cy;
  let input = await prompt('Enter your first input: ');

  while (input !== 'exit') {
    console.clear();
    input = parseInt(input);
    console.log(`Your input was: ${input}`);
    program.input = input;
    program.run();
    console.log(`The program output ${program.output}`);

    let dx = input === 3 ? -1 : input === 4 ? 1 : 0;
    let dy = input === 2 ? 1 : input === 1 ? -1 : 0;

    // peek(program, grid, [x, y], [dx, dy]);

    switch (program.output) {
      case 0:
        grid[y + dy][x + dx] = '█';
        break;
      case 1:
        grid[y][x] = grid[y][x] === 'O' ? 'O' : '.';
        y += dy;
        x += dx;
        grid[y][x] = 'D';
        break;
      case 2:
        grid[y][x] = grid[y][x] === 'O' ? 'O' : '.';
        y += dy;
        x += dx;
        grid[y][x] = 'O';
        break;
      default:
        throw new Error('Unacceptable input!');
    }
    console.log(stringify(grid));

    input = await prompt('Please enter your input: ');
  }
};
