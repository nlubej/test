const { showAdditionalEquipmentSection } = require('@config-triglav-si/motor-insurance-product/component/TabCasco/lib/TabCascoHelpers');

module.exports = function hideCascoTabAdditionalCoverages(input) {
  return !showAdditionalEquipmentSection(input);
};
