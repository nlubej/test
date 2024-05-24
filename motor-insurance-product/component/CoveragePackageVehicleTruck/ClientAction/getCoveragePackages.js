const { TruckCoveragePackageDefinition } = require('@config-triglav-si/motor-insurance-product/lib/TruckCoveragePackageDefinition');
const { truckVehicleMassLimit } = require('@config-triglav-si/contract/lib/ContractConstantsAndEnums');

module.exports = function getCoveragePackages(input) {

  const vehicleMass = input.rootContext.Body.insuredObject?.vehicle?.baseData?.vehicleMass;
  const massAboveLimit = vehicleMass > truckVehicleMassLimit;
  return (input.options || []).map(packageName => {
    return {
      name: packageName,
      ...TruckCoveragePackageDefinition({ packageName, massAboveLimit })
    };
  });
};
