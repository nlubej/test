module.exports = function showPremiumGroupEmpty(input) {
  return !input.rootContext.Body.insuredObject?.vehicle?.subtype?.selectedSubtype;
};
