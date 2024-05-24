const { getAgentUserInformationFromContext } = require('@config-standard/pm-common/component/ContractOrganisationData/lib/AgentUserInformation');
const getPackageDefinition = require('@config-triglav-si/motor-insurance-product/component/MotorCoveragePackage/lib/MotorCoveragePackageDefinition');
const { setDefaultValuesForCoverages } = require('../../lib/SetDefaultValuesForCoverages');

module.exports = function mapping(applicationBody) {
  const selectedPackageDefinition = getPackageDefinition(applicationBody.insuredObject.vehicle).find(p => p.name === applicationBody.package);

  const quote = {
    body: {
      persons: {
        policyholder: applicationBody.client,
        insuredPerson: applicationBody.client,
        policyholderIsInsuredPerson: true
      },
      insuredObject: {
        objectType: 'vehicle',
        vehicle: {
          baseData: applicationBody.insuredObject.vehicle,
          subtype: {
            selectedSubtype: 'vehicleCar',
            vehicleCar: {}
          }
        }
      },
      contractDuration: applicationBody.contractDuration,
      organisation: getAgentUserInformationFromContext(undefined, this.applicationContext),
      iddQuestionnaire: applicationBody?.iddQuestionnaire
    },
    externalData: {
      applicationRelation: {
        relatedConfigurationName: this.businessContext.configurationCodeName,
        relatedConfigurationVersion: this.businessContext.configurationVersion,
        relatedNumber: this.businessContext.documentNumber
      }
    }
  };

  fillCoverages(quote.body.insuredObject, selectedPackageDefinition);

  return quote;
};

function fillCoverages(insuredObject, packageDefinition) {
  if (!packageDefinition) {
    return;
  }

  const coverageObject = {
    AO: defaultSelected('mtpl'),
    AOplus: defaultSelected('mtplPlus'),
    SAK: defaultSelected('casco'),
    B: defaultSelected('combinationB'),
    D: defaultSelected('combinationD'),
    K: defaultSelected('combinationK'),
    E: defaultSelected('combinationE'),
    H: defaultSelected('combinationH'),
    J: defaultSelected('combinationJ'),
    APZ: defaultSelected('automobileAndLegalProtection'),
    NMV: youngDriverSelected(),
    AASplus: assistancePlusSelected()
  };

  Object.keys(packageDefinition).forEach(coverageKey => {
    if (packageDefinition[coverageKey] && coverageObject[coverageKey]) {

      const coverageObj = coverageObject[coverageKey];
      const propertyKey = Object.keys(coverageObj)[0];
      // Set default values
      setDefaultValuesForCoverages(coverageObj[propertyKey], propertyKey, insuredObject);

      Object.assign(insuredObject.vehicle, coverageObj);
    }
  });
}

function defaultSelected(key) {
  return {
    [key]: {
      isSelected: true
    }
  };
}

function assistancePlusSelected() {
  return {
    assistance: {
      isSelected: true,
      assistanceCoverage: {
        assistanceCoverageProgram: 'AssistancePlus'
      }
    }
  };
}

function youngDriverSelected() {
  return {
    youngDriver: {
      mtplYoungDriver: {
        isSelected: true
      },
      mtplPlusYoungDriver: {
        isSelected: true
      },
      cascoYoungDriver: {
        isSelected: true
      }
    }
  };
}
