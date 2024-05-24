const { LocalDate } = require('@js-joda/core');
const { showAdditionalEquipmentSection } = require('@config-triglav-si/motor-insurance-product/component/TabCasco/lib/TabCascoHelpers');
module.exports = function hideCascoTabCoverageExtensions(input) {

  const cascoIsSelected = input.context.Body.insuredObject?.vehicle?.casco?.isSelected;
  const BcombinationIsSelected = input.context.Body.insuredObject?.vehicle?.combinationB?.isSelected;
  const DcombinationIsSelected = input.context.Body.insuredObject?.vehicle?.combinationD?.isSelected;
  const EcombinationIsSelected = input.context.Body.insuredObject?.vehicle?.combinationE?.isSelected;
  const HcombinationIsSelected = input.context.Body.insuredObject?.vehicle?.combinationH?.isSelected;
  const JcombinationIsSelected = input.context.Body.insuredObject?.vehicle?.combinationJ?.isSelected;
  const KcombinationIsSelected = input.context.Body.insuredObject?.vehicle?.combinationK?.isSelected;
  const cascoCollisionIsSelected = input.context.Body.insuredObject?.vehicle?.cascoCollision?.isSelected;

  if (!cascoIsSelected && !BcombinationIsSelected && !DcombinationIsSelected && !EcombinationIsSelected && !HcombinationIsSelected && !JcombinationIsSelected && !KcombinationIsSelected && !cascoCollisionIsSelected) {
    return true;
  }

  // if showAdditionalEquipmentSection returns false, it means that the whole additional equipment section will be hidden
  // Tabs need to stay "visible" otherwise platform throws an error that all tabs are hidden
  if (!showAdditionalEquipmentSection(input)) {
    return false;
  }

  const subtype = input?.context?.Body?.insuredObject?.vehicle?.subtype;
  if (subtype) {
    if (subtype.selectedSubtype === 'workshop') {
      return true;
    }
  }

  const contractDuration = getContractDuration(input);

  if (contractDuration) {
    if (contractDuration.startDate && contractDuration.endDate) {
      const startDate = LocalDate.parse(contractDuration.startDate);
      const endDate = LocalDate.parse(contractDuration.endDate);

      if (!contractDuration.dateSynchronization) {
        if (startDate.plusYears(1).isAfter(endDate)) {
          return true;
        }
      }
    }
  }

  return false;
};

function getContractDuration(input) {
  if (input.context.Body.contractDuration) {
    return input.context.Body.contractDuration;
  }
  else if (input.context.Summary.contractDuration) {
    // in case of general amendment
    return input.context.Summary.contractDuration;
  }
}
