module.exports = function mapping(input, sinkExchange) {

  if (input.code && input.typeId && input.make && input.model) {
    return {
      code: input.code,
      typeId: input.typeId,
      make: input.make,
      model: input.model
    };
  }
};
