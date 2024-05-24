module.exports = function setPartyFromLookupOrDropdown(input, ambientProperties) {

  const { data, dataProperty } = input;
  const party = data[dataProperty];
  const lookupSelection = input.getLookupSelection();

  if (lookupSelection.length === 0) {
    return;
  }
  const resultData = lookupSelection[0].arrayResultData || lookupSelection[0].resultData;
  const metadata = lookupSelection[0].metadata;
  const selectedParty = {
    code: resultData.code || metadata.code,
    fullName: resultData.fullName || resultData.fullname,
    address: resultData.address,
    nationalIdentifier: resultData.nationalIdentifier || resultData.taxnumber,
    dateOfBirth: resultData.dateOfBirth
  };

  Object.assign(party, selectedParty);
};
