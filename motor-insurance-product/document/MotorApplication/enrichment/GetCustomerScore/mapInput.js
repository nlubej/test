module.exports = function mapping(externalData, body) {
  const client = body?.client;

  if (!client) {
    return;
  }

  let customerId;

  if (client.naturalPerson) {
    customerId = client.naturalPerson.externalId;
  } else if (client.legalEntity) {
    customerId = client.legalEntity.externalId;
  }

  // Uncomment when service is not mocked anymore
  // if (!customerId) {
  //   return;
  // }

  return {
    id: customerId
  };
};
