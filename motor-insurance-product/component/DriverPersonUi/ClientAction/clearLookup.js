module.exports = function clearLookup(input, ambientProperties) {
  const { dataProperty } = input;
  let data = input.data;

  if (dataProperty) {
    data[dataProperty] = {};
  } else {
    data = undefined;
  }
};
