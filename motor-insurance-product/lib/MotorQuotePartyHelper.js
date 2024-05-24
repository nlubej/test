'use strict';

const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

function getPossibleParties(persons) {
  if (!persons) {
    return;
  }
  const possibleParties = [];

  const policyholder = persons.policyholder;
  const insuredPerson = persons.insuredPerson;

  if (!isEmptyObject(policyholder)) {
    // temp solution: add displayFullName on root for dropdown display
    possibleParties.push({ ...policyholder, displayFullName: policyholder?.naturalPerson?.fullName || policyholder?.legalEntity?.fullName });
  }

  const policyholderId = policyholder?.naturalPerson?.externalId || policyholder?.legalEntity?.externalId;
  const insuredPersonId = insuredPerson?.naturalPerson?.externalId || insuredPerson?.legalEntity?.externalId;

  if (!isEmptyObject(insuredPerson) && policyholderId && insuredPersonId && policyholderId !== insuredPersonId) {
    // temp solution: add displayFullName on root for dropdown display
    possibleParties.push({ ...insuredPerson, displayFullName: insuredPerson?.naturalPerson?.fullName || insuredPerson?.legalEntity?.fullName });
  }

  if(persons?.otherParticipants && persons.otherParticipants.length > 0) {
    for(const participant of persons.otherParticipants) {
      const ids = possibleParties.map(x => x?.naturalPerson?.externalId || x?.legalEntity?.externalId).filter(x => x);
      const participantId = participant.party?.naturalPerson?.externalId || participant?.party?.legalEntity?.externalId;
      if(participantId && !ids.includes(participantId)) {
        possibleParties.push({ ...participant.party, displayFullName: participant.party?.naturalPerson?.fullName || participant?.party?.legalEntity?.fullName });
      }
    }
  }

  return possibleParties;
}

module.exports = {
  getPossibleParties
};
