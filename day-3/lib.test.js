const {
  instructionsToArray,
  parseInstructions,
  calculateDistance,
  shortestDistance,
  findIntersects
} = require('./lib');

describe('day 3', () => {
  test('instructionsToArray', () => {
    expect(instructionsToArray('R31,U2,D900,L22')).toEqual([
      ['R', 31],
      ['U', 2],
      ['D', 900],
      ['L', 22]
    ]);
  });

  test('parseInstructions', () => {
    expect(parseInstructions('U3')).toEqual([
      [0, 1],
      [0, 2],
      [0, 3]
    ]);
    expect(parseInstructions('U2,R2')).toEqual([
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2]
    ]);
  });

  test('calculateDistance', () => {
    expect(calculateDistance([0, 0], [3, 2])).toEqual(5);
    expect(calculateDistance([10, 12], [-1, 3])).toEqual(20);
    expect(calculateDistance([5, 6], [2, 10])).toEqual(7);
  });

  test('shortestDistance - distance', () => {
    const parseAndShortest = input =>
      shortestDistance(
        ...input
          .trim()
          .split('\n')
          .map(raw => parseInstructions(raw))
      );

    expect(
      parseAndShortest(`R75,D30,R83,U83,L12,D49,R71,U7,L72
    U62,R66,U55,R34,D71,R55,D58,R83`).distance
    ).toEqual(159);

    expect(
      parseAndShortest(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`).distance
    ).toEqual(135);
  });

  test('findIntersects - shortest combined path', () => {
    const parseAndIntersects = input => {
      const intersects = findIntersects(
        ...input
          .trim()
          .split('\n')
          .map(raw => parseInstructions(raw))
      );
      return intersects.reduce((min, intersect) => {
        return intersect.pathLength < min.pathLength ? intersect : min;
      });
    };

    expect(
      parseAndIntersects(`R75,D30,R83,U83,L12,D49,R71,U7,L72
    U62,R66,U55,R34,D71,R55,D58,R83`).pathLength
    ).toEqual(610);
    expect(
      parseAndIntersects(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
      U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`).pathLength
    ).toEqual(410);
  });
});
