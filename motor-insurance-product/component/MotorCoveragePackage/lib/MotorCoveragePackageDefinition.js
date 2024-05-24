const { currentYear, getYear } = require('@config-system/infrastructure/lib/DateUtilsCore');

module.exports = function getPackageDefinition(vehicle) {
  if (!vehicle || !vehicle?.firstRegistrationDate) {
    return [];
  }

  const registrationDate = getYear(vehicle?.firstRegistrationDate);
  const vehicleAge = currentYear() - registrationDate;

  const randomNumber = Math.floor(Math.random() * 500);

  if (vehicleAge >= 7) {
    return [
      { name: 'P1', AO: true, AOplus: true, premium: (1.25 * randomNumber) },
      { name: 'P2', AO: true, AOplus: true, AASplus: true, premium: (1.47 * randomNumber) },
      { name: 'P3', AO: true, AOplus: true, D: true, E: true, J: true, premium: (2.59 * randomNumber) }
    ];
  }

  return [
    { name: 'P1', AO: true, AOplus: true, AASplus: true, SAK: true, B: true, K: true, premium: (2.13 * randomNumber) },
    { name: 'P2', AO: true, AOplus: true, AASplus: true, B: true, D: true, E: true, H: true, J: true, premium: (3.26 * randomNumber) },
    { name: 'P3', AO: true, AOplus: true, AASplus: true, SAK: true, B: true, K: true, D: true, E: true, H: true, J: true, APZ: true, NMV: true, premium: (5.48 * randomNumber) }
  ];
};
