'use strict';

/**
 * @errorCode {errorCode} MinimalPremiumIs5EUR
 */
module.exports = function minimalPremiumValidation(input) {
  const errors = [];
  const totalPremium = input.commonBody?.evaluation?.itemEvaluation?.reduce((sum, itemEval) => sum + (itemEval.premium), 0);

  if (totalPremium < 5) {
    errors.push({
      validationType: 'SchemaValidation',
      code: 'MinimalPremiumIs5EUR',
    });
  }

  return errors;
};
