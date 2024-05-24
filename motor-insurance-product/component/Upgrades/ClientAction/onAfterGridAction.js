const { recalculateVehicleTotalValue } = require('@config-triglav-si/motor-insurance-product/lib/ClientViewModelMappingHelper');

module.exports = function onAfterGridAction(input) {
  const vehicle = input.context.Body.insuredObject?.vehicle;
  recalculateVehicleTotalValue(vehicle?.baseData, input.rootContext.ClientViewModel);

  this.view.setDirty();
  this.view.rebind('/ClientViewModel*');
};
