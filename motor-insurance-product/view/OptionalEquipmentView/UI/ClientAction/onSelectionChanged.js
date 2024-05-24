const { recalculateVehicleTotalValue } = require('@config-triglav-si/motor-insurance-product/lib/ClientViewModelMappingHelper');

module.exports = function onSelectionChanged(input) {

  const baseData = input.rootContext.Body?.insuredObject?.vehicle;
  const selection = input.actionData.selection;

  if (!selection?.added?.length && !selection?.removed?.length)
  { return; }

  // remove duplicates if exist
  const selectedEquipment = selection.source._selection.filter((equip, index, self) =>
    index === self.findIndex((t) => (
      t.code === equip.code
    ))
  );

  sortSelectedOnes(input?.data, selectedEquipment);

  // if not marked as pre-selection means that the agent made the change
  if (!input.rootContext?.ClientViewModel?.preselectingOptionalEquipment) {
    baseData.optionalEquipment = [...selectedEquipment];

    recalculateVehicleTotalValue(baseData, input.rootContext.ClientViewModel);

    this.view.getParentView().setDirty();
    this.view.getParentView().rebind('/ClientViewModel*');
  }
  // pre-selection is finished if we are past teh deselecting phase
  else if (input.rootContext?.ClientViewModel?.preselectingOptionalEquipment && (selection.removed?.length || 0) === 0) {
    this.view.getParentView().setClean();
    delete input.rootContext.ClientViewModel.preselectingOptionalEquipment;
  }
};

function sortSelectedOnes(data, selection) {
  const selected = [];
  const notSelected = [];
  data?.optionalEquipment.forEach(i => {
    if (selection.find(f => f.code === i.code)) {
      selected.push(i);
    }
    else {
      notSelected.push(i);
    }

  });
  // Put selected ones first
  data.optionalEquipment = [...selected, ...notSelected];
}
