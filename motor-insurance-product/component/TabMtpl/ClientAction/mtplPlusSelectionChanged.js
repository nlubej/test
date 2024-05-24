const { setDefaultValuesForCoverages } = require('@config-triglav-si/motor-insurance-product/lib/SetDefaultValuesForCoverages');
const { initClientViewModelMotorCoverages } = require('@config-triglav-si/motor-insurance-product/component/MotorCoveragesClientSchema/lib/MotorCoveragesClientHelper');

module.exports = function mtplPlusSelectionChanged(input, ambientProperties) {

  if(!input.data?.isSelected) {
    return;
  }

  const insuredObject = input.context.Body.insuredObject;
  const startDate = input.context.Body.contractDuration?.startDate;

  setDefaultValuesForCoverages(input.data, 'mtplPlus');

  // refresh coverage data in Client view model
  initClientViewModelMotorCoverages(input.context.ClientViewModel, insuredObject?.vehicle, startDate, ambientProperties);

  const cascoCollision = input?.context?.Body?.insuredObject?.vehicle?.cascoCollision;

  // Clear Plus package is mtpl plus is selected
  if (cascoCollision?.isSelected && cascoCollision?.cascoCollisionCoverage?.package === 'Plus') {
    cascoCollision.cascoCollisionCoverage.package = 'Basic';
  }
};
