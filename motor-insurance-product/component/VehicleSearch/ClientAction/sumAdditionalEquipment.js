const { sumEquipmentValue } = require('../lib/optionalEquipmentHelper');

module.exports = function sumAdditionalEquipment(input) {
  return { value: sumEquipmentValue(input.refData) };
};
