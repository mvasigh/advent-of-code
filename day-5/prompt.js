const readline = require('readline');

module.exports = question =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, answer => {
      const num = parseInt(answer.trim());
      rl.close();
      if (Number.isNaN(num)) {
        reject('Must input a valid integer');
      } else {
        resolve(num);
      }
    });
  });
