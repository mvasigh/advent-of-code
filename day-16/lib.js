const basePattern = [0, 1, 0, -1];

exports.patternAtIndex = (pos = 0) =>
  basePattern
    .reduce((acc, el) => acc.concat(Array(pos + 1).fill(el)), [])
    .concat(basePattern[0])
    .slice(1);

exports.calcDigit = (input, pos) => {
  let pattern = this.patternAtIndex(pos);
  while (pattern.length < input.length) {
    pattern = pattern.concat(pattern);
  }
  const nonzeroes = pattern.slice(0, input.length).reduce(
    (acc, val, i) =>
      val
        ? {
            ...acc,
            [i]: val
          }
        : acc,
    {}
  );

  return Math.abs(
    Object.entries(nonzeroes).reduce((output, [i, multi]) => {
      return output + parseInt(input[i]) * multi;
    }, 0) % 10
  );
};

exports.calcFFT = (input, phases) => {
  input = input.trim();
  let output = [...input];
  for (let p = 0; p < phases; p++) {
    console.log(`Running phase ${p}`)
    const _input = output.join('');
    output = output.map((_, i) => this.calcDigit(_input, i));
  }
  return output.join('');
};
