const { neverDecreases, matchingDigits, isValid } = require('./lib');

describe('day 4', () => {
  test('neverDecreases', () => {
    expect(neverDecreases(123456)).toEqual(true);
    expect(neverDecreases(111111)).toEqual(true);
    expect(neverDecreases(999999)).toEqual(true);
    expect(neverDecreases(321)).toEqual(false);
    expect(neverDecreases(1111231)).toEqual(false);
    expect(neverDecreases(1)).toEqual(true);
  });

  test('isValid', () => {
    expect(isValid(223450)).toBeFalsy();
    expect(isValid(123789)).toBeFalsy();
    expect(isValid(123444)).toBeFalsy();
    expect(isValid(111122)).toBeTruthy();
    expect(isValid(112233)).toBeTruthy();
    expect(isValid(123444)).toBeFalsy();
  });

  test('matchingDigits', () => {
    expect(matchingDigits('111')).toBeFalsy();
    expect(matchingDigits('11111')).toBeFalsy();
    expect(matchingDigits('111122')).toBeTruthy();
  })
});
