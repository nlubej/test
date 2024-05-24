module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
  const catalogOptionalEquipmentData = sinkResult;

  sinkExchange.catalogOptionalEquipmentData = catalogOptionalEquipmentData;
};
