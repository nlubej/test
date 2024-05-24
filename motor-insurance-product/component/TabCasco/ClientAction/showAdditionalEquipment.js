const { showAdditionalEquipmentSection } = require('@config-triglav-si/motor-insurance-product/component/TabCasco/lib/TabCascoHelpers');

module.exports = function showAdditionalEquipment(input) {

  const combinationB = input?.context?.Body?.insuredObject?.vehicle?.combinationB?.isSelected;
  const combinationK = input?.context?.Body?.insuredObject?.vehicle?.combinationK?.isSelected;
  const casco = input?.context?.Body?.insuredObject?.vehicle?.casco?.isSelected;

  // if showAdditionalEquipmentSection returns false, it means that the whole additional equipment section will be hidden
  // Tabs need to stay "visible" otherwise platform throws an error that all tabs are hidden
  if (!showAdditionalEquipmentSection(input)) {
    return true;
  }

  if (combinationB || combinationK || casco) {
    return true;
  }
};
