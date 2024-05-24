const { vehicleTypes, fuelTypes } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');

function vehicleCatalogMapping(sinkExchange) {
  const vehicleSearchData = sinkExchange.vehicleSearchData;
  const etaxData = sinkExchange.etaxData;
  const emrvlData = sinkExchange.emrvlData;
  const vehicleRegistryData = {};

  if (sinkExchange.foundByVinPlus) {
    vehicleRegistryData.etaxData = etaxData;
    vehicleRegistryData.optionalEquipment = vehicleSearchData.optionalEquipment;
  }
  else if (sinkExchange.particalEtaxData) {
    vehicleRegistryData.particalEtaxData = sinkExchange.particalEtaxData.map(elem => ({
      subType: Object.keys(vehicleTypes).find(key => vehicleTypes[key] === parseInt(elem.vehGroup)),
      vehicleBrand: elem.vehManufacturer,
      vehicleModel: elem.vehModel?.split(' (')[0],
      vehicleType: elem.vehType?.split(' (')[0],
      engineDisplacement: elem.engineSize,
      enginePower: elem.vehPower,
      fuelType: fuelTypes[elem.fuelType],
      numberOfSeats: elem.registeredSeats,
      numberOfDoors: elem.doors,
      vehiclePrice: elem.vehPrice,
      vehicleWeight: elem.vehWeight,
      catalogueNumber: elem.eurotaxCode
    }));
  }

  if (vehicleSearchData.emrvlStatus === 'FOUND') {
    vehicleRegistryData.emrvlData = emrvlData;
  }

  return vehicleRegistryData;
}

function mapEquipment(eq) {
  return {
    code: eq.code.toString(),
    description: eq.text,
    price: eq.price,
    validFrom: eq?.validFrom !== false ? eq.validFrom.replace(/^(.{4})(.{2})(.{2})(.*)$/, '$1-$2-$3') : undefined,
    validTo: eq?.validUntil !== false ? eq.validUntil.replace(/^(.{4})(.{2})(.{2})(.*)$/, '$1-$2-$3') : undefined
  };
}

module.exports = {
  vehicleCatalogMapping: vehicleCatalogMapping,
  mapEquipment: mapEquipment
};
