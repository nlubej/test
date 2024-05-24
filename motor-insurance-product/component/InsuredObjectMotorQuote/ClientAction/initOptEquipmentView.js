const { vehicleTypes } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');
const { executeDataSource } = require('@config-triglav/infrastructure/lib/ClientDataSourceHelpers');

module.exports = async function initOptEquipmentView(input, ambientProperties) {

  const vehicle = input.rootContext.Body?.insuredObject?.vehicle;
  const selectedSubtype = vehicle?.subtype?.selectedSubtype;
  const catalogueNumber = vehicle?.baseData?.catalogueNumber;

  const view = this.getCurrentView();
  const body = view.getContext().Body;

  if (!selectedSubtype || !catalogueNumber) {
    body.optionalEquipment = [];
    return;
  }

  const data = {
    data: {
      typeOfVehicle: vehicleTypes[selectedSubtype],
      idType: catalogueNumber
    }
  };

  body.optionalEquipment = [];
  const equipments = await executeDataSource(data, ambientProperties, 'FindVehicleOptEquipmentByCatalogueNumberDataSource');
  if (!equipments?.length) { return; }
  body.optionalEquipment = equipments.map(i => i.resultData);

  const eqCodesOnDocument = vehicle?.baseData?.optionalEquipment?.map(i => i.code) || [];
  const toSelect = body.optionalEquipment.filter(i => eqCodesOnDocument.includes(i.code));

  if (toSelect?.length) { ambientProperties.services.util.raiseEvent('OPTIONAL_EQUIPMENT_SEARCH_FINISHED', { toSelect }); }
};
