const lib = require('./lib');

describe('day 12', () => {
  test('parseMoons', () => {
    const testData = `<x=-1, y=0, z=2>
                      <x=2, y=-10, z=-7>
                      <x=4, y=-8, z=8>
                      <x=3, y=5, z=-1>`;
    const expectedCoords = [
      { x: -1, y: 0, z: 2 },
      { x: 2, y: -10, z: -7 },
      { x: 4, y: -8, z: 8 },
      { x: 3, y: 5, z: -1 }
    ];
    const moons = lib.parseMoons(testData);
    expect(moons).toHaveLength(4);
    for (let i = 0; i < moons.length; i++) {
      expect(moons[i].position).toEqual(expect.objectContaining(expectedCoords[i]));
    }
  });

  describe('total energy', () => {
    const testData = [
      {
        input: `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`,
        steps: 10,
        expected: 179
      }
    ];

    test('processStep', () => {
      const td = testData[0];
      const moons = lib.parseMoons(td.input);

      

      expect(moons).toHaveLength(4);

      expect(moons[0].position).toEqual(
        expect.objectContaining({
          x: -1,
          y: 0,
          z: 2
        })
      );
      // Step 1
      lib.processStep(moons);
      expect(moons[0].position).toEqual(
        expect.objectContaining({
          x: 2,
          y: -1,
          z: 1
        })
      );
      expect(moons[1].position).toEqual(
        expect.objectContaining({
          x: 3,
          y: -7,
          z: -4
        })
      );
      expect(moons[0].velocity).toEqual(
        expect.objectContaining({
          x: 3,
          y: -1,
          z: -1
        })
      );
      // Step 2
      lib.processStep(moons);
      expect(moons[0].position).toEqual(
        expect.objectContaining({
          x: 5,
          y: -3,
          z: -1
        })
      );
      expect(moons[0].velocity).toEqual(
        expect.objectContaining({
          x: 3,
          y: -2,
          z: -2
        })
      );
    });

    test('getEnergy', () => {
      for (let td of testData) {
        expect(lib.getEnergy(td.input, td.steps)).toEqual(td.expected);
      }
    });
  });
});
