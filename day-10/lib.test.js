const lib = require('./lib');

describe('day 10', () => {
  describe('basic asteroid grid', () => {
    const testData = `.#..#
                      .....
                      #####
                      ....#
                      ...##`;
    const grid = lib.createGrid(testData);

    test('createGrid', () => {
      const expected = ['.#..#', '.....', '#####', '....#', '...##'];
      grid.forEach((row, i) => {
        expect(row).toEqual(expected[i]);
      });
    });

    test('visibleAsteroids', () => {
      expect(lib.visibleAsteroids(grid, [1, 0])).toEqual(7);
      expect(lib.visibleAsteroids(grid, [3, 4])).toEqual(8);
      expect(lib.visibleAsteroids(grid, [0, 2])).toEqual(6);
      expect(lib.visibleAsteroids(grid, [1, 2])).toEqual(7);
      expect(lib.visibleAsteroids(grid, [2, 2])).toEqual(7);
      expect(lib.visibleAsteroids(grid, [3, 2])).toEqual(7);
    });

    test('maxAsteroids', () => {
      expect(lib.maxAsteroids(testData).num).toEqual(8)
    })
  });

  describe('advanced asteroid grids', () => {
    const testData = [
      {
        input: `......#.#.
                #..#.#....
                ..#######.
                .#.#.###..
                .#..#.....
                ..#....#.#
                #..#....#.
                .##.#..###
                ##...#..#.
                .#....####`,
        expected: 33
      },
      {
        input: `#.#...#.#.
                .###....#.
                .#....#...
                ##.#.#.#.#
                ....#.#.#.
                .##..###.#
                ..#...##..
                ..##....##
                ......#...
                .####.###.`,
        expected: 35
      },
      {
        input: `.#..#..###
                ####.###.#
                ....###.#.
                ..###.##.#
                ##.##.#.#.
                ....###..#
                ..#.#..#.#
                #..#.#.###
                .##...##.#
                .....#.#..`,
        expected: 41
      },
      {
        input: `.#..##.###...#######
                ##.############..##.
                .#.######.########.#
                .###.#######.####.#.
                #####.##.#.##.###.##
                ..#####..#.#########
                ####################
                #.####....###.#.#.##
                ##.#################
                #####.##.###..####..
                ..######..##.#######
                ####.##.####...##..#
                .#####..#.######.###
                ##...#.##########...
                #.##########.#######
                .####.#.###.###.#.##
                ....##.##.###..#####
                .#.#.###########.###
                #.#.#.#####.####.###
                ###.##.####.##.#..##`,
        expected: 210
      },
    ]

    test('maxAsteroids', () => {
      for (let td of testData) {
        expect(lib.maxAsteroids(td.input).num).toEqual(td.expected)
      }
    });

    test('laserHitNumber', () => {
      const td = testData[testData.length - 1];
      const hitCoords = lib.laserHitNumber(td.input, [11, 13], 500);
      expect(hitCoords[0].coords).toEqual([11, 12])
      expect(hitCoords[1].coords).toEqual([12, 1])
      expect(hitCoords[9].coords).toEqual([12, 8])
      expect(hitCoords[19].coords).toEqual([16, 0])
      expect(hitCoords[49].coords).toEqual([16, 9])
      expect(hitCoords[99].coords).toEqual([10, 16])
      expect(hitCoords[198].coords).toEqual([9, 6])
    })
  })
});
