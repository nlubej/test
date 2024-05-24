module.exports = function mapping(input, sinkExchange) {

  if (input.typeId && sinkExchange.makeId) {
    return {
      input: {
        data: {
          typeOfVehicle: input.typeId,
          idMake: sinkExchange.makeId
        }
      }
    };
  }
};
