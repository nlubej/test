module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
  const catalogOptionalEquipmentData = sinkResult.data;

  sinkExchange.catalogOptionalEquipmentData = catalogOptionalEquipmentData;
};
