module.exports = function disableCascoCollisionPlus(input) {
  const mtplPlus = input?.context?.Body?.insuredObject?.vehicle?.mtplPlus;
  const cascoCollision = input?.context?.Body?.insuredObject?.vehicle?.cascoCollision;

  if (cascoCollision && mtplPlus) {
    if (cascoCollision.isSelected && mtplPlus.isSelected) {
      input.data.cascoCollisionCoverage.package = 'Basic';
    }
  }
};
