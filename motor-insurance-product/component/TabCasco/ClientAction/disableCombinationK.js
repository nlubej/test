module.exports = function disableCombinationK(input) {
  if (this.view.areAllElementsDisabled()) {
    return true;
  }

  const subtype = input?.context?.Body?.insuredObject?.vehicle?.subtype;
  const cascoCollision = input?.context?.Body?.insuredObject?.vehicle?.cascoCollision;

  if (subtype) {
    if (subtype.selectedSubtype === 'workshop') {
      return true;
    }
  }
  if (cascoCollision) {
    if (cascoCollision.isSelected === true) {
      return true;
    }
  }
};
