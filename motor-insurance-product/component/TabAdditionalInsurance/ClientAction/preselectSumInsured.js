
module.exports = function preselectSumInsured(input) {

  if (input?.data?.isSelected === true) {
    if (!input.data.accidentInsuranceDriverPassengerCoverage) {
      input.data.accidentInsuranceDriverPassengerCoverage = {};
    }
    input.data.accidentInsuranceDriverPassengerCoverage.accidentalDeath = 15000;
    input.data.accidentInsuranceDriverPassengerCoverage.severeInjuries = 25000;
    input.data.accidentInsuranceDriverPassengerCoverage.fracturesDislocationsBurnsAndSoftTissueInjuries = 2000;
  }
};
