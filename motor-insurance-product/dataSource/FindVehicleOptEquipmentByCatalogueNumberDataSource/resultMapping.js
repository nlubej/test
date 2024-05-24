const { mapEquipment } = require('@config-triglav-si/motor-insurance-product/lib/VehicleCatalogMapping');
module.exports = function resultMapping(input) {
  return mapEquipment(input);
};
