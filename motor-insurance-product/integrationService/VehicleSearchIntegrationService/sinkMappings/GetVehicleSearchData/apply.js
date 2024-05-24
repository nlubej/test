
module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
  const vehicleSearchData = sinkResult.data;

  sinkExchange.vehicleSearchData = vehicleSearchData;

  const eurotaxMatches = vehicleSearchData?.etaxMatches;
  if (eurotaxMatches?.length > 0) {
    if (eurotaxMatches.length === 1) {
      sinkExchange.vehicleTypeId = parseInt(eurotaxMatches[0].eurotaxCode);
      sinkExchange.vehicleGroupId = parseInt(eurotaxMatches[0].vehicleGroup);
      sinkExchange.vehicleMakeName = eurotaxMatches[0].vehicleManufacturer;
      sinkExchange.vehicleModelName = eurotaxMatches[0].vehicleModel;
    }
  }
};
