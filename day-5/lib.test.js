const { runProgram, stringify, interpretOp } = require('./lib');

describe('day 5', () => {
  test('runProgram', async () => {
    const testPrograms = [
      { input: '1,0,0,0,99', output: '2,0,0,0,99' },
      { input: '2,3,0,3,99', output: '2,3,0,6,99' },
      { input: '2,4,4,5,99,0', output: '2,4,4,5,99,9801' },
      { input: '1,1,1,4,99,5,6,0,99', output: '30,1,1,4,2,5,6,0,99' }
    ];

    for (let program of testPrograms) {
      const programOutput = await runProgram(program.input);
      expect(stringify(programOutput)).toEqual(program.output);
    }
  });

  test('interpretOp', () => {
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
});
