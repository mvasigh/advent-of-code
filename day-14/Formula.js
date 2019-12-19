class Formula {
  constructor(formulaData) {
    const formulaRegex = '(?<amt>\\d+).(?<name>[A-Z]+)';
    const [ingredientData, productData] = formulaData.split('=>');
    let matches;

    const productRegex = new RegExp(formulaRegex, 'g');
    matches = productRegex.exec(productData);
    this.output = matches.groups.name;
    this.yield = parseInt(matches.groups.amt)

    const ingredientRegex = new RegExp(formulaRegex, 'g');
    let ingredients = {};
    while ((matches = ingredientRegex.exec(ingredientData)) !== null) {
      const { name, amt } = matches.groups;
      ingredients[name] = name === 'ORE' ? parseInt(amt) : parseInt(amt) / this.yield;
    }
    this.ingredients = ingredients;
  }
}

module.exports = Formula;
