const motorObjectValidations = require('@config-triglav-si/motor-insurance-product/lib/MotorObjectValidations');
const CoveragesForSelectedSubtypeAndType = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectTemporaryPlates/lib/CoveragesForSelectedSubtypeAndType');

module.exports = function objectValidation(insuredObject, additionalContext) {
  const errors = motorObjectValidations.call(this, insuredObject, additionalContext, CoveragesForSelectedSubtypeAndType);

  return errors;
};
