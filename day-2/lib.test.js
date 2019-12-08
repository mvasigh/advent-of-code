const { runProgram, stringify } = require('./lib');

describe('day 2', () => {
  test('runProgram', () => {
    expect(stringify(runProgram('1,0,0,0,99'))).toEqual('2,0,0,0,99');
    expect(stringify(runProgram('2,3,0,3,99'))).toEqual('2,3,0,6,99');
    expect(stringify(runProgram('2,4,4,5,99,0'))).toEqual('2,4,4,5,99,9801');
    expect(stringify(runProgram('1,1,1,4,99,5,6,0,99'))).toEqual('30,1,1,4,2,5,6,0,99');
  });
});
