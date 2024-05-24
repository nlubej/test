const { sumEquipmentValue } = require('@config-triglav-si/motor-insurance-product/component/VehicleSearch/lib/optionalEquipmentHelper');

module.exports = function sumTotalValue(input) {
  const vehicleValue = input.refData.vehicleValue;

  if (!vehicleValue) {
    return;
  }

  const optionalEquipmentValue = sumEquipmentValue(input.refData.optionalEquipment) || 0;

  const totalValue = vehicleValue + optionalEquipmentValue;

  return { value: totalValue };
};
