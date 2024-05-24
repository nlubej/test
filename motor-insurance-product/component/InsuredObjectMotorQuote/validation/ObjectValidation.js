const CoveragesForSelectedSubtypeAndType = require('../lib/CoveragesForSelectedSubtypeAndType');
const motorObjectValidations = require('@config-triglav-si/motor-insurance-product/lib/MotorObjectValidations');

/**
 * @errorCode {errorCode} MtplPlusWithMtpl CombinationBWithMtplOrCasco
 */
module.exports = function objectValidation(insuredObject, additionalContext) {
  const dataPath = this.businessContext.dataPath;

  const errors = motorObjectValidations.call(this, insuredObject, additionalContext, CoveragesForSelectedSubtypeAndType);

  const typeData = insuredObject.vehicle;
  const coverageKeys = Object.keys(typeData).filter(k => typeData[k].isSelected);
  if (coverageKeys.includes('mtplPlus') && !coverageKeys.includes('mtpl')) {
    errors.push({
      errorCode: 'MtplPlusWithMtpl',
      errorDataPath: `${dataPath}/vehicle/mtplPlus/isSelected`
    });
  }

  if (coverageKeys.includes('combinationB') && !(coverageKeys.includes('mtpl') || coverageKeys.includes('casco'))) {
    errors.push({
      errorCode: 'CombinationBWithMtplOrCasco',
      errorDataPath: `${dataPath}/vehicle/combinationB/isSelected`
    });
  }

  return errors;
};
