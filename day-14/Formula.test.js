const Formula = require('./Formula');

describe('day 14 - Formula', () => {
  test('instantiation', () => {
    const formula = new Formula('3 A, 4 B => 1 AB');
    expect(formula.ingredients).toEqual(
      expect.objectContaining({
        A: 3,
        B: 4
      })
    );
    expect(formula.output).toEqual('AB');
    expect(formula.yield).toEqual(1);
  });
});
