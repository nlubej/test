const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function initPossiblePartiesAndSetDefaultDriver(input) {
  const persons = input.context.Body.persons;
  const party = persons.policyholderIsInsuredPerson ? persons.policyholder?.naturalPerson : persons.insuredPerson?.naturalPerson;
  const driverData = input.context.Body.insuredObject.driverData;

  if (!driverData || isEmptyObject(party)) {
    return;
  }

  // set driver if driver is not defined or is different than insured person
  if (!driverData?.driver?.externalId || (party.externalId !== driverData?.driver.externalId)) {
    Object.assign(driverData.driver, party);
  }
};
