/**
 * @errorCode {errorCode} PayerNotDefined, VehicleUserNotDefined, LessorNotDefined, LesseeNotDefined, BatteryOwnerNotDefined
 * @errorCode {errorCode} ChildNotDefined, LenderNotDefined, BorrowerNotDefined, ODICNotDefined, FICNotDefined
 **/
module.exports = {
  validateRequiredParticipants
};

function validateRequiredParticipants(otherParticipants, participantRoles) {
  const validations = [];

  for(const role of participantRoles) {
    if (!otherParticipants?.find(x => x.role === role)) {
      validations.push({
        errorCode: `${role}NotDefined`,
        errorDataPath: '/Body/persons/otherParticipants',
      });
    }
  }

  return validations;
}
