module.exports = function preselectEquipments(input) {

  const toSelect = input?.actionData?.toSelect;
  if (!toSelect?.length)
  { return; }

  setTimeout(() => {
    const grid = this.view.getControlByElementId('optional-equipment-data-grid');

    // flag that this is a preselection
    input.rootContext.ClientViewModel = input.rootContext.ClientViewModel || {};
    input.rootContext.ClientViewModel.preselectingOptionalEquipment = true;

    grid.dataSource.selectionModel.selected().forEach(e => grid.dataSource.selectionModel.deselect(e));
    grid.dataSource.selectionModel.select(toSelect);
  });
};
