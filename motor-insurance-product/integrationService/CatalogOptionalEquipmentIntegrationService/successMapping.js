const { LocalDate, DateTimeFormatter } = require('@js-joda/core');

module.exports = function mapping(input) {

  const result = input.sinkExchange?.catalogOptionalEquipmentData;

  return result;
};
