function showAdditionalEquipmentSection(input) {
  const vehicle = input.context.Body.insuredObject?.vehicle;

  if (vehicle?.subtype === 'workshop') {
    return false;
  }

  const coveragesWithAdditionalCoverages = ['casco', 'combinationB', 'combinationD', 'combinationE', 'combinationH', 'combinationJ', 'combinationK', 'cascoCollision'];

  if (coveragesWithAdditionalCoverages.some(key => vehicle[key]?.isSelected)) {
    return true;
  }

  return false;
}

module.exports = {
  showAdditionalEquipmentSection
};
