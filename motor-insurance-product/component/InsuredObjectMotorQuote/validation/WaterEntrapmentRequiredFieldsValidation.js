/**
 * @errorCode {errorCode} RiskCodeRequired
 */
module.exports = function WaterEntrapmentRequiredFieldsValidation(extension) {
  const errors = [];
  const dataPath = this.businessContext.dataPath;

  if(extension.isSelected) {
    if(!extension.riskCode) {
      errors.push({
        errorCode: 'RiskCodeRequired',
        errorDataPath: `${dataPath}/riskCode`
      });
    }
  }

  return errors;
};
