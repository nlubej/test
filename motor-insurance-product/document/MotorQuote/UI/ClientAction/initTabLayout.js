'use strict';

const { underwritingActors } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');

module.exports = function initTabLayout(input, ambientProperties) {
  const underwritingStates = ['InUnderwritingL1', 'InUnderwritingL2', 'InReinsuranceUnderwriting'];

  const state = input.context.State.Code;
  const actor = input.context.WorkUnitActor.CurrentActor;

  // tab questionnaire is disabled on Quote
  this.disableTab('Tab-IddQuestionnaire');

  // In case of informative calculation, only Insured object, Terms and Payment terms tabs are visible
  if (state === 'Discarded') {
    this.hideTab('Tab-Participants');
    this.hideTab('Tab-IddQuestionnaire');
    this.hideTab('Tab-Conditions');
    this.hideTab('Tab-Ownership');
  }
  // In case we have agent and organisation unit information Ownership tab is not visible
  if (input.context?.Body?.organisation?.agent?.code && input.context?.Body?.organisation?.organisationalUnit?.code) {
    this.hideTab('Tab-Ownership');
  }

  if (underwritingActors.includes(actor)) {
    this.showTab('Tab-UW');

    if (underwritingStates.includes(state)) {
      this.enableTab('Tab-UW');
    }
  } else {
    this.hideTab('Tab-UW');
  }

  if ((state === 'Discarded' ||
    state === 'Rejected' ||
    state === 'Issued' ||
    state === 'Signed' ||
    state === 'PolicyWritten' ||
    state === 'InReinsuranceUnderwriting'
  ) && actor === 'ReinsuranceUnderwriter') {
    this.enableTab('Tab-Reinsurance');
    this.showTab('Tab-Reinsurance');
  } else {
    this.hideTab('Tab-Reinsurance');
  }
};
