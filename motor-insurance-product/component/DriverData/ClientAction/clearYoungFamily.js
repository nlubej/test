module.exports = function clearYoungFamily(input) {

  const isSelected = input.componentContext?.youngFamily?.isSelected;

  if (isSelected === false || isSelected === undefined) {
    delete input.componentContext?.youngFamily?.child;
  }
};
