module.exports = function isPremiumGroupTruck(input, ambientProperties) {

  const selectedSubtype = input.context.Body.insuredObject?.vehicle?.subtype?.selectedSubtype;

  if ((selectedSubtype === 'vehicleTruck')) {
    return true;
  }
};
