module.exports = function clearResults(input, ambientProperties) {
  delete input.context.Body.insuredObject.vehicle;

  this.view.rebind('/Body/*');
};
