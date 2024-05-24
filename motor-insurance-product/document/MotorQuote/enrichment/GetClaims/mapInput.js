module.exports = function mapping(body) {
  if (!body.previousPolicyRelation.relatedNumber) {
    return;
  }

  const coverageCodes = [];
  if (body.insuredObject?.vehicle.casco?.isSelected) {
    coverageCodes.push('MotorCasco');
  }
  if (body.insuredObject?.vehicle.mtpl?.isSelected) {
    coverageCodes.push('Mtpl');
  }

  return {
    data: {
      criteria: {
        policyNumber: body.previousPolicyRelation.relatedNumber,
        coverageCodes: coverageCodes
      }
    }
  };
};
