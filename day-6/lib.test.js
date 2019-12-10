const { countOrbits, countIndirectOrbits, countDirectOrbits, traversePaths, getRootRegex } = require('./lib');

const testData = `COM)B
                  B)C
                  C)D
                  D)E
                  E)F
                  B)G
                  G)H
                  D)I
                  E)J
                  J)K
                  K)L`;

describe('day 6', () => {
  test('countOrbits', () => {
    expect(countOrbits(testData)).toEqual(42);
  });

  test('countDirectOrbits', () => {
    expect(countDirectOrbits(testData)).toEqual(11);
  });

  test('countIndirectOrbits', () => {
    expect(countIndirectOrbits(testData)).toEqual(31)
  });

  test('getRootRegex', () => {
    const testPath = 'ABC-DEF-GHI'
    const expected = '(?<ctr>GHI)\\)(?<sat>[A-Z0-9]{1,3})'
    expect(getRootRegex(testPath).source).toEqual(expected);
  })
});
