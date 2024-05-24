const isNaturalPerson = require('@config-standard/general-contract/lib/isNaturalPerson');
const { getFirstDayOfNextMonth } = require('@config-system/infrastructure/lib/DateUtilsCore');

function mapPartyBasicData(party) {
  if (!party) {
    return;
  }

  const personData = isNaturalPerson(party) ? party.naturalPerson : party.legalEntity;
  if (!personData) {
    return undefined;
  }

  const person = {
    personCode: personData.externalId.toString(),
    attributes: {
      fullName: personData.fullName,
      address: personData.address,
      taxNumber: personData.taxNumber,
      personalId: personData.personalId
    }
  };

  if (isNaturalPerson(party)) {
    person.attributes.dateOfBirth = personData.dateOfBirth;
  }

  return person;
}

function mapToPolicyholder(party) {

  const policyholder = mapPartyBasicData(party);

  return {
    holder: policyholder
  };
}

function mapToInsuredPersons(party) {
  return {
    insuredPersons: party ? [mapPartyBasicData(party)] : []
  };
}

function mapDefaultPaymentPlan() {
  return {
    automatic: {
      frequency: 'Single',
      paymentType: 'PaymentOrder',
      firstInstallmentDueDate: getFirstDayOfNextMonth()
    },
    paymentCurrency: 'EUR'
  };
}

module.exports = {
  mapToInsuredPersons,
  mapToPolicyholder,
  mapDefaultPaymentPlan
};
