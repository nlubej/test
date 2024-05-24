const { mapNaturalPersonOrLegalEntityToDocumentBody } = require('@config-triglav-si/pm-common/component/CommonPartyNaturalPersonOrLegalEntity/lib/CommonPartyMappingHelper');

module.exports = function setPartyFromLookupOrDropdown(input, ambientProperties) {

  const { data, dataProperty } = input;
  const party = data[dataProperty];
  const lookupSelection = input.getLookupSelection();

  if (lookupSelection.length === 0) {
    return;
  }

  const resultData = lookupSelection[0].arrayResultData ||
    mapNaturalPersonOrLegalEntityToDocumentBody(lookupSelection[0]);

  Object.assign(party, resultData);
};
