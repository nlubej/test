const { setDefaultValuesForCoverages } = require('@config-triglav-si/motor-insurance-product/lib/SetDefaultValuesForCoverages');
const { initClientViewModelMotorCoverages } = require('@config-triglav-si/motor-insurance-product/component/MotorCoveragesClientSchema/lib/MotorCoveragesClientHelper');

module.exports = function mtplSelectionChanged(input, ambientProperties) {

  if(!input.data?.isSelected) {
    return;
  }

  const insuredObject = input.context.Body.insuredObject;
  const startDate = input.context.Body.contractDuration?.startDate;

  setDefaultValuesForCoverages(input.data, 'mtpl');

  // refresh coverage data in Client view model
  initClientViewModelMotorCoverages(input.context.ClientViewModel, insuredObject?.vehicle, startDate, ambientProperties);
};
