const lib = require('./lib');

describe('day 8', () => {
  test('getLayerData', () => {
    const testData = '123456789012';
    const dimensions = [3, 2];
    const expected = ['123456', '789012'];
    const layerData = lib.getLayerData(testData, dimensions);
    expect(layerData.length).toEqual(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(layerData[i]).toEqual(expected[i]);
    }
  });

  test('decodeImage', () => {
    const testData = '0222112222120000';
    const dimensions = [2, 2];
    const expected = '01\n10\n';
    const decoded = lib.decodeImage(testData, dimensions);
    expect(decoded).toEqual(expected);
  })
});
