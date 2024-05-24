/**
 * @translationKey {translationKey} DataIsNotSelected UpgradeAlreadyExist
 */
module.exports = async function canSelect(input, ambientProperties) {
  const selection = input.getLookupData().selection;

  if (!selection?.length) {
    ambientProperties.services.confirmationDialog.showNotification(`${ambientProperties.configurationCodeName.toUpperCase()}.DataIsNotSelected`);
    return false;
  }

  const upgradeCodes = (input.rootContext.Body?.insuredObject?.vehicle?.baseData?.upgrades || []).map(i => i.code);
  const selectedUpgrade = selection[0];
  const alreadyExist = upgradeCodes.includes(selectedUpgrade.typnatcode);

  if (alreadyExist) {
    ambientProperties.services.confirmationDialog.showNotification(`${ambientProperties.configurationCodeName.toUpperCase()}.UpgradeAlreadyExist`);
    return false;
  }
  return true;
};
