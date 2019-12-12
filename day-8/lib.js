exports.getLayerData = (imageData, [w, h]) => {
  const _data = imageData.trim();
  const area = w * h;
  const layerData = [];
  const layers = _data.length / area;
  for (let i = 0; i < layers; i++) {
    layerData.push(_data.slice(i * area, (i + 1) * area));
  }
  return layerData;
};

exports.verifyImage = (inputData) => {
  const layerData = this.getLayerData(inputData, [25, 6]);
  const fewestZeroes = layerData.reduce((a, b) => {
    const [aZeroes, bZeroes] = [a, b].map(str => str.replace(/[1-9]/g, '').length);
    return aZeroes < bZeroes ? a : b;
  });
  const ones = fewestZeroes.replace(/[02-9]/g, '').length;
  const twos = fewestZeroes.replace(/[0-13-9]/g, '').length;
  console.log(`The number of ones multiplied by twos is ${ones * twos}`)
}
