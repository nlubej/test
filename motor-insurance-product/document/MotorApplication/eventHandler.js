'use strict';

module.exports = function eventHandler(input) {
  const { configurationName, sourceId } = input.event.senderDocument;
  const eventType = input.event.eventType;

  if (!input.isSelf) {
    if (eventType === 'Created' && configurationName === 'MotorQuote') {
      if (sourceId === input.document.id) {
        return { makeTransition: 'CreateQuote' };
      }
    }
  }
};
