const { getCascoDeductibles } = require('@config-triglav-si/casco/lib/CascoDeductibles');

function setDefaultValuesForCoverages(data, coverageKey, insuredObject) {

  if (coverageKey === 'mtpl') {
    data.mtplAttributes = {
      materialDamageSumCorrection: 'Legal',
      nonMaterialDamageSumCorrection: 'Legal',
      bonusMalus: {
        bonusMalusCoefficient: '14'
      }
    };
  }
  else if (coverageKey === 'mtplPlus') {
    data.coverageAttributes = {
      sumInsuredSelection: 'Basic Sum Insured'
    };
  }
  else if (coverageKey === 'casco') {

    const deductibles = getCascoDeductibles(insuredObject);

    data.cascoCoverage = {
      bonusMalus: {
        bonusMalusCoefficient: '14'
      },
      deductible: deductibles[0]
    };
  }
}

module.exports = {
  setDefaultValuesForCoverages
};
