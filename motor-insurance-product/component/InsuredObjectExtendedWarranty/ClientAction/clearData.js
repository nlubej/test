const {
  insuredObjectClearData,
} = require('@config-standard/sp-common/lib/InsuredObjectComponentClientActions');

module.exports = function clearData(input) {
  const insuredObject = input.componentContext || {};
  insuredObjectClearData(insuredObject, undefined);

  this.view.rebind('/Body/*');
};
