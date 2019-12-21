const basePattern = [0, 1, 0, -1];

exports.patternAtIndex = (pos = 0, maxLength = null) => {
  if (!maxLength) {
    return basePattern
      .reduce((acc, el) => acc.concat(Array(pos + 1).fill(el)), [])
      .concat(basePattern[0])
      .slice(1);
  } else {
    let pattern = Array(maxLength);
    let p = 0;
    let i = 0;
    let index = 0;
    while (index < maxLength + 1) {
      const multi = basePattern[i];
      if (multi) {
        pattern[index - 1] = multi;
      }
      index++;
      p++;
      if (p > pos) {
        p = 0;
        i++;
      }
      if (i === basePattern.length) {
        i = 0;
      }
    }
    return pattern;
  }
};

exports.calcDigit = (input, pos) => {
  let pattern = this.patternAtIndex(pos, input.length);

  return Math.abs(
    Object.entries(pattern).reduce((output, [i, multi]) => {
      const index = parseInt(i);
      return output + input[index] * multi;
    }, 0) % 10
  );
};

exports.calcFFT = (inputData, phases, offset = 0) => {
  let input = inputData.trim();
  let output = null;
  let c = 0;
  if (offset > inputData.length / 2) {
    c = offset;
    input = input.slice(c);
  }
  for (let p = 0; p < phases; p++) {
    input = output || input;
    output = '';
    for (c = 0; c < input.length; c++) {
      output += this.calcDigit(input, c);
    }
  }
  return output.slice(offset, offset + 8);
};

exports.calcLargeFFT = (inputData, phases, offset) => {
  let input = inputData.trim()
  let output = null;
  for (let p = 0; p < phases; p++) {
    input = output ? output.slice() : input;
    output = [...input];
    for (let c = output.length - 1; c >= 0; c--) {
      let sum = (output[c + 1] ? parseInt(output[c + 1]) : 0) + parseInt(input[c]);
      if (Number.isNaN(sum)) {
        throw new Error('sum is not a number')
      }
      output[c] = Math.abs(sum % 10);
    }
    output = output.join('');
  }
  return output;
};
