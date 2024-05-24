module.exports = function getResponseMapping(input) {
  return input.response.data.map(x => x.resultData);
};
