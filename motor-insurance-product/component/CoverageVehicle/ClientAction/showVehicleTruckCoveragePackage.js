module.exports = function showVehicleTruckCoveragePackage(input) {

  const selectedSubtype = input.rootContext.Body.insuredObject?.vehicle?.subtype?.selectedSubtype;
  const vehicleMass = input.rootContext.Body.insuredObject?.vehicle?.baseData?.vehicleMass;

  return selectedSubtype === 'vehicleTruck' && vehicleMass;
};
