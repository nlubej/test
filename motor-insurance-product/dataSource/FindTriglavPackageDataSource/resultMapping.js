module.exports = (input) => {
  const triglavPackages = input.triglavPackages?.find(elem => elem.status === 'A');
  const triglavPackageId = triglavPackages?.idTriglavPackage;

  return {
    triglavPackageId
  };
};
