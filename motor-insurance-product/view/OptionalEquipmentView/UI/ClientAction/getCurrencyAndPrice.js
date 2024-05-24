module.exports = function getCurrencyAndPrice(input) {
  const basicEquipment = input.data;

  if (basicEquipment) {
    return {
      paymentCurrency: 'EUR',
      price: basicEquipment.price || 0
    };
  }
};
