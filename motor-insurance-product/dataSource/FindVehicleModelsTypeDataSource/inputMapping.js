module.exports = (input) => {
  return {
    urlSegments: {
      typeOfVehicle: input.data.typeOfVehicle,
      idMake: input.data.idMake,
      idModel: input.data.idModel
    }
  };
};
