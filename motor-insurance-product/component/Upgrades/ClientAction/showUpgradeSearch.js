const { recalculateVehicleTotalValue } = require('@config-triglav-si/motor-insurance-product/lib/ClientViewModelMappingHelper');

/**
 * @translationKey {translationKey} VehicleUpgradeSelection
 */
module.exports = async function showUpgradeSearch(input, ambientProperties) {
  const viewDialogService = ambientProperties.services.viewDialog;

  const titleTranslated = ambientProperties.services.translate.getSync(input.rootContext.ConfigurationCodeName, 'VehicleUpgradeSelection');

  const dialogViewReference = {
    configurationCodeName: 'VehicleUpgradeSelectionView',
    configurationConceptType: 'SearchView',
    configurationVersion: '1'
  };

  const dialogButtonOptions = {
    beforeConfirmationAction: 'canSelect'
  };

  const dialogParams = {
    dialogViewReference,
    title: titleTranslated,
    dialogSize: 'Large',
    onLoad: 'setTypeOfVehicle',
    dialogButtonOptions
  };

  const selectedUpgrade = await viewDialogService.show(dialogParams).then(result => {
    if (!result?.data?.selection || result.data.selection.length !== 1)
    { return; }
    return result.data.selection[0];
  });

  if (!selectedUpgrade)
  { return; }

  const baseData = input.rootContext.Body?.insuredObject?.vehicle?.baseData;

  if (!baseData) {
    return;
  }

  baseData.upgrades = baseData.upgrades || [];
  baseData.upgrades.push({
    code: selectedUpgrade.typnatcode,
    name: selectedUpgrade.typname,
    price: selectedUpgrade.price,
  });

  const vehicle = input.context.Body.insuredObject?.vehicle;
  recalculateVehicleTotalValue(vehicle?.baseData, input.rootContext.ClientViewModel);

  this.view.setDirty();
  this.view.rebind('/ClientViewModel*');
};
