module.exports = function mapping({ errorInput, sinkExchange, additionalDataSources }) {
  return {
    responseCode: 422,
    response: {
      message: errorInput.message
    }
  };
};
