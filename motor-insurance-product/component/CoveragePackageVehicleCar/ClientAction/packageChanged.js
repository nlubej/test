const { CarCoveragePackageDefinition } = require('@config-triglav-si/motor-insurance-product/lib/CarCoveragePackageDefinition');
const { setCoverages } = require('@config-triglav-si/motor-insurance-product/lib/CoveragePackageHelper');

module.exports = function packageChanged(input, ambientProperties) {
  const coveragesInPackage = CarCoveragePackageDefinition({ packageName: input.data.selectedPackage });
  const selectedCoverages = Object.keys(coveragesInPackage)
    .map(key => {
      return coveragesInPackage[key] ? key : undefined;
    }).filter(key => key);

  setCoverages.call(this, input, ambientProperties, selectedCoverages);

  this.view.rebind('/Body/insuredObject/vehicle/*');
};
