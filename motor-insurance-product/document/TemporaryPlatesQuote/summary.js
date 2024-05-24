'use strict';
const { componentMappings } = require('@adinsure/runtime');
const {
  getFullPaymentPlanSummary,
} = require('@config-standard/general-contract/component/PaymentPlanSummary/lib/getPaymentPlanFromEvaluation');
const {
  getConditionsFromCommonContract,
} = require('@config-standard/general-contract/component/ConditionsSummary/lib/getConditionsFromCommonContract');
const {
  getClausesFromCommonContract,
} = require('@config-standard/general-contract/component/ClausesSummary/lib/getClausesFromCommonContract');
const {
  getLimits,
} = require('@config-system/contract/component/LimitsSummary/lib/LimitsSummaryMapping');
const {
  getDeductibles,
} = require('@config-system/contract/component/DeductiblesSummary/lib/DeductiblesSummaryMapping');
const {
  getNrOfUnconfirmedConstraints,
} = require('@config-standard/general-contract/component/UnconfirmedConstraintsSummary/lib/getNrOfUnconfirmedConstraints');
const { getMainItem } = require('@adinsure/contracts-runtime/renewal-evaluation');
const { mapToPremiumBreakdown } = require('@config-triglav-si/contract/lib/PremiumBreakdownSummaryMapping');

module.exports = function summary(commonBody, body, previousCommonBody) {
  const mainItem = getMainItem(commonBody);
  const payer = body?.paymentTerms?.payer;
  const currency = mainItem?.coverage?.currency || body?.paymentTerms?.paymentCurrency;
  const commonBodyPaymentPlan = commonBody?.paymentPlan;
  const evaluatedPaymentPlan = commonBody?.evaluation?.paymentPlan;
  const paymentPlanSummary = getFullPaymentPlanSummary({
    evaluatedPaymentPlan,
    paymentPlan: commonBodyPaymentPlan,
    payer,
    currency,
  });
  const coverageCombinationsRestrictions = (commonBody?.evaluation?.objectsEvaluation || [])
    .map((object) => ({
      objectRef: object.objectRef,
      coverageCombinations: object.coverageCombinations,
    }))
    .filter((obj) => obj.coverageCombinations);

  const summaryData = {
    paymentPlanSummary,

    conditions: getConditionsFromCommonContract(commonBody.validations),
    clauses: getClausesFromCommonContract(commonBody.validations),

    limits: getLimits(commonBody),
    deductibles: getDeductibles(commonBody),

    unconfirmedConstraintsSummary: {
      numberOfUnconfirmedConstraints: getNrOfUnconfirmedConstraints(commonBody),
    },
    coverageCombinationsRestrictions,
  };

  if (commonBody?.evaluation?.itemEvaluation) {
    const getTotalsAndInstallmentFromPaymentPlan = componentMappings.getComponentMappingForSummary('InstallmentAmountAndTotalPremiumSummary');
    const getPremiumByCoverageSummary = componentMappings.getComponentMappingForSummary('PremiumByCoverageSummary');

    summaryData.installmentAmountAndTotalPremiumSummary = getTotalsAndInstallmentFromPaymentPlan({ commonBodyEvaluation: commonBody.evaluation });
    summaryData.premiumByCoverageSummary = getPremiumByCoverageSummary(commonBody.evaluation);
    summaryData.premiumByCoverageSummary = summaryData.premiumByCoverageSummary.map((cItem) => {
      cItem.currencyCode = currency;
      return cItem;
    });
  }

  summaryData.premiumBreakdown = mapToPremiumBreakdown(commonBody);

  return summaryData;
};
