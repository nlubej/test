module.exports = function getFullAddress(input) {
  return input?.data?.client?.naturalPerson?.address || input?.data?.client?.legalEntity?.address;
};
