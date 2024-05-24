module.exports = function isInsuredPersonLegalEntity(input) {
  return input.rootContext.Body?.persons?.insuredPerson?.partyType === 'LegalEntity';
};
