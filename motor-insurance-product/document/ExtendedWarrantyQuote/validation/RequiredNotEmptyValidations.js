/**
 * @errorCode {errorCode} InsuredObjectNotDefined
 */
const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function RequiredNotEmptyValidations(quoteBody) {
  const validationErrors = [];

  if (isEmptyObject(quoteBody.insuredObject)) {
    validationErrors.push({
      errorCode: 'InsuredObjectNotDefined',
      errorDataPath: '/Body/insuredObject',
    });
  }

  return validationErrors;
};
