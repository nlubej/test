const { fuelTypes } = require('@config-triglav-si/motor-insurance-product/lib/ConstantsAndEnumsMotor');

module.exports = function mapping(input) {

  const result = input.sinkExchange?.vehicleSearchData;
  const optionalEquipmentResult = input.sinkExchange?.catalogOptionalEquipmentData;
  const response = {};

  if (result) {
    const emrvlData = result.emrvlResponseData;

    if (result.emrvlStatus === 'FOUND' && emrvlData) {
      response.eMRVL = {
        code: emrvlData.mrvlVehicleId,
        vin: emrvlData.vehicleIdentificationNumber,
        registration: {
          number: emrvlData.vehicleRegistration?.vehicleRegistrationNumber?.replace('-', ''),
          firstDate: emrvlData.firstRegistrationDate
        },
        insurancePolicy: {
          company: emrvlData.insurancePolicyCompany,
          number: emrvlData.insurancePolicyNumber
        },
        maxGrossVehicleWeight: emrvlData.maxGrossVehicleWeight
      };
    }

    if (result.etaxMatches) {
      response.eurotaxMatches = result.etaxMatches.map(e => {
        return {
          code: e.eurotaxCode,
          group: parseInt(e.vehicleGroup),
          brand: e.vehicleManufacturer,
          model: e.vehicleModel,
          type: e.vehicleType,
          fuelType: fuelTypes[e.fuelType],
          power: e.vehiclePower,
          engineVolume: e.engineSize,
          seats: e.registeredSeats,
          doors: e.doors,
          weight: e.vehicleWeight,
          price: e.vehiclePrice
        };
      });

      const additionalEquipment = result.additionalEquipmentVehicle?.additionalEquipment;
      if (additionalEquipment) {
        response.additionalEquipment = additionalEquipment.map(e => {
          const optionalEquipment = optionalEquipmentResult?.find(oe => oe.code === e.etaxEquipmentCode);

          return optionalEquipment;
        });
      }
    }
  } else {
    // TODO
  }

  return response;
};
