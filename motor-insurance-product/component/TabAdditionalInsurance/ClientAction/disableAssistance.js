
module.exports = function disableAssistance(input) {
  if (this.view.areAllElementsDisabled()) {
    return true;
  }

  const mtplSelected = input?.context?.Body?.insuredObject?.vehicle?.mtpl?.isSelected;

  if (mtplSelected !== true) {
    return true;
  }
};
