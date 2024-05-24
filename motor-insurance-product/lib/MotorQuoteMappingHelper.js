'use strict';
const {
  freeTextClausesMapToCommonContract,
} = require('@config-standard/general-contract/component/FreeTextClausesEntry/lib/FreeTextClausesMapToCommonContract');
const {
  mapPropertiesToCommonBodyObjects
} = require('@config-system/segment-nonlife/lib/mapWizardContentToCommonBody');
const { mapToPolicyholder, mapToInsuredPersons, mapDefaultPaymentPlan } = require('@config-triglav-si/motor-insurance-product/lib/MotorMappingHelper');
const { mapOrganisationData } = require('@config-triglav/contract/component/OrganisationData/lib/MapOrganisationDataToCommonContract');

/**
 * Wizard generated mapping to common body
 * @param body
 * @param mapContractAttributes attribute mapping rule
 * @param mapCoverageAttributes attribute mapping rule
 * @param mapObjectAttributes attribute mapping rule
 */
function wizardCommonBodyMapping(
  body,
  externalData,
  { mapContractAttributes, mapCoverageAttributes, mapObjectAttributes }
) {
  const { startDate, endDate, issueDate, startTime, endTime } = body.contractDuration;
  const salesProductCode = this.businessContext?.configurationDimensions?.productCode;
  const insuredObjects = (body && body.insuredObject && [body.insuredObject]) || [];

  const commonBody = {
    parties: {
      ...mapToPolicyholder(body.persons?.policyholder),
      ...mapToInsuredPersons(body.persons?.insuredPerson),
      otherParties: []
    },
    productCode: salesProductCode,
    startDate,
    endDate,
    issueDate,
    startTime,
    endTime,
    objects: mapPropertiesToCommonBodyObjectsMotor(insuredObjects),
    items: [],
    invoicing: {
      invoiceOnActivation: false,
      installmentBasedInvoicing: false,
      taxDistributionByInstallments: true,
    },
    paymentPlan: mapDefaultPaymentPlan(),
    organisation: mapOrganisationData(body.organisation),
    attributes: {
      ...freeTextClausesMapToCommonContract(body.freeTextClauses),
      tkbClass: body?.externalData?.triglavPackageBonusClass, // TODO check if even needed
      productLine: this.businessContext?.configurationDimensions?.productLine
    }
  };

  // custom contract attributes
  commonBody.attributes = {
    ...commonBody.attributes,
    ...mapContractAttributes({ ...body, commonBody, externalData }),
  };

  // custom object attributes
  (commonBody.objects || []).forEach((object) => {
    object.attributes = {
      ...object.attributes,
      ...mapObjectAttributes({ ...object, body, commonBody, externalData }),
    };
  });

  // custom item attributes
  (commonBody.items || []).forEach((item) => {
    item.attributes = {
      ...item.attributes,
      ...mapCoverageAttributes({ ...item, body, commonBody, externalData }),
    };
  });

  return commonBody;
}

function mapPropertiesToCommonBodyObjectsMotor(insuredObjects) {
  // map common objects
  const commonObjects = [];

  // Include equipment objects for object type vehicle
  (insuredObjects || []).forEach((insuredObject) => {
    // put vin code on first place

    if (insuredObject[insuredObject.objectType]?.baseData.vinCode) {
      insuredObject[insuredObject.objectType].baseData = {
        vinCode: insuredObject[insuredObject.objectType].baseData.vinCode,
        ...insuredObject[insuredObject.objectType].baseData
      };
    }

    const commonObj = mapPropertiesToCommonBodyObjects([insuredObject])[0];
    commonObjects.push(commonObj);

    const equipmentObjects = insuredObject.vehicle?.additionalEquipmentCoverages || [];

    equipmentObjects.forEach(equipment => {
      if (!equipment) {
        return;
      }

      const commonEquipmentObject = createEquipmentCommonObject(equipment.id, insuredObject.vehicle.baseData?.vinCode);
      commonEquipmentObject.attributes = { ...equipment };
      commonEquipmentObject.parentObjectRef = commonObj?.id;
      commonEquipmentObject.description = equipment.equipmentDescription;

      commonObjects.push(commonEquipmentObject);
    });
  });

  return commonObjects;
}

function createEquipmentCommonObject(objectId, vinCode) {
  const insuredObject = {
    objectType: 'equipment',
    equipment: {
      baseData: {
        code: `${vinCode}-${objectId}`
      }
    }
  };

  const commonObject = mapPropertiesToCommonBodyObjects([insuredObject])[0];

  return commonObject;
}

module.exports = {
  wizardCommonBodyMapping
};
