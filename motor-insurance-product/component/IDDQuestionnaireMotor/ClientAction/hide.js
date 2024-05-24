module.exports = function hide(input) {
  const { data, dataProperty } = input;
  if(data[dataProperty]?.need === true && data[dataProperty]?.requirement === true) {
    return false;
  }
  return true;
};
