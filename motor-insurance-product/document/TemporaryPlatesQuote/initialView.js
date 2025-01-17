'use strict';
const { initQuoteToPolicyLink } = require('@config-standard/sp-common/component/QuoteToPolicyLink/lib/initQuoteToPolicyLink');
const { dateTimeToDateString, addDays } = require('@config-system/infrastructure/lib/DateUtilsCore');
const { getAgentUserInformationFromContext } = require('@config-standard/pm-common/component/ContractOrganisationData/lib/AgentUserInformation');

module.exports = function mapDetailsGetInitViewModel(quote) {
  if (quote.State.Code === 'PolicyWritten') {
    quote = initQuoteToPolicyLink(quote);
  }

  if (!quote.IsSaved && ['Draft'].includes(quote.State.Code)) {
    populateContractDuration.call(this, quote.Body);
    quote.Body.organisation = getAgentUserInformationFromContext(undefined, this.applicationContext);

    // init empty object. It is not generated by itself because of aiAdditionalContext -> LJADIRDSUP-7895
    if (!quote.Body.insuredObject) {
      quote.Body.insuredObject = {
        vehicle: {
          baseData: {},
          subtype: {}
        },
        driverData: {
          driver: {}
        }
      };
    }

    quote.Body.insuredObject.objectType = 'vehicle';

    if (quote.Body.insuredObject?.vehicle?.subtype) {
      quote.Body.insuredObject.vehicle.subtype.selectedSubtype = 'vehicleCar';
    }
  }

  return quote;
};

function populateContractDuration(body) {
  const issueDate = dateTimeToDateString(this.applicationContext.time);
  const startDate = addDays(issueDate, 1);
  const startTime = '00:00';
  const insuranceDuration = 3;
  body.contractDuration = {
    issueDate,
    startDate,
    startTime,
    insuranceDuration,
    endDate: addDays(startDate, insuranceDuration)
  };
}
