
const { mapPartyLookupToPartySimple } = require('@config-standard/general-contract/component/PartySimple/lib/partyHelpers');

module.exports = function setPayerFromPartyLookup(input) {
  const lookupSelection = input.getLookupSelection();
  const party = mapPartyLookupToPartySimple(lookupSelection);
  // The data is in dataGrid and no componentContext is provided
  input.data[input.dataProperty] = party;

  this.view.rebind();
};
