module.exports = function showProductSelection(input) {
  return !!input.context?.Body?.insuredObject?.vehicle?.catalogueNumber;
};
