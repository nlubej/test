const motorObjectValidations = require('@config-triglav-si/motor-insurance-product/lib/MotorObjectValidations');

module.exports = function objectValidation(insuredObject, additionalContext) {
  const errors = motorObjectValidations.call(this, insuredObject, additionalContext, undefined);

  return errors;
};
