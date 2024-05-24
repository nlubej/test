module.exports = (input) => {
  const {
    taxNumber
  } = input.data;

  return {
    queryStrings: {
      taxNumber
    }
  };
};
