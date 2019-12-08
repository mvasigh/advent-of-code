exports.stringify = arr => arr.join(',');

exports.parse = str =>
  str
    .trim()
    .split(',')
    .map(val => parseInt(val));

exports.runProgram = input => {
  if (typeof input !== 'string' && !Array.isArray(input)) {
    throw new Error('Invalid input, must be an Array or a string');
  }

  const program = typeof input === 'string' ? this.parse(input) : [...input];

  for (let p = 0; p < program.length; p += 4) {
    const op = program[p];
    if (op === 1) {
      program[program[p + 3]] = program[program[p + 1]] + program[program[p + 2]];
      continue;
    } else if (op === 2) {
      program[program[p + 3]] = program[program[p + 1]] * program[program[p + 2]];
      continue;
    } else if (op === 99) {
      break;
    }
  }

  return program;
};

exports.setInputs = (program, noun, verb) => {
  const _program = [...program];
  _program[1] = noun;
  _program[2] = verb;
  return _program;
};
