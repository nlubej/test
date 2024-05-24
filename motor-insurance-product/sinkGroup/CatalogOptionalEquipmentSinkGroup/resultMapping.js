const { LocalDate, DateTimeFormatter } = require('@js-joda/core');

module.exports = function mapping(input, sinkExchange) {
  const catalogOptionalEquipmentData = sinkExchange.catalogOptionalEquipmentData;
  if (!catalogOptionalEquipmentData) {
    return [];
  }

  return catalogOptionalEquipmentData.map(e => {
    return {
      code: e.code.toString(),
      description: e.text,
      price: e.price,
      validFrom: e.validFrom ? LocalDate.parse(e.validFrom, DateTimeFormatter.BASIC_ISO_DATE).toString() : undefined,
      validTo: e.validUntil ? LocalDate.parse(e.validUntil, DateTimeFormatter.BASIC_ISO_DATE).toString() : undefined
    };
  });
};
