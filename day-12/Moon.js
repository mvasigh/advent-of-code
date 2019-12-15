class Moon {
  constructor({ x, y, z }) {
    this.position = { x, y, z };
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    };
  }
}

module.exports = Moon;
