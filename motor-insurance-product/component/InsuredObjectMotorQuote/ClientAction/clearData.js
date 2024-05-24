const CoveragesForSelectedSubtypeAndType = require('../lib/CoveragesForSelectedSubtypeAndType');
const {
  insuredObjectClearData,
} = require('@config-standard/sp-common/lib/InsuredObjectComponentClientActions');

module.exports = function clearData(input) {
  const insuredObject = input.componentContext || {};
  insuredObjectClearData(insuredObject, CoveragesForSelectedSubtypeAndType);

  this.view.rebind('/Body/*');
};
