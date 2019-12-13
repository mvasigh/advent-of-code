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
      expect(lib.maxAsteroids(testData)).toEqual(8)
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
        expect(lib.maxAsteroids(td.input)).toEqual(td.expected)
      }
    })
  })
});
