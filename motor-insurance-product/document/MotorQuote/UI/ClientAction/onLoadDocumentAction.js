'use strict';

const { underwritingActors } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');
const { initClientViewModelMotorCoverages } = require('@config-triglav-si/motor-insurance-product/component/MotorCoveragesClientSchema/lib/MotorCoveragesClientHelper');
const { initInvoiceNumber, recalculateVehicleTotalValue } = require('@config-triglav-si/motor-insurance-product/lib/ClientViewModelMappingHelper');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {
  await initClientViewModel.call(this, input, ambientProperties);
  recalculateVehicleTotalValue(input.context.Body.insuredObject?.vehicle?.baseData, input.rootContext.ClientViewModel);

  if (isForReadOnly(input.context?.WorkUnitActor?.CurrentActor, input.context?.State?.Code)) {
    this.disableAllElements();
    setTimeout(() => this.view.getControlByElementId('ai-button-createInvoice').enableElement());
  }

  this.view.rebind('/ClientViewModel*');
};

async function initClientViewModel(input, ambientProperties) {
  const vehicle = input.context.Body.insuredObject?.vehicle;
  const clientViewModel = input.context.ClientViewModel;
  const startDate = input.context.Body?.contractDuration?.startDate;

  clientViewModel.currency = 'EUR';

  await initClientViewModelMotorCoverages(clientViewModel, vehicle, startDate, ambientProperties);

  await initInvoiceNumber.call(this, input, ambientProperties);
}

function isForReadOnly(currentActor, currentState) {
  switch (currentState) {
    case 'Draft':
      if (underwritingActors.includes(currentActor)) {
        return true;
      }
      return false;
  }
  return true;
}
