const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
/**
 * @errorCode {errorCode} PartyNotDefined, RoleNotDefined
 */
module.exports = function ParticipantRowValidation(input) {
  const validations = [];

  const { party, role } = input;

  if(!party || !party.partyType || isEmptyObject(party)) {
    validations.push({
      errorCode: 'PartyNotDefined',
      errorDataPath: '/party/naturalPerson/fullName',
    });
  }

  if(!role) {
    validations.push({
      errorCode: 'RoleNotDefined',
      errorDataPath: '/role',
    });
  }

  return validations;
};

