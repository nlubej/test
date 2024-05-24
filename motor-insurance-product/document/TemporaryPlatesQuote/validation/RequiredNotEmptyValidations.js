/**
 * @errorCode {errorCode} PolicyholderNotDefined, InsuredPersonNotDefined, OrganisationDataNotDefined, InsuredObjectNotDefined TaxNumberValidation
 */
const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function RequiredNotEmptyValidations(quoteBody) {
  const validationErrors = [];
  const documentState = this.businessContext.documentState;

  if (documentState && documentState !== 'InformativeCalculation') {
    if (isEmptyObject(quoteBody.persons?.policyholder)) {
      validationErrors.push({
        errorCode: 'PolicyholderNotDefined',
        errorDataPath: '/Body/persons/policyholder',
      });
    }
    if (!quoteBody.persons?.policyHolderIsInsuredPerson && isEmptyObject(quoteBody.persons?.insuredPerson)) {
      validationErrors.push({
        errorCode: 'InsuredPersonNotDefined',
        errorDataPath: '/Body/persons/insuredPerson',
      });
    }
    if (isEmptyObject(quoteBody.organisation)) {
      validationErrors.push({
        errorCode: 'OrganisationDataNotDefined',
        errorDataPath: '/Body/organisation',
      });
    }
    if (quoteBody?.persons?.policyholder?.partyType === 'LegalEntity' && quoteBody.persons?.policyholder?.legalEntity?.taxNumber === undefined) {
      validationErrors.push({
        errorCode: 'TaxNumberValidation',
        errorDataPath: '/Body/persons/policyholder/legalEntity/taxNumber'
      });
    }
    if (quoteBody?.persons?.policyholder?.partyType === 'NaturalPerson' && quoteBody.persons?.policyholder?.naturalPerson?.taxNumber === undefined) {
      validationErrors.push({
        errorCode: 'TaxNumberValidation',
        errorDataPath: '/Body/persons/policyholder/naturalPerson/taxNumber'
      });
    }
  }

  if (isEmptyObject(quoteBody.insuredObject)) {
    validationErrors.push({
      errorCode: 'InsuredObjectNotDefined',
      errorDataPath: '/Body/insuredObject',
    });
  }

  return validationErrors;
};
