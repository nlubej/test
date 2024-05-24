module.exports = function businessRule(tariff, input) {
    const tariffResult = tariff.rules.activityDamage();

    return {
        sumInsured: Number.isNaN(tariffResult.sumInsured) ? undefined : tariffResult.sumInsured,
        deductible: Number.isNaN(tariffResult.deductible) ? undefined : tariffResult.deductible,
    };
};