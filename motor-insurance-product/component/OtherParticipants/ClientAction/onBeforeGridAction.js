const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
const { showError } = require('@config-triglav/infrastructure/lib/DialogHelpers');

/**
 * @translationKey {translationKey} InvalidInput
 */
module.exports = function onBeforeGridAction(input, ambientProperties) {
  const { affectedRow, operationType } = input;

  if(operationType === 'Delete') {
    return true;
  }

  if(!affectedRow.role || !affectedRow.party || isEmptyObject(affectedRow.party)) {
    const translation = ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName, 'InvalidInput');
    showError(ambientProperties.services, translation);
    return false;
  }

  return true;
};
