
module.exports = function preselectSumInsured(input) {

  if (input?.data?.isSelected) {
    input.data.accidentCoverage = input.data.accidentCoverage || {};

    input.data.accidentCoverage.accidentalDeath = 15000;
    input.data.accidentCoverage.severeInjuries = 25000;
    input.data.accidentCoverage.fracturesDislocationsBurnsAndSoftTissueInjuries = 2000;
  }
};
