const { showAdditionalEquipmentSection } = require('@config-triglav-si/motor-insurance-product/component/TabCasco/lib/TabCascoHelpers');

module.exports = function showMachineryBreakdownWorkDevices(input) {

  const subtype = input?.context?.Body?.insuredObject?.vehicle?.subtype;

  // if showAdditionalEquipmentSection returns false, it means that the whole additional equipment section will be hidden
  // Tabs need to stay "visible" otherwise platform throws an error that all tabs are hidden
  if (!showAdditionalEquipmentSection(input)) {
    return true;
  }

  if (subtype) {
    if (subtype.selectedSubtype === 'vehicleTruck' || subtype.selectedSubtype === 'vehicleBus' || subtype.selectedSubtype === 'vehicleTrailerVehicles' || subtype.selectedSubtype === 'vehicleWorkAndSpecialVehicles') {
      return true;
    }
  }
};
