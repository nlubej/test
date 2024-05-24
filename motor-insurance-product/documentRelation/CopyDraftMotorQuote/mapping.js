const { getAgentUserInformationFromContext } = require('@config-standard/pm-common/component/ContractOrganisationData/lib/AgentUserInformation');
const { deepCopy } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function mapping(quoteBody) {
  const quoteClone = deepCopy(quoteBody);

  delete quoteClone.externalData;

  quoteClone.organisation = getAgentUserInformationFromContext(undefined, this.applicationContext);

  return {
    body: quoteClone
  };
};
