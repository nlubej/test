module.exports = function updateQuestionnaire(input) {
  const { dataProperty, data } = input;
  const elementId = this.getElementId();
  const coverage = getQuestionCoverage(elementId);

  if(dataProperty === 'need') {
    if(data[dataProperty] === true) {
      data.requirement = true;
      setCoverage(data, coverage);
    }
    if(data[dataProperty] === false) {
      data.requirement = undefined;
      clearCoverage(data);
    }
  }

  if(dataProperty === 'requirement') {
    if(data[dataProperty] === true) {
      setCoverage(data, coverage);
    }
    if(data[dataProperty] === false) {
      clearOrSetCoverage(data, coverage);
    }
  }

  this.view.reevaluateRules();
};

function setCoverage(data, coverage) {
  if(coverage.hasCoverageOnTrueAnswer) {
    data.hasCoverage = true;
    data.coverage = coverage.coverageOnTrueDescription;
  } else {
    data.hasCoverage = false;
    delete data.coverage;
  }
}

function clearOrSetCoverage(data, coverage) {
  if(coverage.hasCoverageOnFalseAnswer) {
    data.hasCoverage = true;
    data.coverage = coverage.coverageOnFalseDescription;
  } else {
    clearCoverage(data);
  }
}

function clearCoverage(data) {
  data.hasCoverage = false;
  delete data.coverage;
}

function getQuestionCoverage(key) {
  const questionMap = new Map([
    ['Q01', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'AO' }],
    ['Q02', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'AO+' }],
    ['Q03', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'SAK' }],
    ['Q04', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'B' }],
    ['Q05', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'K' }],
    ['Q06', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'D' }],
    ['Q07', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'E' }],
    ['Q08', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'H' }],
    ['Q09', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'J' }],
    ['Q10', { hasCoverageOnTrueAnswer: false }],
    ['Q11', { hasCoverageOnTrueAnswer: false, hasCoverageOnFalseAnswer: true, coverageOnFalseDescription: 'MINI' }],
    ['Q12', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'COMFORT', hasCoverageOnFalseAnswer: true, coverageOnFalseDescription: 'PLUS' }],
    ['Q13', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'NVM' }],
    ['Q14', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'PRZ' }],
    ['Q15', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'APZ' }],
    ['Q16', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'ZRN' }],
    ['Q17', { hasCoverageOnTrueAnswer: true, coverageOnTrueDescription: 'GAP' }]
  ]);

  return questionMap.get(key);
}
