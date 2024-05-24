
const { TruckCoveragePackageDefinition } = require('@config-triglav-si/motor-insurance-product/lib/TruckCoveragePackageDefinition');
const { truckVehicleMassLimit } = require('@config-triglav-si/contract/lib/ContractConstantsAndEnums');
const { setCoverages } = require('@config-triglav-si/motor-insurance-product/lib/CoveragePackageHelper');

module.exports = function packageChanged(input, ambientProperties) {
  const vehicleMass = input.rootContext.Body.insuredObject?.vehicle?.baseData?.vehicleMass;
  const massAboveLimit = vehicleMass > truckVehicleMassLimit;
  const coveragesInPackage = TruckCoveragePackageDefinition({ packageName: input.data.selectedPackage, massAboveLimit });
  const selectedCoverages = Object.keys(coveragesInPackage)
    .map(key => {
      return coveragesInPackage[key] ? key : undefined;
    }).filter(key => key);

  setCoverages.call(this, input, ambientProperties, selectedCoverages);

  this.view.rebind('/Body/*');
};
