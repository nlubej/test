/* eslint-disable */
// This file was autogenerated from DMN file

const {dmnRunService} = require("@adinsure/runtime");
const {ChronoUnit, LocalDate} = require('@js-joda/core');

module.exports = function businessRule(input, options) {
    return dmnRunService.runService(input, service_MapContractAttributes, options);
};

const service_MapContractAttributes = {
    "decisions": {
        "MapContractAttributes": {
            expression(context) { 
                return dmnRunService.evaluateContextExpression(context, (context) => {
                    return(
                        context["mock"] = (
                            undefined
                        ),
                        undefined)
                });
            },
            requiredDecisions: []
        }
    },
    "outputDecisions": ["MapContractAttributes"],
    "unboxOutput": true
};
