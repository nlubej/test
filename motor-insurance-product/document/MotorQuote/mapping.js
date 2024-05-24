'use strict';

const {
  wizardCommonBodyMapping,
} = require('@config-triglav-si/motor-insurance-product/lib/MotorQuoteMappingHelper');
const MapContractAttributes = require('./rules/MapContractAttributes');
const MapCoverageAttributes = require('./rules/MapCoverageAttributes');
const MapObjectAttributes = require('./rules/MapObjectAttributes');

module.exports = function mapping(body, externalData) {
  const attrFunctions = {
    mapContractAttributes: MapContractAttributes,
    mapCoverageAttributes: MapCoverageAttributes,
    mapObjectAttributes: MapObjectAttributes
  };

  return wizardCommonBodyMapping.call(this, body, externalData, attrFunctions);
};
