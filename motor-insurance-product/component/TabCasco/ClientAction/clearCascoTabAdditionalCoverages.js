const { deepReset } = require('@config-triglav-si/infrastructure/lib/ObjectHelperMotor');
const RidersForCoverage = require('@config-triglav-si/motor-insurance-product/component/InsuredObjectMotorQuote/lib/RidersForCoverage');

module.exports = function clearCascoTabAdditionalCoverages(input) {
  const cascoRiders = RidersForCoverage({ coverageKey: 'casco' });
  cascoRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationBRiders = RidersForCoverage({ coverageKey: 'combinationB' });
  combinationBRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationDRiders = RidersForCoverage({ coverageKey: 'combinationD' });
  combinationDRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationERiders = RidersForCoverage({ coverageKey: 'combinationE' });
  combinationERiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationHRiders = RidersForCoverage({ coverageKey: 'combinationH' });
  combinationHRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationJRiders = RidersForCoverage({ coverageKey: 'combinationJ' });
  combinationJRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const combinationKRiders = RidersForCoverage({ coverageKey: 'combinationK' });
  combinationKRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });

  const cascoCollisionRiders = RidersForCoverage({ coverageKey: 'cascoCollision' });
  cascoCollisionRiders.forEach(rider=> {
    deepReset(input.context.Body.insuredObject.vehicle[rider.riderKey]);
  });
};
