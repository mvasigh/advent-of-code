const readline = require('readline');

exports.stringify = arr => arr.join(',');

const prompt = question =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, answer => {
      const num = parseInt(answer.trim());
      rl.close();
      if (Number.isNaN(num)) {
        reject('Must input a valid integer');
      } else {
        resolve(num);
      }
    });
  });

const retrieve = (program, pos, mode = 'position') => program[mode === 'immediate' ? pos : program[pos]];

exports.createProgram = input => {
  const program = input
    .trim()
    .split(',')
    .map(val => parseInt(val));
  program.retrieve = retrieve;
  return program;
};

const instructions = {
  '01': { length: 4 },
  '02': { length: 4 },
  '03': { length: 2 },
  '04': { length: 2 },
  '99': { length: 1 }
};

exports.interpretOp = opcode => {
  const str = opcode.toString();
  const op = str.slice(-2).padStart(2, '0');

  return {
    op,
    modes: Array(3)
      .fill(null)
      .map((_, i) => {
        const code = str[str.length - 3 - i] || '0';
        return code === '1' ? 'immediate' : 'position';
      })
  };
};

// New and improved Intcode computer!
exports.runProgram = async input => {
  if (typeof input !== 'string' && !Array.isArray(input)) {
    throw new Error('Invalid input, must be an Array or a string');
  }

  const program = this.createProgram(input);

  let p = 0;
  let active = true;
  while (p <= program.length && active) {
    const { op, modes } = this.interpretOp(program[p]);
    const { length } = instructions[op];
    if (op === '01') {
      const val =
        program.retrieve(program, p + 1, modes[0]) + program.retrieve(program, p + 2, modes[1]);
      program[program[p + 3]] = val;
    } else if (op === '02') {
      const val =
        program.retrieve(program, p + 1, modes[0]) * program.retrieve(program, p + 2, modes[1]);
      program[program[p + 3]] = val;
    } else if (op === '03') {
      const val = await prompt(`Please enter input for position ${p}: `);
      console.log(`Placing value ${val} at position ${program[p + 1]}`);
      program[program[p + 1]] = val;
    } else if (op === '04') {
      console.log(`Output for position ${p}: ${program.retrieve(program, p + 1, modes[0])}`);
    } else if (op === '99') {
      active = false;
    }

    p += length;
  }

  return program;
};
