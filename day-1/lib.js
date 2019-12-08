exports.getModuleFuel = mass => {
  if (typeof mass !== 'number') {
    throw new Error('Mass must be of type "number"');
  }
  return Math.floor(mass / 3) - 2;
};

// naming things is fun!
exports.getFuelFuel = fuel => {
  const fuelFuel = Math.max(this.getModuleFuel(fuel), 0);
  if (!fuelFuel) {
    return fuelFuel;
  }
  return fuelFuel + this.getFuelFuel(fuelFuel);
};

exports.getMassFuel = mass => {
  const massFuel = this.getModuleFuel(mass);
  return massFuel + this.getFuelFuel(massFuel);
};

exports.getTotalFuel = mass => {
  if (typeof mass === 'number') {
    return this.getMassFuel(mass);
  }
  return mass.reduce((sum, mass) => {
    sum += this.getMassFuel(mass);
    return sum;
  }, 0);
};
