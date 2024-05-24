module.exports = function mapping(input, sinkExchange) {

  if (input.typeId && sinkExchange.makeId && sinkExchange.modelId && input.code) {
    return {
      input: {
        data: {
          typeOfVehicle: input.typeId,
          idMake: sinkExchange.makeId,
          idModel: sinkExchange.modelId,
          idType: input.code
        }
      }
    };
  }
};
