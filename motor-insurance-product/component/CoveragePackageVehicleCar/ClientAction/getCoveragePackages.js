const { CarCoveragePackageDefinition } = require('@config-triglav-si/motor-insurance-product/lib/CarCoveragePackageDefinition');

module.exports = function getCoveragePackages(input) {

  return (input.options || []).map(packageName => {
    return {
      name: packageName,
      ...CarCoveragePackageDefinition({ packageName })
    };
  });
};
