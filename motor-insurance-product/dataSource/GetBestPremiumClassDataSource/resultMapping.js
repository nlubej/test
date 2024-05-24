module.exports = (input) => {
  const triglavPackageBonusClass = input?.triglavPackageBonus.find(p => p?.eligible === true)?.bestPremiumClass;
  return {
    triglavPackageBonusClass: triglavPackageBonusClass?.toString()
  };
};
