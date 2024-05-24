module.exports = async function preVehicleSelect(input, ambientProperties) {

  const requestData = {
    data: {}
  };

  // default: personal vehicle
  requestData.data.typeOfVehicle = 10;

  this.getLookup().setSearchRequest(requestData);
  this.getLookup().setProtectedFields(['typeOfVehicle']);

  return;
};
