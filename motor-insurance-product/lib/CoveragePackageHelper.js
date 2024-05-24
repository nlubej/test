const { clearCoverageData } = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectMotorQuote/lib/InsuredObjectCoverageHelpers');
const CoveragesForSelectedSubtypeAndType = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectMotorQuote/lib/CoveragesForSelectedSubtypeAndType');
const { setDefaultValuesForCoverages } = require('@config-triglav-si/motor-insurance-product/lib/SetDefaultValuesForCoverages');
const { initClientViewModelMotorCoverages } = require('@config-triglav-si/motor-insurance-product/component/MotorCoveragesClientSchema/lib/MotorCoveragesClientHelper');

function setCoverages(input, ambientProperties, selectedCoverages = []) {
  const body = input.rootContext.Body;
  const startDate = body.contractDuration?.startDate;

  const allCoveragesKeys = CoveragesForSelectedSubtypeAndType({ ...body.insuredObject, isMainCoverage: true });
  allCoveragesKeys.forEach(coverageKey => {
    if (!body.insuredObject?.vehicle[coverageKey]) {
      body.insuredObject.vehicle[coverageKey] = {};
    }
    const coverageData = body.insuredObject?.vehicle[coverageKey];
    coverageData.isSelected = (coverageData && selectedCoverages.includes(coverageKey)) || false;
    if (!coverageData.isSelected) {
      clearCoverageData(coverageData);
    }
    else {
      setDefaultValuesForCoverages(coverageData, coverageKey, body.insuredObject);
    }
  });

  // refresh coverage data in Client view model
  initClientViewModelMotorCoverages(input.context.ClientViewModel, body.insuredObject?.vehicle, startDate, ambientProperties);
}

function setIcon(input) {

  if (input && input.data) {
    if (input.data[input.dataProperty] === true) {
      return {
        'name': 'Check',
        'size': 'Large',
        'color': 'Success',
        'description': 'Included'
      };
    } else if (input.data[input.dataProperty] === false) {
      return {
        'name': 'Times',
        'size': 'Large',
        'color': 'Danger',
        'description': 'Not included'
      };
    }
  }
  return {
    'name': 'Times',
    'size': 'Large',
    'color': 'BackgroundColor',
    'description': 'Not included'
  };
}

/**
 * Remove riders (extensions) and additionalEquipmentCoverages only if they have manual validity
 * There is no manual validity on main coverages
 */
function removeManualValidity(insuredObject) {
  CoveragesForSelectedSubtypeAndType({ ...insuredObject, isMainCoverage: false }).forEach(o => {
    // Riders
    if (insuredObject[insuredObject.objectType][o]?.manualValidity?.manualValidity) {
      insuredObject[insuredObject.objectType][o] = {};
    }

    // Additional coverage - additionalEquipmentCoverages
    if (insuredObject[insuredObject.objectType][o]?.length) {
      insuredObject[insuredObject.objectType][o] = insuredObject[insuredObject.objectType][o].filter(i => !i.manualValidity?.manualValidity);
    }
  });
}

module.exports = {
  setCoverages,
  setIcon,
  removeManualValidity
};
