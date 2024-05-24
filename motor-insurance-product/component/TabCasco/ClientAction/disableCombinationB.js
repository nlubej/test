module.exports = function disableCombinationB(input) {
  if(this.view.areAllElementsDisabled()) {
    return true;
  }

  return !!input.componentContext?.Body?.insuredObject?.vehicle?.cascoCollision?.cascoCollisionCoverage?.package === 'CascoCollisionPlus';
};
