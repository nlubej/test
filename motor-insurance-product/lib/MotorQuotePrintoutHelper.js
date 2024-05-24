'use strict';

function createContractObjectForPrintout(commonBody, businessContext) {
  const documentNumber = businessContext?.documentNumber;
  const contract = {
    number: documentNumber,
    parties: commonBody.parties,
    productCode: commonBody.productCode,
    startDate: commonBody.startDate,
    endDate: commonBody.endDate,
    issueDate: commonBody.issueDate,
    attributes: commonBody.attributes,
    objects: commonBody.objects,
    items: commonBody.items,
    organisation: commonBody.organisation,
    transitionResult: commonBody.transitionResult,
    evaluation: mapEvaluationForPrintout(commonBody.evaluation),
  };

  return contract;
}

function createSummaryObjectForPrintout(summaryData) {
  if (!summaryData) {
    return;
  }
  const summary = {
    conditions: summaryData.conditions,
    clauses: summaryData.clauses,
    premiumByCoverageSummary: summaryData.premiumByCoverageSummary
  };

  return summary;
}

function mapEvaluationForPrintout(evaluationData) {
  const evaluation = {
    evaluationDate: evaluationData.evaluationDate,
    itemEvaluation: (evaluationData.itemEvaluation || []).map(item => {
      return {
        itemRef: item.itemRef,
        description: item.description,
        objectRef: item.objectRef,
        insuranceClass: item.insuranceClass,
        tariffUnitCode: item.tariffUnitCode,
        insuranceType: item.insuranceType,
        tariffVersion: item.tariffVersion,
        tariffCode: item.tariffCode,
        startDate: item.startDate,
        endDate: item.endDate,
        premiumCalcStartDate: item.premiumCalcStartDate,
        premiumCalcEndDate: item.premiumCalcEndDate,
        changed: item.changed,
        premium: item.premium,
        paymentFrequency: item.paymentFrequency,
        adjustments: item.adjustments,
        breakdown: item.breakdown,
        tariffRatePeriod: item.tariffRatePeriod,
        coverage: {
          mainRisk: item.coverage.mainRisk,
          risks: item.coverage.risks,
          currency: item.coverage.currency,
          limits: item.coverage.limits,
          deductibles: item.coverage.deductibles
        },
        attributes: item.attributes
      };
    }),
  };

  return evaluation;
}

// Agent (salesPerson, insuranceCompany) has relation = 2, others relation = 1
// If we add some field in the signer role, we must notify Quadient about the change!!!
const signerRole = {
  agent: 'AGENT', // Agent
  policyHolder: 'POLICYHOLDER', // Zavarovalec
  insured: 'INSURED', // Zavarovanec
  insuredPerson: 'INSURED_PERSON', // Zavarovana oseba
  payer: 'PAYER', // Plačnik
};

function getSignersSpecification(body, signers) {
  const signersSignature = [];
  const policyHolder = getPartyBasedOnType(body.persons?.policyholder);
  const insuredPerson = getInsuredPerson(body.persons).naturalPerson;
  // const payer = getPayer(body);
  const payer = policyHolder;

  signers.forEach(i => {
    switch (i) {
      case signerRole.agent:
        signersSignature.push(getSignatureTag(signerRole.agent));
        break;
      case signerRole.insuranceCompany:
        signersSignature.push(getSignatureTag(signerRole.insuranceCompany));
        break;
      case signerRole.salesPerson:
        signersSignature.push(getSignatureTag(signerRole.salesPerson));
        break;
      case signerRole.policyHolder:
        signersSignature.push(getSignatureTag(signerRole.policyHolder, policyHolder.code));
        break;
      case signerRole.insured:
        signersSignature.push(getSignatureTag(signerRole.insured, insuredPerson.code));
        break;
      case signerRole.insuredPerson:
        signersSignature.push(getSignatureTag(signerRole.insuredPerson, insuredPerson.code));
        break;
      case signerRole.payer:
        signersSignature.push(getSignatureTag(signerRole.payer, payer.code));
        break;
    }
  });
  return {
    signers: signersSignature.filter(i => i.partyCode || i.signerType === signerRole.agent)
  };
}

function getSignatureTag(signerType, partyCode) {
  return { signerType, partyCode };
}

function getPartyBasedOnType(party) {
  if (!party) { return; }

  const { partyType, naturalPerson, legalEntity } = party;

  switch (partyType) {
    case 'NaturalPerson': return naturalPerson;
    case 'LegalEntity': return legalEntity;
    default: return;
  }
}

function getInsuredPerson(body) {
  if (body && body.policyholderIsInsuredPerson) {
    return getPartyBasedOnType(body.policyholder);
  }

  return body.insuredPerson;
}

module.exports = {
  createContractObjectForPrintout,
  createSummaryObjectForPrintout,
  getSignersSpecification,
  getPartyBasedOnType
};
