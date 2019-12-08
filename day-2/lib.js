exports.runProgram = input => {
  const program = input
    .trim()
    .split(',')
    .map(op => parseInt(op));
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
  return program.join(',');
};
