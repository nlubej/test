module.exports = function mapping(externalData, response) {
  if (!response) {
    return;
  }

  externalData.clientScore = response;
};
