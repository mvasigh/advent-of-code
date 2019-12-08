exports.runProgram = input => {
  const program = [...input];
  for (let p = 0; p < program.length; p += 4) {
    const op = program[p];
    switch (op) {
      case 1:
        program[p + 3] = program[p + 1] + program[p + 2];
      case 2:
        program[p + 3] = program[p + 1] * program[p + 2];
      case 99:
        return program;
    }
  }
  return program;
};
