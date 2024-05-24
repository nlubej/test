'use strict';
const { deepReset } = require('@config-triglav-si/infrastructure/lib/ObjectHelperMotor');

function clearCoverageData(coverageObj) {
  /**
        * Remove only properties and leave objects as it is
        * Otherwise rebind fails, if ui element has preSelectFirstItem: true, but the object is undefined.
        * opened LJADIRDSUP-6110
    */
  deepReset(coverageObj);
  coverageObj.isSelected = false;
}

module.exports = {
  clearCoverageData
};
