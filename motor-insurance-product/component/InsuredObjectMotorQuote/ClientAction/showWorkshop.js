module.exports = function showWorkshop(input) {

  const subtype = input?.context?.Body?.insuredObject?.vehicle?.subtype;

  if (subtype) {
    if (subtype.selectedSubtype === 'workshop') {
      return true;
    }
  }
};
