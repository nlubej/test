const { getPossibleParties } = require('@config-triglav-si/motor-insurance-product/lib/MotorQuotePartyHelper.js');

module.exports = function onPrepareRow(input) {
  input.context.ClientViewModel.possibleParties = getPossibleParties(input.data);
  this.view.rebind('/ClientViewModel/possibleParties/*');
  return true;
};
