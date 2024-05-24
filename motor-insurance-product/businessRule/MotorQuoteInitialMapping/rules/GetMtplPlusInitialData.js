module.exports = function businessRule(tariff, input) {
    const mtplPlusSumInsured = tariff.rules.sumInsured(input.coverageAttributes);
    
    return {
        sumInsured: Number.isNaN(mtplPlusSumInsured) ? undefined : mtplPlusSumInsured,
    };
};