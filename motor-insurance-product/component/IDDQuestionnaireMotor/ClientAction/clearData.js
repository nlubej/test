module.exports = function clearData(input) {
  const { dataProperty, data } = input;

  if(dataProperty === 'Q10') {
    data['Q11'] = {};
    data['Q12'] = {};
  }

  if(dataProperty === 'Q11') {
    data['Q12'] = {};
  }

  if(dataProperty === 'Q14') {
    data['Q15'] = {};
  }
};
