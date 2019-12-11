const {
  createComputer,
  stringify,
  interpretOp,
  getThrusterSignal,
  maxThrusterSignal,
  getAllCombinations,
  sort
} = require('./lib');

const runProgram = createComputer({
  onInput: Promise.resolve(),
  onOutput: console.log
});

describe('day 6', () => {
  describe('Intcode computer tests', () => {
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

  describe('thruster signal calculation', () => {
    const testData = [
      {
        phaseSequence: [4, 3, 2, 1, 0],
        inputData: '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0',
        expected: 43210
      },
      {
        phaseSequence: [0, 1, 2, 3, 4],
        inputData: '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0',
        expected: 54321
      },
      {
        phaseSequence: [1, 0, 4, 3, 2],
        inputData:
          '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0',
        expected: 65210
      }
    ];

    test('getThrusterSignal', async () => {
      for (let td of testData) {
        const output = await getThrusterSignal(td.inputData, td.phaseSequence);
        expect(output).toEqual(td.expected);
      }
    });

    test('getAllCombinations', () => {
      const testSequence = [0, 1, 2];
      const expected = sort([
        [0, 2, 1],
        [0, 1, 2],
        [1, 0, 2],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0]
      ]);
      const combinations = JSON.stringify(getAllCombinations(testSequence));
      expect(combinations).toEqual(JSON.stringify(expected));
    });

    test('getAllCombinations - using examples', () => {
      const sequence = [0, 1, 2, 3, 4];
      const combinations = getAllCombinations(sequence).map(arr => arr.join(','));
      expect(combinations.includes('4,3,2,1,0')).toBeTruthy();
      expect(combinations.includes('0,1,2,3,4')).toBeTruthy();
      expect(combinations.includes('1,0,4,3,2')).toBeTruthy();
    })

    test('maxThrusterSignal', async () => {
      const sequence = [0, 1, 2, 3, 4]
      for (let td of testData) {
        const output = await maxThrusterSignal(td.inputData, sequence);
        expect(output).toEqual(td.expected);
      }
    })
  });
});
