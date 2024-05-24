/**
 * @errorCode {errorCode} partyNotSelected
 */
module.exports = function MotorApplicationValidations(input) {
  const validations = [];

  if(!input?.client?.partyType) {
    validations.push({
      errorCode: 'partyNotSelected',
      errorDataPath: '/Body/client/naturalPerson/fullName'
    });
  }

  return validations;
};
