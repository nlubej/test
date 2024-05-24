module.exports = function mapping(externalData, dataSourceResponse) {
  const renewedContract = dataSourceResponse.data.find(r => r.resultData.status === 'ManualRenewal' || r.resultData.status === 'Renewed');

  externalData.renewedContractNumber = renewedContract?.resultData?.renewedContractNumber;
  externalData.renewalStatus = renewedContract?.resultData?.status;
};
