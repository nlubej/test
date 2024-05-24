module.exports = function updateSelectedParties(input) {
  const body = input.context.Body;
  if (input?.actionData?.updatedPropertyKey === 'policyholder' && body.persons?.policyholderIsInsuredPerson) {
    body.persons.insuredPerson = body.persons.policyholder;
    this.view.rebind();
  }
};
