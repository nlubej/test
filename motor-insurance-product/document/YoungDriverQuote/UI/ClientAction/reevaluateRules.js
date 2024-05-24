module.exports = function reevaluateRules() {
  // because end date from contract duration could have changed, we have to reevaluate rules for claim buyback, and additional coverages
  this.view.reevaluateRules();
};
