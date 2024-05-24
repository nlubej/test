module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

  const modelName = sinkExchange.sinkInput.model;

  const datePattern = /\d{2}\.\d{4}-(?:\d{2}\.\d{4})?/;
  const dates = modelName.match(datePattern)?.[0].split('-') || [];
  const [startYear, endYear] = dates.map(dateString => dateString?.split('.').at(-1));

  const filteredResults = sinkResult.data.filter((element) => element.modname === modelName.split(' (')[0] && element.modbegin === startYear && element.modend === endYear);

  if (filteredResults && filteredResults.length > 0) {
    sinkExchange.modelId = filteredResults[0].modnatcode;
  }
};
