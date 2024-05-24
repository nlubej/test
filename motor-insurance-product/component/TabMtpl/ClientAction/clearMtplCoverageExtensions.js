const { deepReset } = require('@config-triglav-si/infrastructure/lib/ObjectHelperMotor');
const RidersForCoverage = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectMotorQuote/lib/RidersForCoverage');

module.exports = function clearMtplCoverageExtensions(input) {
  const riders = RidersForCoverage({ coverageKey: 'mtpl' }).filter(f => f.group === 'CoverageExtension');
  riders.forEach(rider => {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });
};
