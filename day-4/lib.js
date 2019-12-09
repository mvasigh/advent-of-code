exports.neverDecreases = num => {
  const str = num.toString();
  const arr = str.split('');
  arr.sort();
  return str === arr.join('');
};

exports.isValid = num => {
  const str = num.toString();
  const repeat = /(\d)\1+/g;

  // Must have six digits
  if (str.length !== 6) return false;
  // Must have at least one instance of a repeating digit
  if (!repeat.test(str)) return false;
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
