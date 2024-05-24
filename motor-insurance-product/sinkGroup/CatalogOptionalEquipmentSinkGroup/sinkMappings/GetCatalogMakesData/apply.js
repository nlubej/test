module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

  const makeName = sinkExchange.sinkInput.make;

  const result = sinkResult.data.find(({ makname }) => makname === makeName);

  sinkExchange.makeId = result?.maknatcode;
};
