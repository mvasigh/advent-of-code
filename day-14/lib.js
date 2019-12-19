const Formula = require('./Formula');

const add = (obj1, obj2) => {
  for (let key in obj2) {
    if (key in obj1) {
      obj1[key] += obj2[key];
    } else {
      obj1[key] = obj2[key];
    }
  }
  return { ...obj1 };
};

exports.parseFormulae = inputData =>
  inputData
    .trim()
    .split('\n')
    .map(raw => new Formula(raw))
    .reduce((dict, formula) => {
      dict[formula.output] = formula;
      return dict;
    }, {});

exports.requiredOre = (formulae, product = 'FUEL', amount = 1) => {
  const res = this.requiredResources(formulae, product, amount);
  console.log({res})
  return Object.entries(res).reduce((ore, [resource, amt]) => {
    const formula = formulae[resource];
    return ore + (Math.ceil(amt / formula.yield) * formula.ingredients['ORE'])
  }, 0);
};

exports.requiredResources = (formulae, product, amount) => {
  let resources = {};
  const formula = formulae[product];
  for (let i in formula.ingredients) {
    if (i === 'ORE') continue;
    const _formula = formulae[i];
    console.log({formula, _formula})
    const ingredientAmt = amount * formula.ingredients[i]
    if ('ORE' in _formula.ingredients) {
      resources = add(resources, { [i]: ingredientAmt });
    } else {
      resources = add(
        resources,
        this.requiredResources(formulae, i, formula.ingredients[i])
      );
    }
  }
  return resources;
};

exports.oreForFuel = (inputData, product = 'FUEL') => {
  const formulae = this.parseFormulae(inputData);
  return this.requiredOre(formulae, product);
};
