'use strict';

const { validateCoverage } = require('@config-standard/pm-common/lib/CoverageResultValidations');

module.exports = function rule(input) {
  return validateCoverage.call(this, input);
};
