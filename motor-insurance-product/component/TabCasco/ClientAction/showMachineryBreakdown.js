const { showAdditionalEquipmentSection } = require('@config-triglav-si/motor-insurance-product/component/TabCasco/lib/TabCascoHelpers');

module.exports = function showMachineryBreakdown(input) {

  const subtype = input?.context?.Body?.insuredObject?.vehicle?.subtype;
  const combinationB = input?.context?.Body?.insuredObject?.vehicle?.combinationB?.isSelected;
  const casco = input?.context?.Body?.insuredObject?.vehicle?.casco?.isSelected;

  // if showAdditionalEquipmentSection returns false, it means that the whole additional equipment section will be hidden
  // Tabs need to stay "visible" otherwise platform throws an error that all tabs are hidden
  if (!showAdditionalEquipmentSection(input)) {
    return true;
  }

  if (combinationB && casco) {
    if (subtype) {
      if (subtype.selectedSubtype === 'vehicleTractor' || subtype.selectedSubtype === 'vehicleWorkAndSpecialVehicles') {
        return true;
      }
    }
  }
};
