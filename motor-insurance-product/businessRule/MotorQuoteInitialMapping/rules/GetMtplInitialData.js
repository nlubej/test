module.exports = function businessRule(tariff, input) {
    const mtplSumInsured = tariff.rules.sumInsured(input.mtplAttributes || {});

    return {
        materialDamageSumInsured: mtplSumInsured?.materialDamage || undefined,
        nonMaterialDamageSumInsured: mtplSumInsured?.nonMaterialDamage || undefined,
    };
};