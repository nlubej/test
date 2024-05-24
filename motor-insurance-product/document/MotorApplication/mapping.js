module.exports = function mapping(body) {
  const salesProductCode = this.businessContext?.configurationDimensions?.productCode;
  const { startDate, endDate, issueDate, startTime, endTime } = body.contractDuration;

  return {
    productCode: salesProductCode,
    startDate,
    endDate,
    issueDate,
    startTime,
    endTime
  };
};
