'use strict';

const { underwritingActors } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');
const { initInvoiceNumber } = require('@config-triglav-si/motor-insurance-product/lib/ClientViewModelMappingHelper');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {
  await initClientViewModel.call(this, input, ambientProperties);

  if (isForReadOnly(input.context?.WorkUnitActor?.CurrentActor, input.context?.State?.Code)) {
    this.disableAllElements();

    setTimeout(() => this.view.getControlByElementId('ai-button-createInvoice').enableElement());
  }

  this.view.rebind('/ClientViewModel*');
};

async function initClientViewModel(input, ambientProperties) {
  const clientViewModel = input.context.ClientViewModel;

  clientViewModel.currency = 'EUR';
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
