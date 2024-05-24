module.exports = (input) => {
  return {
    queryStrings: {
      vinNumber: input.data.vinCode,
      idPackage: input.data.idPackage
    }
  };
};
