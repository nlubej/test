const { DocumentBuilder } = require('@adinsure-tools/api-test-framework');

function createApplication() {
  return new DocumentBuilder('MotorApplication')
    .setExample('example-simple');
}

describe('MotorApplication workflow tests', function () {

  it('Create MotorApplication', async function () {
    await createApplication()
      .setActor('Agent')
      .create()
      .makeTransition('Confirm')
      .build();
  });

  it('Create quote from application', async function () {
    await createApplication()
      .setActor('Agent')
      .create()
      .makeTransition('Confirm')
      .makeRelation('CreateMotorQuoteFromApplication', undefined, {
        configurationLocation: '@config-triglav-si/motor-insurance-product',
        relationLocation: '@config-triglav-si/motor-insurance-product',
      })
      .build();
  });
});
