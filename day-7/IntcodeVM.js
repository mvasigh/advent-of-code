class IntcodeVM {
  constructor(inputData) {
    this.p = 0;
    this.active = false;
    this.input = null;
    this.output = null;
    this.halted = null;
    this.program = this.createProgram(inputData);

    this.set = this.set.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.run = this.run.bind(this);
    this.toString = this.toString.bind(this);
  }

  createProgram(input) {
    const _program = input
      .trim()
      .split(',')
      .map(val => parseInt(val));
    return _program;
  }

  interpretOp(opcode) {
    const str = opcode.toString();
    const op = str.slice(-2).padStart(2, '0');
    let length;
    switch (op) {
      case '01':
      case '02':
      case '07':
      case '08':
        length = 4;
        break;
      case '05':
      case '06':
        length = 3;
        break;
      case '03':
      case '04':
        length = 2;
        break
      case '99':
        length = 1;
        break
      default:
        throw new Error(`Unexpected op ${op} with opcode ${opcode}`)
    }

    return {
      op,
      length,
      modes: Array(3)
        .fill(null)
        .map((_, i) => {
          const code = str[str.length - 3 - i] || '0';
          return code === '1' ? 'immediate' : 'position';
        })
    };
  }

  set(index, value) {
    const _index = this.program[index];
    this.program[_index] = value;
    return this.program;
  }

  retrieve(index, mode = 'position') {
    const _index = mode === 'immediate' ? index : this.program[index];
    return this.program[_index];
  }

  run() {
    this.active = true;

    while (this.p <= this.program.length && this.active) {
      let { p, program } = this;
      const { op, modes, length } = this.interpretOp(program[p]);
      switch (op) {
        case '01':
          this.set(p + 3, this.retrieve(p + 1, modes[0]) + this.retrieve(p + 2, modes[1]));
          break;
        case '02':
          this.set(p + 3, this.retrieve(p + 1, modes[0]) * this.retrieve(p + 2, modes[1]));
          break;
        case '03':
          if (this.input == null) {
            this.active = false;
            continue;
          }
          this.set(p + 1, this.input);
          this.input = null;
          break;
        case '04':
          this.output = this.retrieve(p + 1, modes[0]);
          this.active = false;
          break;
        case '05':
          if (this.retrieve(p + 1, modes[0])) {
            this.p = this.retrieve(p + 2, modes[1]);
            continue;
          }
          break;
        case '06':
          if (!this.retrieve(p + 1, modes[0])) {
            this.p = this.retrieve(p + 2, modes[1]);
            continue;
          }
          break;
        case '07':
          const op07condition = this.retrieve(p + 1, modes[0]) < this.retrieve(p + 2, modes[1]);
          this.set(this.p + 3, op07condition ? 1 : 0);
          break;
        case '08':
          const op08condition = this.retrieve(p + 1, modes[0]) === this.retrieve(p + 2, modes[1]);
          this.set(this.p + 3, op08condition ? 1 : 0);
          break;
        case '99':
          this.active = false;
          this.halted = true;
          break;
      }
      this.p += length;
    }
    return this.program;
  }

  toString() {
    return this.program.join(',');
  }
}

module.exports = IntcodeVM;
