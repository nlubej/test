const { sumEquipmentValue } = require('@config-triglav-si/motor-insurance-product/component/VehicleSearch/lib/optionalEquipmentHelper');

module.exports = function sumOptionalEquipment(input) {
  return { value: sumEquipmentValue(input.refData) };
};
