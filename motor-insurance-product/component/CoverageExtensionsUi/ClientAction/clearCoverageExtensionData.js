module.exports = function clearCoverageExtensionData(input) {
  Object.keys(input.data).forEach(key => {
    if (key === 'isSelected') {
      return;
    }

    delete input.data[key];
  });
};
