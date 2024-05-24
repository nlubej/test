
module.exports = function disableAutomobileAndLegalProtection(input) {

  const assistanceSelected = input?.context?.Body?.insuredObject?.vehicle?.assistance?.isSelected;

  if (assistanceSelected !== true) {
    return true;
  }
};
