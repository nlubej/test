module.exports = function disableGeneralCasco(input) {
  if(this.view.areAllElementsDisabled()) {
    return true;
  }

  return !!input.componentContext?.Body?.insuredObject?.vehicle?.cascoCollision;
};
