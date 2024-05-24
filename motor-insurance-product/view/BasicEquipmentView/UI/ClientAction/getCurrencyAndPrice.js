module.exports = function getCurrencyAndPrice(input) {

  const basicEquipment = input.data?.resultData;

  if (basicEquipment) {
    return {
      paymentCurrency: 'EUR',
      price: basicEquipment.price
    };
  }
};
