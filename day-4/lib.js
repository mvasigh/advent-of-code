exports.neverDecreases = num => {
  const str = num.toString();
  const arr = str.split('');
  arr.sort();
  return str === arr.join('');
};

exports.matchingDigits = str => {
  const repeat = /(\d)\1{1}(?!\1)/g;
  let valid = false;
  let matchArr;
  while ((matchArr = repeat.exec(str)) !== null) {
    const match = matchArr[0];
    const preceding = str[repeat.lastIndex - match.length - 1]
    if (preceding !== match[0]) {
      valid = true;
    }
  }
  return valid;
}

exports.isValid = num => {
  const str = num.toString();

  // Must have six digits
  if (str.length !== 6) return false;
  // Must have at least one instance of a repeating digit
  if (!this.matchingDigits(str)) return false;
  // Must not ever decrease going left to right
  if (!this.neverDecreases(num)) return false;

  return true;
};

exports.allPossible = (min, max) => {
  let passwords = [];

  for (let num = min; num <= max; num++) {
    passwords.push({
      value: num,
      valid: this.isValid(num)
    });
  }

  return passwords;
};
