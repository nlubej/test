'use strict';

const { executeDataSource } = require('@config-triglav/infrastructure/lib/ClientDataSourceHelpers');

/**
 * @translationKey {translationKey} GetBestPremiumClassIntegrationError
 */
async function getBonusClassFromTriglavPackage(externalData, vinCode, ambientProperties) {
  const idPackage = externalData?.triglavPackageId;

  if (!vinCode || vinCode.length !== 17 || !idPackage) {
    delete externalData.triglavPackageBonusClass;
    return;
  }

  const inputDataSource = {
    data: {
      vinCode,
      idPackage
    }
  };
  try {
    const response = await executeDataSource(inputDataSource, ambientProperties, 'GetBestPremiumClassDataSource');
    externalData.triglavPackageBonusClass = response?.triglavPackageBonusClass;
  } catch (ex) {
    const translationKey = `${ambientProperties.configurationCodeName.toUpperCase()}.GetBestPremiumClassIntegrationError`;
    ambientProperties.services.confirmationDialog.showError(translationKey, 'OK', '', 1);
  }
}

module.exports = {
  getBonusClassFromTriglavPackage
};
