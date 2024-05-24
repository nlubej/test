
module.exports = function hideAssistance(input) {

  const premiumGroup = input?.context?.Body?.insuredObject?.vehicle?.subtype?.selectedSubtype;
  const maximumAuthorisedMass = input?.context?.Body?.insuredObject?.vehicle?.baseData?.maximumAuthorisedMass;

  if (premiumGroup === 'vehicleBus' || premiumGroup === 'vehicleTractor') {
    return true;
  }

  if (maximumAuthorisedMass > 3500 && premiumGroup === 'vehicleWorkAndSpecialVehicles') {
    return true;
  }

};
