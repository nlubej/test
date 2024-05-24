function sumEquipmentValue(optionalEquipment) {
  if (!optionalEquipment) {
    return;
  }

  return optionalEquipment.reduce((acc, curr) => acc + curr.price, 0);
}

module.exports = {
  sumEquipmentValue
};
