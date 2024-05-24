const { deepReset } = require('@config-triglav-si/infrastructure/lib/ObjectHelperMotor');

module.exports = function clearVehicleData(input) {

  const existingValue = input.data[input.dataProperty];

  if (existingValue) {
    const insuredObject = input.componentContext;
    const objectType = insuredObject.objectType;

    const baseData = insuredObject?.[objectType]?.baseData;
    const subtype = insuredObject?.[objectType]?.subtype;

    deepReset(baseData);
    deepReset(subtype, ['selectedSubtype']);
  }

  return true;
};
