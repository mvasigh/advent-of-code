exports.stringify = arr => arr.join(',');

const instructions = {
  '01': { length: 4 },
  '02': { length: 4 },
  '03': { length: 2 },
  '04': { length: 2 },
  '05': { length: 3 },
  '06': { length: 3 },
  '07': { length: 4 },
  '08': { length: 4 },
  '99': { length: 1 }
};

const retrieve = (program, pos, mode = 'position') =>
  program[mode === 'immediate' ? pos : program[pos]];

exports.sort = arr => {
  const _arr = [...arr].map(el => el.join(','));
  _arr.sort();
  return [...new Set(_arr)].map(str => str.split(',').map(int => parseInt(int)));
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

exports.createProgram = input => {
  const program = input
    .trim()
    .split(',')
    .map(val => parseInt(val));
  return program;
};

exports.createComputer = ({ onInput, onOutput }) => async input => {
  const program = this.createProgram(input);
  let p = 0;
  let active = true;

  while (p <= program.length && active) {
    const { op, modes } = this.interpretOp(program[p]);
    const { length } = instructions[op];
    switch (op) {
      case '01':
        program[program[p + 3]] =
          retrieve(program, p + 1, modes[0]) + retrieve(program, p + 2, modes[1]);
        break;
      case '02':
        program[program[p + 3]] =
          retrieve(program, p + 1, modes[0]) * retrieve(program, p + 2, modes[1]);
        break;
      case '03':
        const val = await onInput(`Please enter input for position ${p}: `);
        program[program[p + 1]] = val;
        break;
      case '04':
        onOutput(retrieve(program, p + 1, modes[0]));
        break;
      case '05':
        if (retrieve(program, p + 1, modes[0])) {
          p = retrieve(program, p + 2, modes[1]);
          continue;
        }
        break;
      case '06':
        if (!retrieve(program, p + 1, modes[0])) {
          p = retrieve(program, p + 2, modes[1]);
          continue;
        }
        break;
      case '07':
        const op07condition =
          retrieve(program, p + 1, modes[0]) < retrieve(program, p + 2, modes[1]);
        program[program[p + 3]] = op07condition ? 1 : 0;
        break;
      case '08':
        const op08condition =
          retrieve(program, p + 1, modes[0]) === retrieve(program, p + 2, modes[1]);
        program[program[p + 3]] = op08condition ? 1 : 0;
        break;
      case '99':
        active = false;
        break;
    }

    p += length;
  }

  return program;
};

exports.getThrusterSignal = async (inputData, phaseSequence) => {
  let output;
  let inputs = 0;
  for (let phase of phaseSequence) {
    const run = this.createComputer({
      onInput: () => {
        let val = !inputs ? phase : output || 0;
        inputs++;
        return Promise.resolve(val);
      },
      onOutput: val => {
        output = val;
      }
    });
    await run(inputData);
    inputs = 0;
  }
  return output;
};

// I ❤️ recursion
exports.getAllCombinations = sequence => {
  let _sequence = [...sequence];
  if (_sequence.length === 1) return _sequence;
  let combos = [];
  for (let i = 0; i < _sequence.length; i++) {
    const term = _sequence[i];
    const copy = [..._sequence]
    copy.splice(i, 1);
    combos = combos.concat(this.getAllCombinations(copy).map(el => [term].concat(el)))
  }
  return combos;
}

exports.maxThrusterSignal = async (inputData, sequence) => {
  const combinations = this.getAllCombinations(sequence);
  let max = 0;
  let seq;
  for (let phaseSeq of combinations) {
    const thrusterSignal = await this.getThrusterSignal(inputData, phaseSeq);
    if (thrusterSignal > max) {
      seq = phaseSeq;
      max = thrusterSignal;
    }
  }
  return max;
}