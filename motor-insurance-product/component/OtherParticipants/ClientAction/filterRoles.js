module.exports = function filterRoles(input) {
  const { componentContext, items, data } = input;

  if(!componentContext || componentContext.length === 0) {
    return items;
  }

  let alreadyUsedRoles = componentContext.map(x => x.role);

  if(data?.role) {
    alreadyUsedRoles = alreadyUsedRoles.filter(x => x !== data.role);
  }

  const roles = items.filter(x => !alreadyUsedRoles.includes(x));

  return roles;
};
