const { vehicleTypes } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');
module.exports = function initBasicEquipmentView(input) {

  const vehicle = input.rootContext.Body?.insuredObject?.vehicle;
  const selectedSubtype = vehicle?.subtype?.selectedSubtype;
  const catalogueNumber = vehicle?.baseData?.catalogueNumber;

  const view = this.getCurrentView();

  if (!selectedSubtype || !catalogueNumber) {
    view.clearResults();
    view.clearDataGridResults();
    return;
  }

  view.setSearchRequest({
    data: {
      typeOfVehicle: vehicleTypes[selectedSubtype],
      idType: catalogueNumber
    }
  });
  view.search();
};
