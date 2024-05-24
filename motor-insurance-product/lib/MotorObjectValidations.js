const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
const { getYear, getDiffYears, parseDate } = require('@config-system/infrastructure/lib/DateUtilsCore');

/**
 * @errorCode {errorCode} NoMainCoverageSelected, UnsupportedCoverageForSelectedObjectTypeAndSubtype InsuredObjectTypeRequired
 * @errorCode {errorCode} YearOfManufactureInitialAndFinalProductionYearValidation YearOfManufactureValidation FirstRegistrationDateValidation LoadCapacityRequired
 * @errorCode {errorCode} MileageRequired
 * @errorCode {errorCode} VehicleAgeMustBeMoreThan30ForOldTimer VehicleAgeMustBeLessThan30AndMoreThan20ForYoungtimer
 * @errorCode {errorCode} licensePlateValidation InsertYearOfManufacture
 * @errorCode {errorCode} ChildNotDefined, ChildTooOld ChildBirthDateValidation,
 */
module.exports = function objectValidation(insuredObject, additionalContext, CoveragesForSelectedSubtypeAndType) {
  const errors = [];

  if (!isEmptyObject(insuredObject?.[insuredObject?.objectType])) {
    const objectType = insuredObject && insuredObject.objectType;
    if (objectType) {
      const typeData = insuredObject[objectType];
      const objectSubtype = typeData && typeData.subtype && typeData.subtype.selectedSubtype;
      const selectedCoverageKeys = Object.keys(typeData).filter(k => typeData[k].isSelected);

      if (CoveragesForSelectedSubtypeAndType) {
        const allowedCoveragesAndRiders = CoveragesForSelectedSubtypeAndType({
          objectSubtype,
          objectType,
        });

        errors.push(...getErrorsForCoverages(selectedCoverageKeys, allowedCoveragesAndRiders));

        const mainCoverages = CoveragesForSelectedSubtypeAndType({
          isMainCoverage: true,
          objectSubtype,
          objectType,
        });

        const isMainCoverageSelected = selectedCoverageKeys.some(coverageKey => mainCoverages.includes(coverageKey));

        if (!isMainCoverageSelected) {
          errors.push({
            errorCode: 'NoMainCoverageSelected'
          });
        }
      }

      if (objectType === 'vehicle') {
        errors.push(...vehicleObjectValidation.call(this, insuredObject, additionalContext));
      }
    }
    else {
      errors.push({
        errorCode: 'InsuredObjectTypeRequired'
      });
    }
  }

  return errors;
};

function getErrorsForCoverages(coverageKeys, allowedCoveragesAndRiders) {
  const errors = [];
  if (coverageKeys) {
    coverageKeys.forEach((coverage) => {
      if (!allowedCoveragesAndRiders.includes(coverage)) {
        errors.push({
          errorCode: 'UnsupportedCoverageForSelectedObjectTypeAndSubtype'
        });
      }
    });
  }
  return errors;
}

function vehicleObjectValidation(insuredObject, additionalContext) {
  const errors = [];

  const dataPath = `${this.businessContext.dataPath}/vehicle`;
  const baseData = insuredObject?.vehicle?.baseData;
  const firstRegistrationDateYear = parseDate(baseData?.firstRegistrationDate);

  if (baseData) {
    if (baseData.yearOfManufacture) {
      if (baseData.yearOfManufacture < baseData.initialProductionYear || baseData.yearOfManufacture > baseData.finalProductionYear) {
        errors.push({
          errorCode: 'YearOfManufactureInitialAndFinalProductionYearValidation',
          errorDataPath: `${dataPath}/baseData/yearOfManufacture`
        });
      }
      if (baseData.yearOfManufacture > firstRegistrationDateYear?.year) {
        errors.push({
          errorCode: 'YearOfManufactureValidation',
          errorDataPath: `${dataPath}/baseData/yearOfManufacture`
        });
        errors.push({
          errorCode: 'FirstRegistrationDateValidation',
          errorDataPath: `${dataPath}/baseData/firstRegistrationDate`
        });
      }
    }
    if (!baseData.yearOfManufacture && !baseData.firstRegistrationDate) {
      errors.push({
        errorCode: 'InsertYearOfManufacture',
        errorDataPath: `${dataPath}/baseData/yearOfManufacture`
      });
    }

    if (baseData?.licensePlate && baseData?.licensePlate?.length < 5) {
      errors.push({
        errorCode: 'licensePlateValidation',
        errorDataPath: `${dataPath}/baseData/licensePlate`
      });
    }
  }

  errors.push(...truckValidation.call(this, insuredObject, additionalContext));
  errors.push(...personalCarValidation.call(this, insuredObject, additionalContext));

  return errors;
}

