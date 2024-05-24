module.exports = (input) => {
  const { vinNumber, regNumber } = input.data;

  return {
    queryStrings: {
      vinNumber,
      regNumber
    }
  };
};
