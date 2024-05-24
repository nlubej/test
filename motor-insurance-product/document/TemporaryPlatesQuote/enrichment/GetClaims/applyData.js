const tariffs = require('@adinsure/runtime').tariffs;

module.exports = function mapping(body, dataSourceResponse) {

  // Update bonus/malus - via tariff rule
  if (body.insuredObject?.vehicle.casco?.isSelected && body.insuredObject?.vehicle.casco.cascoCoverage?.bonusMalus?.bonusMalusCoefficient) {
    const motorTariff = tariffs.getTariff('Casco', body.contractDuration.startDate);

    // Get new bonus/malus class
    if (motorTariff.rules.bonusMalus) {
      const bonusMalusClass = motorTariff.rules.bonusMalus({
        bonusMalusClass: body.insuredObject.vehicle.casco.cascoCoverage.bonusMalus.bonusMalusCoefficient,
        claims: dataSourceResponse?.data?.map(c => c.resultData).filter(c => c.coverageCode === 'MotorCasco')
      });

      if (bonusMalusClass?.newBonusMalusClass) {
        body.insuredObject.vehicle.casco.cascoCoverage.bonusMalus.bonusMalusCoefficient = bonusMalusClass.newBonusMalusClass;
      }
    }
  }

  if (body.insuredObject?.vehicle.mtpl?.isSelected && body.insuredObject?.vehicle.mtpl.mtplAttributes?.bonusMalus?.bonusMalusCoefficient) {
    const motorTariff = tariffs.getTariff('MtplTariff', body.contractDuration.startDate);

    // Get new bonus/malus class
    if (motorTariff.rules.bonusMalus) {
      const bonusMalusClass = motorTariff.rules.bonusMalus({
        bonusMalusClass: body.insuredObject.vehicle.mtpl.mtplAttributes?.bonusMalus?.bonusMalusCoefficient,
        claims: dataSourceResponse?.data?.map(c => c.resultData).filter(c => c.coverageCode === 'Mtpl')
      });

      if (bonusMalusClass?.newBonusMalusClass) {
        body.insuredObject.vehicle.mtpl.mtplAttributes.bonusMalus.bonusMalusCoefficient = bonusMalusClass.newBonusMalusClass;
      }
    }
  }
};
