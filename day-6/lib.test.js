const {
  countOrbits,
  countIndirectOrbits,
  countDirectOrbits,
  countOrbitalTransfers,
  getRootRegex
} = require('./lib');

describe('day 6 part 1', () => {
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
  test('countOrbits', () => {
    expect(countOrbits(testData)).toEqual(42);
  });

  test('countDirectOrbits', () => {
    expect(countDirectOrbits(testData)).toEqual(11);
  });

  test('countIndirectOrbits', () => {
    expect(countIndirectOrbits(testData)).toEqual(31);
  });

  test('getRootRegex', () => {
    const testPath = 'ABC-DEF-GHI';
    const expected = '(?<ctr>GHI)\\)(?<sat>[A-Z0-9]{1,3})';
    expect(getRootRegex(testPath).source).toEqual(expected);
  });
});

describe('day 6 part 2', () => {
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
                    K)L
                    K)YOU
                    I)SAN`;

  test('countOrbitalTransfers', () => {
    const origin = 'YOU';
    const destination = 'SAN';
    const transfers = countOrbitalTransfers(testData, origin, destination);
    expect(transfers).toEqual(4);
  });
});
