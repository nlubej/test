// require area

// mapping area
module.exports = function autoselectCombinationB(input, ambientProperties) {
  const { context } = input;
  const casco = context.Body?.insuredObject?.vehicle?.casco;
  const combinationB = context.Body?.insuredObject?.vehicle?.combinationB;

  if (casco?.isSelected && combinationB) {
    combinationB.isSelected = true;
  }
};
