const { mapNaturalPersonOrLegalEntityToDocumentBody } = require('@config-triglav-si/pm-common/component/CommonPartyNaturalPersonOrLegalEntity/lib/CommonPartyMappingHelper');

module.exports = function setParticipantFromLookupOrSelection(input) {
  const { data, dataProperty } = input;
  const lookupSelection = input.getLookupSelection();

  if (lookupSelection.length === 0) {
    return;
  }
  const party = data[dataProperty];

  if (lookupSelection.length === 0) {
    return;
  }

  if(lookupSelection[0].arrayResultData) {
    const { displayFullName, ...resultData } = lookupSelection[0].arrayResultData;
    Object.assign(party, resultData);
  } else {
    const resultData = {
      partyType: lookupSelection[0].partyType,
      legalEntity: lookupSelection[0].partyType === 'LegalEntity' ? mapNaturalPersonOrLegalEntityToDocumentBody(lookupSelection[0]) : undefined,
      naturalPerson: lookupSelection[0].partyType === 'NaturalPerson' ? mapNaturalPersonOrLegalEntityToDocumentBody(lookupSelection[0]) : undefined,
    };
    Object.assign(party, resultData);
  }
};
