const { executeDataSource } = require('@config-triglav/infrastructure/lib/ClientDataSourceHelpers');

module.exports = async function initOptEquipmentView(input, ambientProperties) {

  const vehicle = input.rootContext.Body?.insuredObject?.vehicle;
  const vehicleType = vehicle?.vehicleGroup;
  const catalogueNumber = vehicle?.catalogueNumber;

  const view = this.getCurrentView();
  const body = view.getContext().Body;

  if (!vehicleType || !catalogueNumber) {
    body.optionalEquipment = [];
    return;
  }

  const data = {
    data: {
      typeOfVehicle: vehicleType,
      idType: catalogueNumber
    }
  };

  body.optionalEquipment = [];

  const equipments = await executeDataSource(data, ambientProperties, 'FindVehicleOptEquipmentByCatalogueNumberDataSource');
  if (!equipments?.length) {
    return;
  }

  body.optionalEquipment = equipments.map(i => i.resultData);

  const eqCodesOnDocument = vehicle?.optionalEquipment?.map(i => i.code) || [];
  const toSelect = body.optionalEquipment.filter(i => eqCodesOnDocument.includes(i.code));

  if (toSelect?.length) {
    ambientProperties.services.util.raiseEvent('OPTIONAL_EQUIPMENT_SEARCH_FINISHED', { toSelect });
  }
};
