const { DocumentBuilder } = require('@adinsure-tools/api-test-framework');

function createQuote() {
  return new DocumentBuilder('MotorQuote')
    .setExample('example-simple');
}

describe('MotorQuote workflow tests', function () {

  it('Create MotorQuote', async function () {
    await createQuote()
      .setActor('Agent')
      .create()
      .build();
  });
});
