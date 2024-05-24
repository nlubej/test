module.exports = function mapping(input, sinkExchange) {

  const code = sinkExchange.vehicleTypeId;
  const typeId = sinkExchange.vehicleGroupId;
  const make = sinkExchange.vehicleMakeName;
  const model = sinkExchange.vehicleModelName;

  if (code && typeId && make && model) {
    return {
      code: code,
      typeId: typeId,
      make: make,
      model: model
    };
  }
};
