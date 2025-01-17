/* eslint-disable */
// This file was autogenerated from DMN file

const {dmnRunService} = require("@adinsure/runtime");
const {ChronoUnit, LocalDate} = require('@js-joda/core');

module.exports = {
    MotorQuoteCoverageSelection: function(input) { return dmnRunService.runService(input, service_MotorQuoteCoverageSelection);}, 
};

const service_MotorQuoteCoverageSelection = {
    "decisions": {
        "SelectionRule": {
            expression(context) { 
                return dmnRunService.applyHitPolicy("UNIQUE", "", 
                    [
                        { condition: context["coverageKey"] == "mtpl" && true, outputs: {"tariffCode": "MtplTariff"} },
                        { condition: context["coverageKey"] == "casco" && true, outputs: {"tariffCode": "Casco"} },
                        { condition: context["coverageKey"] == "combinationB" && true, outputs: {"tariffCode": "CombinationB"} },
                        { condition: context["coverageKey"] == "mtplPlus" && true, outputs: {"tariffCode": "MtplPlus"} },
                        { condition: context["coverageKey"] == "additionalEquipmentCoverages" && context["parentCoverageKey"] == "casco", outputs: {"tariffCode": "AdditionalEquipment", "coverageCode": "MotorCasco"} },
                        { condition: context["coverageKey"] == "additionalEquipmentCoverages" && context["parentCoverageKey"] == "combinationB", outputs: {"tariffCode": "AdditionalEquipment", "coverageCode": "CombinationB"} },
                        { condition: context["coverageKey"] == "outsideEuAreaExtension" && context["parentCoverageKey"] == "combinationB", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "OutsideEu"} },
                        { condition: context["coverageKey"] == "participationInRacesExtension" && context["parentCoverageKey"] == "combinationB", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "ParticipationInRaces"} },
                        { condition: context["coverageKey"] == "waterEntrapmentExtension" && context["parentCoverageKey"] == "combinationB", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "WaterEntrapment"} },
                        { condition: context["coverageKey"] == "vehicleSinkingExtension" && context["parentCoverageKey"] == "combinationB", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "SinkingVehicle"} },
                        { condition: context["coverageKey"] == "sanationAvalanchesAndLandslidesExtension" && context["parentCoverageKey"] == "combinationB", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "AvalanchesAndLandslides"} },
                        { condition: context["coverageKey"] == "outsideEuAreaExtension" && context["parentCoverageKey"] == "casco", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "OutsideEu"} },
                        { condition: context["coverageKey"] == "participationInRacesExtension" && context["parentCoverageKey"] == "casco", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "ParticipationInRaces"} },
                        { condition: context["coverageKey"] == "waterEntrapmentExtension" && context["parentCoverageKey"] == "casco", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "WaterEntrapment"} },
                        { condition: context["coverageKey"] == "vehicleSinkingExtension" && context["parentCoverageKey"] == "casco", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "SinkingVehicle"} },
                        { condition: context["coverageKey"] == "sanationAvalanchesAndLandslidesExtension" && context["parentCoverageKey"] == "casco", outputs: {"tariffCode": "CoverageExtensions", "coverageCode": "AvalanchesAndLandslides"} },
                        { condition: context["coverageKey"] == "activityDamageExtension" && context["parentCoverageKey"] == "mtpl", outputs: {"tariffCode": "ActivityDamageExtension", "coverageCode": "ActivityArisingDamages"} },
                    ]
                        .filter(r => r.condition).map(r => r.outputs)
                );
            },
            requiredDecisions: []
        },
        "MotorQuoteCoverageSelection": {
            expression(context) { 
                return dmnRunService.evaluateContextExpression(context, (context) => {
                    return(
                        context["tariffCode"] = (
                            context["SelectionRule"]["tariffCode"]
                        ), 
                        context["coverageCode"] = (
                            context["SelectionRule"]["coverageCode"]
                        ),
                        undefined)
                });
            },
            requiredDecisions: ["SelectionRule"]
        }
    },
    "outputDecisions": ["MotorQuoteCoverageSelection"],
    "unboxOutput": true
};
