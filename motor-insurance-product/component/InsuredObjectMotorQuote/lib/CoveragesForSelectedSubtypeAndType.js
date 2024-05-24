/* eslint-disable */
// This file was autogenerated from DMN file

const {dmnRunService} = require("@adinsure/runtime");
const {ChronoUnit, LocalDate} = require('@js-joda/core');

module.exports = function businessRule(input, options) {
    return dmnRunService.runService(input, service_CoveragesForSelectedSubtypeAndType, options);
};

const service_CoveragesForSelectedSubtypeAndType = {
    "decisions": {
        "CoveragesForSelectedSubtypeAndType": {
            expression(context) { 
                return dmnRunService.applyHitPolicy("COLLECT", "", 
                    [
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "casco" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "combinationB" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "combinationD" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "combinationE" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "combinationH" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "combinationJ" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "combinationK" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "cascoCollision" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "mtpl" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == true), outputs: "mtplPlus" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "activityDamageExtension" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "additionalEquipmentCoverages" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "additionalWorkDevicesCoverages" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "outsideEuAreaExtension" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "participationInRacesExtension" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "waterEntrapmentExtension" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "vehicleSinkingExtension" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "sanationAvalanchesAndLandslidesExtension" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "assistance" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "youngDriver" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "accidentInsurance" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "legalProtection" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "luggageInsurance" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "micromobilityInsurance" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "rehabilitationTraffic" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "smallAnimalsDuringTransport" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "gap" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "automobileAndLegalProtection" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "vehicleBreakdown" },
                        { condition: context["objectType"] == "vehicle" && (context["isMainCoverage"] == null || context["isMainCoverage"] == false), outputs: "radioDevices" },
                    ]
                        .filter(r => r.condition).map(r => r.outputs)
                );
            },
            requiredDecisions: []
        }
    },
    "outputDecisions": ["CoveragesForSelectedSubtypeAndType"],
    "unboxOutput": true
};
