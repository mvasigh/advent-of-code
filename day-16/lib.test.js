const lib = require('./lib');

describe('day 16', () => {
  const testData = [
    {
      input: '12345678',
      phases: 4,
      expected: '01029498'
    },
    {
      input: '80871224585914546619083218645595',
      phases: 100,
      expected: '24176176'
    },
    {
      input: '19617804207202209144916044189917',
      phases: 100,
      expected: '73745418'
    },
    {
      input: '69317163492948606335995924319873',
      phases: 100,
      expected: '52432133'
    }
  ];

  // test('patternAtIndex', () => {
  //   expect(lib.patternAtIndex(0)).toEqual([1, 0, -1, 0]);
  //   expect(lib.patternAtIndex(1, 4 * 1)).toEqual([0, 1, 1, 0, 0, -1, -1, 0]);
  //   expect(lib.patternAtIndex(2, 4 * 2)).toEqual([0, 0, 1, 1, 1, 0, 0, 0, -1, -1, -1, 0]);
  // });

  test('calcDigit', () => {
    const input = '12345678';
    expect(lib.calcDigit(input, 0)).toEqual(4);
    expect(lib.calcDigit(input, 1)).toEqual(8);
    expect(lib.calcDigit(input, 2)).toEqual(2);
    expect(lib.calcDigit(input, 3)).toEqual(2);
    expect(lib.calcDigit(input, 4)).toEqual(6);
    expect(lib.calcDigit(input, 5)).toEqual(1);
    expect(lib.calcDigit(input, 6)).toEqual(5);
    expect(lib.calcDigit(input, 7)).toEqual(8);
  });

  test('calcFFT', () => {
    // first eight digits
    for (let td of testData) {
      const output = lib.calcFFT(td.input, td.phases);
      expect(output.slice(0, 8)).toEqual(td.expected);
    }
  });

  test('calcFFT - offset', () => {
    const td = testData[0]
    const output = lib.calcFFT(td.input, td.phases, 5);
    expect(td.expected.endsWith(output)).toBeTruthy();
  })

  test('calcLargeFFT - offset', () => {
    const td = testData[0]
    const output = lib.calcLargeFFT(td.input, td.phases, Math.ceil(td.input.length / 2));
    expect(output).toBeTruthy();
  })
});
