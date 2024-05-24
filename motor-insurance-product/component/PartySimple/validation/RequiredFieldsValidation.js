const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

/**
 * @errorCode {errorCode} PayerFullNameMissing
 */
module.exports = function RequiredFieldsValidation(payer) {
  const errors = [];
  const dataPath = this.businessContext.dataPath;
  const documentState = this.businessContext.documentState;

  if (documentState !== 'InformativeCalculation' && !isEmptyObject(payer) && !payer.fullName) {
    errors.push({
      errorCode: 'PayerFullNameMissing',
      errorDataPath: `${dataPath}`
    });
  }

  return errors;
};
