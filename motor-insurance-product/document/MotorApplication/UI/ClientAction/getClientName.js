module.exports = function getClientName(input) {
  return input?.data?.client?.naturalPerson?.fullName || input?.data?.client?.legalEntity?.fullName;
};
