const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
const { executeBusinessRule } = require('@config-triglav/infrastructure/lib/clientBusinessRulesHelpers');
const { todayAsString } = require('@config-system/infrastructure/lib/DateUtilsCore');

async function initClientViewModelMotorCoverages(clientViewModel, vehicle, ruleDate, ambientProperties) {
  const ruleInput = {
    startDate: ruleDate || todayAsString(),
    coverages: {
      mtpl: {
        isSelected: vehicle?.mtpl?.isSelected,
        mtplAttributes: vehicle?.mtpl?.mtplAttributes
      },
      mtplPlus: {
        isSelected: vehicle?.mtplPlus?.isSelected,
        coverageAttributes: vehicle?.mtplPlus?.coverageAttributes
      },
      activityDamageExtension: {
        isSelected: vehicle?.activityDamageExtension?.isSelected
      }
    }
  };

  const result = await executeBusinessRule(ruleInput, ambientProperties, 'MotorQuoteInitialMapping', 1);
  if (!isEmptyObject(result?.coverages?.mtpl)) {
    clientViewModel.coverages.mtpl.materialDamageSumInsured = result.coverages.mtpl.materialDamageSumInsured;
    clientViewModel.coverages.mtpl.nonMaterialDamageSumInsured = result.coverages.mtpl.nonMaterialDamageSumInsured;
  }

  if (!isEmptyObject(result?.coverages?.mtplPlus)) {
    clientViewModel.coverages.mtplPlus.sumInsured = result.coverages.mtplPlus.sumInsured;
  }

  if (!isEmptyObject(result?.coverages?.activityDamageExtension)) {
    clientViewModel.coverages.activityDamageExtension.sumInsured = result.coverages.activityDamageExtension.sumInsured;
    clientViewModel.coverages.activityDamageExtension.deductible = result.coverages.activityDamageExtension.deductible;
  }
}

module.exports = {
  initClientViewModelMotorCoverages
};
