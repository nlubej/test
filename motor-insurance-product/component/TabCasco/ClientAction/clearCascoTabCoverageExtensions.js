const { deepReset } = require('@config-triglav-si/infrastructure/lib/ObjectHelperMotor');
const RidersForCoverage = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectMotorQuote/lib/RidersForCoverage');

module.exports = function clearCascoTabCoverageExtensions(input) {
  const cascoRiders = RidersForCoverage({ coverageKey: 'casco' }).filter(f => f.group === 'CoverageExtension');
  cascoRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationBRiders = RidersForCoverage({ coverageKey: 'combinationB' }).filter(f => f.group === 'CoverageExtension');
  combinationBRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationDRiders = RidersForCoverage({ coverageKey: 'combinationD' }).filter(f => f.group === 'CoverageExtension');
  combinationDRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationERiders = RidersForCoverage({ coverageKey: 'combinationE' }).filter(f => f.group === 'CoverageExtension');
  combinationERiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationHRiders = RidersForCoverage({ coverageKey: 'combinationH' }).filter(f => f.group === 'CoverageExtension');
  combinationHRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationJRiders = RidersForCoverage({ coverageKey: 'combinationJ' }).filter(f => f.group === 'CoverageExtension');
  combinationJRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationKRiders = RidersForCoverage({ coverageKey: 'combinationK' }).filter(f => f.group === 'CoverageExtension');
  combinationKRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const cascoCollisionRiders = RidersForCoverage({ coverageKey: 'cascoCollision' }).filter(f => f.group === 'CoverageExtension');
  cascoCollisionRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });
};
