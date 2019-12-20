const IntcodeVM = require('./IntcodeVM');

const basicPrograms = [
  { input: '1,0,0,0,99', output: '2,0,0,0,99' },
  { input: '2,3,0,3,99', output: '2,3,0,6,99' },
  { input: '2,4,4,5,99,0', output: '2,4,4,5,99,9801' },
  { input: '1,1,1,4,99,5,6,0,99', output: '30,1,1,4,2,5,6,0,99' }
];

describe('day 9 - IntcodeVM', () => {
  test('IntcodeVM.interpretOp', () => {
    const interpretOp = IntcodeVM.interpretOp;

    expect(interpretOp(1002)).toEqual(
      expect.objectContaining({
        op: '02',
        modes: ['position', 'immediate', 'position']
      })
    );
    expect(interpretOp(11002)).toEqual(
      expect.objectContaining({
        op: '02',
        modes: ['position', 'immediate', 'immediate']
      })
    );
    expect(interpretOp(99)).toEqual(
      expect.objectContaining({
        op: '99',
        modes: ['position', 'position', 'position']
      })
    );
    expect(interpretOp(1)).toEqual(
      expect.objectContaining({
        op: '01',
        modes: ['position', 'position', 'position']
      })
    );
    expect(interpretOp(99999)).toEqual(
      expect.objectContaining({
        op: '99',
        modes: ['position', 'position', 'position']
      })
    );
  });

  test('basic programs', () => {
    for (let program of basicPrograms) {
      const computer = new IntcodeVM(program.input);
      computer.run();
      expect(computer.toString()).toEqual(program.output);
    }
  });

  describe('advanced programs', () => {
    test('relative mode (quine example)', () => {
      const program = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
      const computer = new IntcodeVM(program);
      computer.run();
      expect(computer.toString()).toEqual(program);
    });

    test('relative mode (16-digit example)', () => {
      const program = '1102,34915192,34915192,7,4,7,99,0';
      const computer = new IntcodeVM(program);
      computer.run();
      expect(computer.output.toString()).toHaveLength(16);
    });

    test('relative mode (large number example)', () => {
      const program = '104,1125899906842624,99';
      const computer = new IntcodeVM(program);
      computer.run();
      expect(computer.output).toEqual(1125899906842624);
    });
  });
});
