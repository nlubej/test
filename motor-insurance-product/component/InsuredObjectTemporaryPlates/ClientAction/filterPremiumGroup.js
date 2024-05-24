module.exports = function filterPremiumGroup(input) {
  const { items } = input;

  return items.filter(item => item !== 'workshop');
};
