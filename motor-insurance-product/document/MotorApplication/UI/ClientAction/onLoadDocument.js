'use strict';

const { executeDataSourceWithErrorDialog } = require('@config-triglav/infrastructure/lib/ClientDataSourceHelpers');

module.exports = async function onLoadDocument(input, ambientProperties) {
  if (input.context?.State?.Code === 'QuoteCreated') {
    this.disableAllElements();

    const request = {
      data: {
        criteria: {
          sourceContractNumber: input.context.Number
        }
      }
    };

    const result = await executeDataSourceWithErrorDialog(request, ambientProperties, 'GetContractsCreatedFromContractDataSource');

    if (result && result[0]?.resultData?.contractNumber) {
      input.context.ClientViewModel.quoteRelation.relatedNumber = result[0].resultData.contractNumber;
    }
  }

  this.view.rebind('/ClientViewModel*');
};