function truckValidation(insuredObject, additionalContext) {
  const errors = [];
  const dataPath = `${this.businessContext.dataPath}/vehicle/subtype/vehicleTruck`;
  const baseData = insuredObject?.vehicle?.baseData;
  const firstRegistrationYear = getYear(baseData?.firstRegistrationDate);

  if (insuredObject?.vehicle?.subtype?.selectedSubtype !== 'vehicleTruck' || !insuredObject?.vehicle?.subtype?.vehicleTruck) {
    return errors;
  }

  const vehicleTruck = insuredObject.vehicle.subtype.vehicleTruck;
  const startDate = additionalContext?.contractDuration?.startDate;

  if (!vehicleTruck?.loadCapacity) {
    errors.push({
      errorCode: 'LoadCapacityRequired',
      errorDataPath: `${dataPath}/loadCapacity`
    });
  }

  if (startDate) {
    const yearOfManufacture = baseData.yearOfManufacture;
    const currentYear = getYear(startDate);
    const vehicleAge = currentYear - (yearOfManufacture || firstRegistrationYear);

    if (vehicleTruck.oldtimer && vehicleAge < 30) {
      errors.push({
        errorCode: 'VehicleAgeMustBeMoreThan30ForOldTimer',
        errorDataPath: `${dataPath}/oldtimer`
      });
    }
  }

  return errors;
}

function personalCarValidation(insuredObject, additionalContext) {
  const errors = [];
  const dataPath = `${this.businessContext.dataPath}/vehicle/subtype/vehicleCar`;
  const baseData = insuredObject?.vehicle?.baseData;
  const firstRegistrationYear = getYear(baseData?.firstRegistrationDate);

  if (insuredObject?.vehicle?.subtype?.selectedSubtype !== 'vehicleCar' || !insuredObject?.vehicle?.subtype?.vehicleCar) {
    return errors;
  }

  const vehicleCar = insuredObject.vehicle.subtype.vehicleCar;
  const startDate = additionalContext?.contractDuration?.startDate;

  if (startDate) {
    const yearOfManufacture = insuredObject.vehicle?.baseData?.yearOfManufacture;
    const currentYear = getYear(startDate);
    const vehicleAge = currentYear - (yearOfManufacture || firstRegistrationYear);

    if (vehicleCar.specialStatus === 'Oldtimer' && vehicleAge < 30) {
      errors.push({
        errorCode: 'VehicleAgeMustBeMoreThan30ForOldTimer',
        errorDataPath: `${dataPath}/specialStatus`
      });
    }

    if (vehicleCar.specialStatus === 'Youngtimer' && (vehicleAge >= 30 || vehicleAge <= 20)) {
      errors.push({
        errorCode: 'VehicleAgeMustBeLessThan30AndMoreThan20ForYoungtimer',
        errorDataPath: `${dataPath}/specialStatus`
      });
    }
  }

  if (vehicleCar.mileage === undefined) {
    errors.push({
      errorCode: 'MileageRequired',
      errorDataPath: `${dataPath}/mileage`
    });
  }

  const youngFamily = insuredObject.driverData?.youngFamily;
  if (youngFamily?.isSelected) {
    if (isEmptyObject(youngFamily?.child)) {
      errors.push({
        errorCode: 'ChildNotDefined',
        errorDataPath: '/Body/insuredObject/driverData/youngFamily/child/fullName',
      });
    } else if (!youngFamily.child.dateOfBirth) {
      errors.push({
        errorCode: 'ChildBirthDateValidation',
        errorDataPath: '/Body/insuredObject/driverData/youngFamily/child/dateOfBirth'
      });
    }
    else if (startDate && getDiffYears(youngFamily?.child?.dateOfBirth, startDate) > 7) {
      errors.push({
        errorCode: 'ChildTooOld',
        errorDataPath: '/Body/insuredObject/driverData/youngFamily/child/fullName'
      });
    }
  }

  return errors;
}
