const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');
const { executeIntegrationService } = require('@config-triglav/infrastructure/lib/ClientIntegrationServiceHelpers');
const { deepReset } = require('@config-triglav-si/infrastructure/lib/ObjectHelperMotor');

module.exports = async function getVehicleData(input, ambientProperties) {

  const requestInput = {
    data: {}
  };

  let triggerSearch = false;
  if (input.dataProperty === 'vinCode') {
    if (input.data?.vinCode?.length === 17) {
      requestInput.data.vinNumber = input.data.vinCode;
      triggerSearch = true;
    }
  }
  else if (input.data?.licensePlate && input.data?.licensePlate?.length >= 5) {
    requestInput.data.regNumber = input.data.licensePlate;

    if (!input.data.catalogueNumber) {
      triggerSearch = true;
    }
  }

  if (!triggerSearch) {
    return;
  }

  const vehicleIntegrationData = await fetchVehicleData.call(this, input, ambientProperties, requestInput);

  // if we have data from integration, we put it on the document
  if (vehicleIntegrationData) {

    const eMRVL = vehicleIntegrationData.eMRVL;
    if (eMRVL) {
      input.data.mrvlCode = eMRVL.code;
      input.data.vinCode = !input.data.vinCode ? eMRVL.vin : input.data.vinCode;
      input.data.licensePlate = !input.data.licensePlate ? eMRVL.registration?.number : input.data.licensePlate;
      input.data.firstRegistrationDate = eMRVL.registration?.firstDate;
      input.data.maximumAuthorisedMass = eMRVL.maxGrossVehicleWeight;
    }

    const eurotaxMatches = vehicleIntegrationData.eurotaxMatches;
    if (eurotaxMatches && eurotaxMatches.length > 0) {
      if (eurotaxMatches.length === 1) {
        const eurotax = eurotaxMatches[0];
        mapEurotax(input.data, eurotax);
      } else {
        await showEurotaxMatchesDialog(eurotaxMatches, ambientProperties.services, input.data);
      }
    }

    const optionalEquipmentData = vehicleIntegrationData.additionalEquipment;
    if (optionalEquipmentData) {
      input.data.optionalEquipment = optionalEquipmentData.map(ae => {
        return {
          code: ae.code,
          description: ae.description,
          price: ae.price,
          validFrom: ae.validFrom,
          validTo: ae.validTo
        };
      });
    }
  }

  this.view.rebind('/Body/*');
};

async function fetchVehicleData(input, ambientProperties, requestInput, skipProperties = []) {

  if (isEmptyObject(requestInput)) {
    return;
  }

  this.view.startBlockingUI();

  try {
    const responseData = await executeIntegrationService(requestInput, ambientProperties, 'VehicleSearchIntegrationService', 1);
    if (!isEmptyObject(responseData)) {
      // clear previous data
      deepReset(input.data, [input.dataProperty, ...skipProperties]);
      return responseData;
    }
  }
  catch (ex) {
    this.view.stopBlockingUI();
  }
  finally {
    this.view.stopBlockingUI();
  }
}

function mapEurotax(data, eurotax) {
  data.catalogueNumber = eurotax.code;
  data.vehicleGroup = eurotax.group;
  data.vehicleBrand = eurotax.brand;
  data.vehicleModel = eurotax.model;
  data.vehicleType = eurotax.type;
  data.fuelType = eurotax.fuelType;
  data.enginePower = eurotax.power;
  data.engineDisplacement = eurotax.engineVolume;
  data.numberOfSeats = eurotax.seats;
  data.numberOfDoors = eurotax.doors;
  data.vehicleMass = eurotax.weight;
  data.vehicleValue = eurotax.price;
}

async function showEurotaxMatchesDialog(eurotaxMatchesData, services, data) {

  const conceptTypeCodeName = 'SearchView';
  const viewConfigurationName = 'EurotaxMatchesView';
  const viewConfigurationVersion = '1';

  const dialogViewReference = {
    configurationCodeName: viewConfigurationName,
    configurationConceptType: conceptTypeCodeName,
    configurationVersion: viewConfigurationVersion
  };

  const dialogParams = {
    dialogViewReference,
    title: `${viewConfigurationName.toUpperCase()}.${viewConfigurationName}@Title`,
    customData: {
      eurotaxMatchesData
    },
    dialogSize: 'Large'
  };

  const result = await services.viewDialog.show(dialogParams);

  const eurotaxSelected = result?.data?.dialogContext?.outputContext?.eurotaxSelected;
  if (eurotaxSelected) {
    mapEurotax(data, eurotaxSelected);
  }
}
