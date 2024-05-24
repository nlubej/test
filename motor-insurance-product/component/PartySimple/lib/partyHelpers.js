function mapPartyLookupToPartySimple(lookupSelection) {
  const party = {};

  if (lookupSelection && lookupSelection.length > 0) {
    const selected = lookupSelection[0];

    if (selected?.resultData?.fullname) {
      party.fullName = selected.resultData.fullname;
    }

    if (selected?.metadata?.businessId) {
      party.code = selected.metadata.businessId;
    }
  }
  return party;
}

module.exports = {
  mapPartyLookupToPartySimple
};
