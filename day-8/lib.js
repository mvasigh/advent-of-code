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

exports.verifyImage = inputData => {
  const layerData = this.getLayerData(inputData, [25, 6]);
  const fewestZeroes = layerData.reduce((a, b) => {
    const [aZeroes, bZeroes] = [a, b].map(str => str.replace(/[1-9]/g, '').length);
    return aZeroes < bZeroes ? a : b;
  });
  const ones = fewestZeroes.replace(/[02-9]/g, '').length;
  const twos = fewestZeroes.replace(/[0-13-9]/g, '').length;
  console.log(`The number of ones multiplied by twos is ${ones * twos}`);
};

exports.decodeImage = (inputData, [w, h]) => {
  const layerData = this.getLayerData(inputData, [w, h]);
  const image = Array(h).fill(null).map(() => Array(w).fill(null));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let i = y * w + x;
      let val;
      for (let layer of layerData) {
        val = parseInt(layer[i]);
        if (val !== 2) break;
      }
      image[y][x] = val;
    }
  }
  return image.map(row => row.join('')).join('\n') + '\n'
};
