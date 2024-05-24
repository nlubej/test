const { vehicleTypes } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');

module.exports = function setTypeOfVehicle(input) {

  this.getLookup().setSearchRequest({
    data: {
      typeOfVehicle: vehicleTypes['upgrades']
    }
  });
  this.getLookup().setProtectedFields(['typeOfVehicle']);
};
