module.exports = function hideChild(input) {

  const isSelected = input.componentContext?.youngFamily?.isSelected;

  if (isSelected === false || isSelected === undefined) {
    return true;
  }
};
