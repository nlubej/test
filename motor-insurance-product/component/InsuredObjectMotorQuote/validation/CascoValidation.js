/**
 * @errorCode {errorCode} RequiredDeductible
 */
module.exports = function CascoValidation(input) {
  if (input.isSelected && !input.cascoCoverage?.deductible) {
    return {
      severity: 'Error',
      errorCode: 'RequiredDeductible',
      errorDataPath: `${this.businessContext.dataPath}/cascoCoverage/deductible`
    };
  }
};
