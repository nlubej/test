const { ageInYears } = require('@config-triglav/infrastructure/lib/DateUtilsTriglav');

module.exports = function showCascoCollision(input) {

  const subtype = input?.context?.Body?.insuredObject?.vehicle?.subtype;
  const yearOfManufacture = input?.context?.Body?.insuredObject?.vehicle?.baseData?.yearOfManufacture;
  const firstRegistrationDate = input?.context?.Body?.insuredObject?.vehicle?.baseData?.firstRegistrationDate;
  const startDate = input?.context?.Body?.contractDuration?.startDate;

  if (subtype) {
    if (subtype.selectedSubtype !== 'vehicleCar' || (yearOfManufacture && ageInYears(yearOfManufacture, startDate) <= 7) || (!yearOfManufacture && ageInYears(firstRegistrationDate, startDate) <= 7)) {
      return false;
    }
  }

  return true;
};
