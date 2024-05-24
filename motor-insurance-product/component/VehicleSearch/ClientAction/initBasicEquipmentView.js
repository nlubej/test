module.exports = function initBasicEquipmentView(input) {

  const vehicle = input.rootContext.Body?.insuredObject?.vehicle;
  const vehicleType = vehicle?.vehicleGroup;
  const catalogueNumber = vehicle?.catalogueNumber;

  const view = this.getCurrentView();

  if (!vehicleType || !catalogueNumber) {
    view.clearResults();
    view.clearDataGridResults();

    return;
  }

  view.setSearchRequest({
    data: {
      typeOfVehicle: vehicleType,
      idType: catalogueNumber
    }
  });

  view.search();
};
