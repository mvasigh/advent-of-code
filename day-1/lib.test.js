const { getTotalFuel } = require('./lib');

describe('day 1', () => {
  test('getTotalFuel', () => {
    expect(getTotalFuel(1969)).toEqual(966);
    expect(getTotalFuel(100756)).toEqual(50346);
  });
});
