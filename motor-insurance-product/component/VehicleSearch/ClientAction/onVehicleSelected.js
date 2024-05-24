module.exports = function onVehicleSelected(input) {

  const context = input.getLookupContext();
  const viewContext = context?.viewContext;
  const selected = context?.selection[0];

  const makname = viewContext?.makname;
  const modname = viewContext?.modname;

  // clear previous selection
  for (const key in input.data) {
    if (!['licensePlate', 'vinCode'].includes(key)) {
      delete input.data[key];
    }
  }

  input.data.vehicleGroup = context.request?.data?.typeOfVehicle;
  input.data.vehicleBrand = makname;
  input.data.vehicleModel = modname;

  if (selected) {
    input.data.vehicleType = selected.typname;
    input.data.enginePower = selected.typkw;
    input.data.numberOfSeats = selected.typseat;
    input.data.vehicleValue = selected.price;
    input.data.engineDisplacement = selected.typcaptech || undefined;
    input.data.vehicleMass = selected.typcurbwgt;
    input.data.catalogueNumber = selected.typnatcode;
    input.data.initialProductionYear = selected.typimpbegin?.length > 3 && parseInt(selected.typimpbegin.substring(0, 4)) || undefined;
    input.data.finalProductionYear = selected.typimpend?.length > 3 && parseInt(selected.typimpend.substring(0, 4)) || undefined;
    input.data.maximumAuthorisedMass = selected.typtotwgt;
  }
};
