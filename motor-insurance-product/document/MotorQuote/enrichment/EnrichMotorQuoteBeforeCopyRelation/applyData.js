const {
  getAgentUserInformationFromContext,
} = require('@config-standard/pm-common/component/ContractOrganisationData/lib/AgentUserInformation');

module.exports = function mapping(quote) {
  quote.organisation = getAgentUserInformationFromContext(
    quote.organisation,
    this.applicationContext
  );
};
