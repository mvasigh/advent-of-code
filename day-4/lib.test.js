const { neverDecreases, allPossible, isValid } = require('./lib');

describe('day 4', () => {
  test('neverDecreases', () => {
    expect(neverDecreases(123456)).toEqual(true);
    expect(neverDecreases(111111)).toEqual(true);
    expect(neverDecreases(999999)).toEqual(true);
    expect(neverDecreases(321)).toEqual(false);
    expect(neverDecreases(1111231)).toEqual(false);
    expect(neverDecreases(1)).toEqual(true);
  });

  // test('allPossible', () => {
  //   expect(allPossible(111111, 111113)).toHaveLength(3);
  //   expect(allPossible(111111, 111121)).toHaveLength(9);
  // }); 

  test('isValid', () => {
    expect(isValid(111111)).toBeTruthy();
    expect(isValid(223450)).toBeFalsy();
    expect(isValid(123789)).toBeFalsy();
  });
});
