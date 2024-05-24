module.exports = function showCoveragePackages(input) {
  return !!input.context?.Body?.insuredObject?.vehicle?.firstRegistrationDate && !!input.context?.Body?.product?.idMktProd;
};
