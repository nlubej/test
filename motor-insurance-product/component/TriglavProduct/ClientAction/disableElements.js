const { isReadonly } = require('@config-triglav-si/pm-common/lib/MotorReadonlyHelper');

module.exports = function disableElements(input) {
  return isReadonly(input);
};
