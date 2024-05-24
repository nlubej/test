const { executeDataSource } = require('@config-triglav/infrastructure/lib/ClientDataSourceHelpers');
const { getBonusClassFromTriglavPackage } = require('@config-triglav-si/motor-insurance-product/lib/MotorQuoteIntegrationHelper');

/**
 * @translationKey {translationKey} GetTriglavPackageIntegrationError
 */
module.exports = async function getTriglavKompletPackage(input, ambientProperties) {
  const externalData = input.context.Body.externalData;
  if (input.actionData?.resultData?.taxnumber) {
    const policyholderCode = input.context?.Body?.persons?.policyholder?.legalEntity?.code || input.context?.Body?.persons?.policyholder?.naturalPerson?.code;
    const data = {
      data: {
        taxNumber: parseInt(input.actionData.resultData.taxnumber)
      }
    };

    if (input.actionData.metadata.businessId === policyholderCode) {
      this.view.startBlockingUI();

      try {
        const result = await executeDataSource(data, ambientProperties, 'FindTriglavPackageDataSource');
        externalData.triglavPackageId = result?.triglavPackageId;
      } catch (ex) {
        const translationKey = `${ambientProperties.configurationCodeName.toUpperCase()}.GetTriglavPackageIntegrationError`;
        ambientProperties.services.confirmationDialog.showError(translationKey, 'OK', '', 1);
      }

      const vinCode = input.rootContext.Body?.insuredObject?.vehicle?.baseData?.vinCode;
      await getBonusClassFromTriglavPackage(externalData, vinCode, ambientProperties);

      this.view.stopBlockingUI();
    }
  }
  else {
    externalData.triglavPackageId = undefined;
    externalData.triglavPackageBonusClass = undefined;
  }

  this.view.rebind('/Body/externalData/*');
};
