const { isEmptyObject } = require('@config-triglav/contract/lib/TriglavJsonUtils');
/**
 * @errorCode {errorCode} MissingAnswer
 */
module.exports = function IddValidations(input) {

  if (!input || isEmptyObject(input) || input.skipQuestionnaire || this?.businessContext?.configurationCodeName !== 'MotorApplication') {
    return [];
  }

  const questions = [
    { isRequired: true, questionId: 'Q01' },
    { isRequired: true, questionId: 'Q02' },
    { isRequired: true, questionId: 'Q03' },
    { isRequired: true, questionId: 'Q04' },
    { isRequired: true, questionId: 'Q05' },
    { isRequired: true, questionId: 'Q06' },
    { isRequired: true, questionId: 'Q07' },
    { isRequired: true, questionId: 'Q08' },
    { isRequired: true, questionId: 'Q09' },
    { isRequired: true, questionId: 'Q10' },
    { isRequired: false, questionId: 'Q11', conditionQuestionId: 'Q10' }, // For Q11 validation, Q10 should be true
    { isRequired: false, questionId: 'Q12', conditionQuestionId: 'Q11' }, // For Q12 validation, Q11 should be true
    { isRequired: true, questionId: 'Q13' },
    { isRequired: true, questionId: 'Q14' },
    { isRequired: false, questionId: 'Q15', conditionQuestionId: 'Q14' }, // For Q15 validation, Q14 should be true
    { isRequired: true, questionId: 'Q16' },
    { isRequired: true, questionId: 'Q17' }
  ];

  for(const question of questions) {
    const { questionId, isRequired, conditionQuestionId } = question;
    if(isRequired) {
      if (isEmptyObject(input[questionId]) || input[questionId]?.need === undefined) {
        return [{
          errorCode: 'MissingAnswer',
          errorDataPath: `${this.businessContext.dataPath}/${questionId}/need`
        }];
      }
      if (input[questionId]?.need && input[questionId]?.requirement === undefined) {
        return [{
          errorCode: 'MissingAnswer',
          errorDataPath: `${this.businessContext.dataPath}/${questionId}/requirement`
        }];
      }
    } else if(input[conditionQuestionId]?.requirement) {
      if(input[questionId]?.need === undefined) {
        return [{
          errorCode: 'MissingAnswer',
          errorDataPath: `${this.businessContext.dataPath}/${questionId}/need`
        }];
      }
      if (input[questionId]?.need && input[questionId]?.requirement === undefined) {
        return [{
          errorCode: 'MissingAnswer',
          errorDataPath: `${this.businessContext.dataPath}/${questionId}/requirement`
        }];
      }
    }
  }

  return [];
};
