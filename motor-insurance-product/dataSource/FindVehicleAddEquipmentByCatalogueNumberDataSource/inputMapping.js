module.exports = (input) => {
  return {
    urlSegments: {
      typeOfVehicle: input.data.typeOfVehicle,
      idType: input.data.idType
    }
  };
};
