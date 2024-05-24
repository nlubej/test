module.exports = function mapping(input, sinkExchange) {

  if (!input.typeId) {
    return;
  }

  sinkExchange.sinkInput = input;

  return {
    input: {
      data: {
        typeOfVehicle: input.typeId
      }
    }
  };
};
