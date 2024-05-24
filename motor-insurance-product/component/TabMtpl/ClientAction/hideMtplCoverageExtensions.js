const { LocalDate } = require('@js-joda/core');

module.exports = function hideMtplCoverageExtensions(input) {

  const selectedSubtype = input.context.Body?.insuredObject?.vehicle?.subtype?.selectedSubtype;

  if (selectedSubtype !== 'vehicleTruck' && selectedSubtype !== 'vehicleTractor' && selectedSubtype !== 'vehicleTrailerVehicles' && selectedSubtype !== 'vehicleWorkAndSpecialVehicles') {
    return true;
  }

  const mtplIsSelected = input.context.Body.insuredObject?.vehicle?.mtpl?.isSelected;

  if (!mtplIsSelected) {
    return true;
  }

  const contractDuration = getContractDuration(input);

  if (contractDuration) {
    if (contractDuration.startDate && contractDuration.endDate) {
      const startDate = LocalDate.parse(contractDuration.startDate);
      const endDate = LocalDate.parse(contractDuration.endDate);

      if (!contractDuration.dateSynchronization) {
        if (startDate.plusYears(1).isAfter(endDate)) {
          return true;
        }
      }
    }
  }

  return false;
};

function getContractDuration(input) {
  if (input.context.Body.contractDuration) {
    return input.context.Body.contractDuration;
  }
  else if (input.context.Summary.contractDuration) {
    // in case of general amendment
    return input.context.Summary.contractDuration;
  }

  return;
}
