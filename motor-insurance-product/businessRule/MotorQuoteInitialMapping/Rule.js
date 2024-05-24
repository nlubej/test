const { tariffs } = require('@adinsure/runtime');
const { MotorQuoteCoverageSelection } = require('@config-triglav-si/motor-insurance-product/lib/MotorQuoteCoverageSelection');
const { todayAsString } = require('@config-system/infrastructure/lib/DateUtilsCore');
const GetMtplInitialData = require('./rules/GetMtplInitialData');
const GetMtplPlusInitialData = require('./rules/GetMtplPlusInitialData');
const GetActivityDamageExtensionInitialData = require('./rules/GetActivityDamageExtensionInitialData');

module.exports = function rule(data) {
    const result = {
        coverages: {}
    };

    const startDate = data.input.startDate || todayAsString();

    const ruleMapper = {
        'mtpl': GetMtplInitialData,
        'mtplPlus': GetMtplPlusInitialData,
        'activityDamageExtension': GetActivityDamageExtensionInitialData,
    };

    const parentCoverageKey = {
        'activityDamageExtension': 'mtpl'
    };

    Object.keys(data.input.coverages || []).forEach(key => {
        if (data.input.coverages[key].isSelected) {
            const tariffData = MotorQuoteCoverageSelection({ coverageKey: key, parentCoverageKey: parentCoverageKey[key] });
            const tariff = tariffs.getTariff(tariffData.tariffCode, startDate);
            const ruleMappingFn = ruleMapper[key];

            result.coverages[key] = ruleMappingFn(tariff, data.input.coverages[key]);
        }
    });

    return result;
};
