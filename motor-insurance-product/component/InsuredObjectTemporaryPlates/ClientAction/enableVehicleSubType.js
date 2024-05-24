module.exports = function enableVehicleSubType(input) {

  if (!['Draft'].includes(input.context.State.Code)) {
    return false;
  }

  return true;
};
