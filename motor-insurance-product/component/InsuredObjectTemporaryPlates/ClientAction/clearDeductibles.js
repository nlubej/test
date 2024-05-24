module.exports = function clearDeductibles(input) {
  const insuredObject = input.componentContext;
  const objectType = insuredObject.objectType;

  if (insuredObject?.[objectType]?.casco?.cascoCoverage?.deductible) {
    delete insuredObject[objectType].casco.cascoCoverage.deductible;
  }
  // Must rebind, because we have a rule attached on vehicleBrand that depend on this value
  this.view.rebind('/Body/*');
};
