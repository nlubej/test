const getPackageDefinition = require('@config-triglav-si/motor-insurance-product/component/MotorCoveragePackage/lib/MotorCoveragePackageDefinition');

module.exports = function getCoveragePackages(input, ambientProperties) {
  return getPackageDefinition(input.data?.insuredObject?.vehicle);
};
