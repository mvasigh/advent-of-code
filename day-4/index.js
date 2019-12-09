const chalk = require('chalk');
const { allPossible } = require('./lib');

function main() {
  const RANGE_MIN = 125730;
  const RANGE_MAX = 579381;
  const passwords = allPossible(RANGE_MIN, RANGE_MAX);

  let output = '';
  const validPasswords = [];
  for (let password of passwords) {
    output +=
      (password.valid
        ? validPasswords.push(password) && chalk.green(password.value)
        : chalk.red(password.value)) + '  ';
  }
  console.log(output);
  console.log(`There are ${validPasswords.length} valid passwords`)
}

main();
