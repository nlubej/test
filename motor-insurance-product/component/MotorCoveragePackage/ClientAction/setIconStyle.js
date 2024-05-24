
module.exports = function setIconStyle(input) {
  if (input && input.data) {
    if (input.data[input.dataProperty] === true) {
      return {
        'name': 'Check',
        'size': 'Large',
        'color': 'Success',
        'description': 'Included'
      };
    }
    return {
      'name': 'Times',
      'size': 'Large',
      'color': 'Danger',
      'description': 'Not included'
    };
  }
  return undefined;
};
