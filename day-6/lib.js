exports.countOrbits = inputData => {
  const data = inputData.trim();
  const directOrbits = this.countDirectOrbits(data);
  const indirectOrbits = this.countIndirectOrbits(data);
  return directOrbits + indirectOrbits;
};

exports.countDirectOrbits = inputData => inputData.trim().match(/\n/g).length + 1;

exports.countIndirectOrbits = inputData => {
  const paths = this.traversePaths(inputData);
  let indirectOrbits = 0;
  for (let path of paths) {
    const connections = path.trim().match(/[A-Z0-9]{1,3}/g).length;
    indirectOrbits += connections - 2;
  }
  return indirectOrbits;
};

exports.getRootRegex = rootPath => {
  const { root } = /(?<root>[A-Z0-9]{1,3})$/g.exec(rootPath).groups;
  return new RegExp(`(?<ctr>${root})\\)(?<sat>[A-Z0-9]{1,3})`, 'g');
};

exports.traversePaths = (inputData, rootPath = 'COM') => {
  let regex = this.getRootRegex(rootPath);
  let matches;
  let paths = [];
  let path = rootPath;
  while ((matches = regex.exec(inputData)) !== null) {
    const { ctr, sat } = matches.groups;
    const newPath = `-${sat}`;
    paths.push(path + newPath);
    paths = paths.concat(this.traversePaths(inputData, path + newPath));
  }
  return paths;
};

exports.countOrbitalTransfers = (inputData, orig, dest) => {
  const paths = this.traversePaths(inputData);
  const [origPath, destPath] = [orig, dest].map(str => paths.find(path => path.endsWith(str)));
  let transferPath;
  for (let i = 0; i < Math.max(origPath.length, destPath.length); i++) {
    if (origPath[i] === destPath[i]) continue;
    transferPath = origPath.slice(i) + '-' + destPath.slice(i);
    break;
  }
  return transferPath.trim().match(/[A-Z0-9]{1,3}/g).length - 2;
};
