const IntcodeVM = require('./IntcodeVM');

const GRID_SIZE = 50;
const WALL = '█';
const DROID = 'D';
const OXYGEN = 'O';
const PATH = '.';
const SPACE = ' ';

class Maze {
  constructor(inputData) {
    this.program = new IntcodeVM(inputData);
    this.grid = Maze.createGrid(GRID_SIZE);
    this.x = Math.floor(GRID_SIZE / 2);
    this.y = Math.floor(GRID_SIZE / 2);
  }

  static createGrid(size) {
    return Array(size).fill(Array(50).fill(SPACE))
  }

  // TODO: Recursively traverse paths, saving state for each path
  // TODO: Keep track of distance in each one
  // traversePath()
}

module.exports = Maze;
