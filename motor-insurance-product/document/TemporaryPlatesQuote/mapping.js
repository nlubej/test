'use strict';

const {
  wizardCommonBodyMapping,
} = require('@config-triglav-si/motor-insurance-product/lib/MotorQuoteMappingHelper');
const MapContractAttributes = require('./rules/MapContractAttributes');
const MapCoverageAttributes = require('./rules/MapCoverageAttributes');
const MapObjectAttributes = require('./rules/MapObjectAttributes');
const nonLifeReinsuranceUWCommonMapping = require('@config-standard/reinsurance-underwriting/component/ReinsuranceUWQuote/lib/NonLifeReinsuranceUWCommonMapping');

module.exports = function mapping(body, externalData) {

  return {};
};
