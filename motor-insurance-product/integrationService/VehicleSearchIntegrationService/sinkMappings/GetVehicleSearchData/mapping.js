module.exports = function mapping(input, sinkExchange) {
  const { vinNumber, regNumber } = input;

  return {
    input: {
      data: {
        vinNumber: vinNumber,
        regNumber: regNumber
      }
    }
  };
};
