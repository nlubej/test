const { getBonusClassFromTriglavPackage } = require('@config-triglav-si/motor-insurance-product/lib/MotorQuoteIntegrationHelper');

module.exports = async function getTriglavKompletBonusClass(input, ambientProperties) {
  const externalData = input.rootContext.Body.externalData;

  await getBonusClassFromTriglavPackage(externalData, input.actionData.vinCode, ambientProperties);

  this.view.rebind('/Body/externalData/triglavPackageBonusClass');
};
