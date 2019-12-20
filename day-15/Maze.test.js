const Maze = require('./Maze');
const IntcodeVM = require('./IntcodeVM')

describe('day 15 - Maze', () => {
  test('instantiates', () => {
    const testData = '3,1033,1008,1033,1,1032,1005,1032,31'
    const maze = new Maze(testData);
    expect(maze.program).toBeInstanceOf(IntcodeVM)
  })
})
