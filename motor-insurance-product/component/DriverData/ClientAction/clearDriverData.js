module.exports = function clearDriverData(input) {
  if(input.context.Body.insuredObject?.vehicle?.subtype?.selectedSubtype === 'vehicleTruck') {
    delete input.context.Body.insuredObject?.driverData?.youngFamily.child;
    delete input.context.Body.insuredObject?.driverData?.drajvCode;
    delete input.context.Body.insuredObject?.driverData?.drajvCodeValidity;
  }
};
