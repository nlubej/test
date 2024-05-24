module.exports = function mapping(externalData) {
  if (!externalData?.sourceContractNumber) {
    return;
  }

  return {
    data: {
      criteria: {
        contractNumber: externalData.sourceContractNumber
      }
    }
  };
};
