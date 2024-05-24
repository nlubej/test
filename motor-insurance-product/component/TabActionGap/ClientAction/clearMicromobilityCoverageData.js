const { clearCoverageData } = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectMotorQuote/lib/InsuredObjectCoverageHelpers');

module.exports = function clearMicromobilityCoverageData(input) {
  const insuredObject = input.context.Body.insuredObject;
  const objectType = insuredObject.objectType;

  clearCoverageData(insuredObject[objectType]?.micromobilityInsurance);
};
