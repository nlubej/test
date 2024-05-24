const { getTotalVehicleValue, getTotalVehicleValuePlusUpgrades } = require('@config-triglav-si/i-motor/component/Vehicle/lib/VehicleUtils');
const { executeBusinessRule } = require('@config-triglav/infrastructure/lib/clientBusinessRulesHelpers');
const { executeDataSource } = require('@config-triglav/infrastructure/lib/ClientDataSourceHelpers');

function recalculateVehicleTotalValue(vehicleData, clientViewModel) {
  if (!clientViewModel) {
    return;
  }

  if (!vehicleData) {
    if (!clientViewModel.vehicle) {
      clientViewModel.vehicle = {};
    }
    // reset
    clientViewModel.vehicle.vehicleAndOptionalEquipmentValue = 0;
    clientViewModel.vehicle.vehicleAndOptionalEquipmentValuePlusUpgrades = 0;
    return;
  }

  if (!clientViewModel.vehicle) {
    clientViewModel.vehicle = {};
  }
  clientViewModel.vehicle.vehicleAndOptionalEquipmentValue = getTotalVehicleValue(vehicleData);
  clientViewModel.vehicle.vehicleAndOptionalEquipmentValuePlusUpgrades = getTotalVehicleValuePlusUpgrades(vehicleData);
}

async function recalculateMtplSumInsured(input, mtplAttributes, ambientProperties) {
  const ruleInput = {
    startDate: input.context.Body?.contractDuration?.startDate || input.context.Body.generalInfo.validFrom,
    coverages: {
      mtpl: {
        isSelected: true,
        mtplAttributes: mtplAttributes
      }
    }
  };

  const result = await executeBusinessRule(ruleInput, ambientProperties, 'MotorQuoteInitialMapping', 1);

  if (!result?.coverages?.mtpl)
  { return; }

  input.context.ClientViewModel.coverages.mtpl.materialDamageSumInsured = result.coverages.mtpl.materialDamageSumInsured;
  input.context.ClientViewModel.coverages.mtpl.nonMaterialDamageSumInsured = result.coverages.mtpl.nonMaterialDamageSumInsured;

  this.view.rebind('/ClientViewModel*');
}

async function recalculateMtplPlusSumInsured(input, coverageAttributes, ambientProperties) {
  const ruleInput = {
    startDate: input.context.Body?.contractDuration?.startDate || input.context.Body.generalInfo.validFrom,
    coverages: {
      mtplPlus: {
        isSelected: true,
        coverageAttributes: coverageAttributes
      }
    }
  };

  const result = await executeBusinessRule(ruleInput, ambientProperties, 'MotorQuoteInitialMapping', 1);

  if (result?.coverages?.mtplPlus?.sumInsured) {
    input.context.ClientViewModel.coverages.mtplPlus.sumInsured = result.coverages.mtplPlus.sumInsured;

    this.view.rebind('/ClientViewModel*');
  }
}

async function initInvoiceNumber(input, ambientProperties) {

  if (!['Issued', 'PolicyWritten'].includes(input.context.State.Code)) {
    return;
  }
  this.view.startBlockingUI();
  const data = {
    data: {
      criteria: {
        contractNumber: input.context.Number
      }
    }
  };
  const result = await executeDataSource(data, ambientProperties, 'InvoiceSearchDataSource');
  const activeInvoices = result.map(i => i.resultData).filter(i => !['Discarded', 'Cancelled'].includes(i.state));
  input.context.ClientViewModel.invoiceRelation = {
    invoiceNumber: activeInvoices?.length && activeInvoices[0].number
  };

  this.view.stopBlockingUI();
}

module.exports = {
  recalculateVehicleTotalValue,
  recalculateMtplSumInsured,
  recalculateMtplPlusSumInsured,
  initInvoiceNumber
};
