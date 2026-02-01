// src/utils/CalculatorLogic.js
import { getResourceSumInRange } from '../database/queries';
import { getPathForCategory } from '../constants/Config';

const getStepValue = (stepObj) => {
  if (!stepObj) return 0;
  return (parseInt(stepObj.tier) || 0) * 100 + (parseInt(stepObj.step) || 0);
};

/**
 * Hàm tính toán kho đồ ảo dựa trên thời gian trôi qua
 */
export const getVirtualInventory = (baseInventory, farmRates, updatedAt) => {
  if (!updatedAt) return baseInventory;

  const now = new Date().getTime();
  const lastUpdate = new Date(updatedAt).getTime();
  const diffInMs = Math.max(0, now - lastUpdate);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Số ngày thực tế (có cả số lẻ)

  const virtualInv = { ...baseInventory };

  Object.keys(farmRates).forEach(code => {
    const rate = farmRates[code] || 0;
    if (rate > 0) {
      const addedAmount = diffInDays * rate;
      virtualInv[code] = (virtualInv[code] || 0) + addedAmount;
    }
  });

  return virtualInv;
};

export const calculatePlanResources = (targets, categories) => {
  const aggregateResources = {};
  targets.forEach((target) => {
    const { catId, catCode, qty, start, end } = target;
    const path = getPathForCategory(catCode);
    const catName = categories.find(c => c.id === catId)?.name || '';
    if (!path) return;

    const startKey = `${start.type}@${start.qual}`;
    const endKey = `${end.type}@${end.qual}`;
    const startIndex = path.indexOf(startKey);
    const endIndex = path.indexOf(endKey);
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) return;

    for (let i = startIndex; i <= endIndex; i++) {
      const currentChặng = path[i];
      const [typeCode, qualCode] = currentChặng.split('@');
      let startVal = -1; let endVal = 9999;
      if (i === startIndex) startVal = getStepValue(start);
      if (i === endIndex) endVal = getStepValue(end);

      const chặngResources = getResourceSumInRange(catId, typeCode, qualCode, startVal, endVal);
      chặngResources.forEach((res) => {
        if (!aggregateResources[res.code]) {
          let displayShortName = res.short_name;
          if (!displayShortName.includes(catName) && !displayShortName.includes("Hồn Thạch")) {
             displayShortName = `${res.short_name} ${catName}`;
          }
          aggregateResources[res.code] = { ...res, short_name: displayShortName, total_needed: 0 };
        }
        aggregateResources[res.code].total_needed += (res.total * qty);
      });
    }
  });
  return aggregateResources;
};

export const calculateDaysToGoal = (neededResources, inventory, planFarmRates, globalFarmRates) => {
  let maxDays = 0;
  const analysis = [];

  Object.values(neededResources).forEach((res) => {
    const owned = inventory[res.code] || 0;
    
    // Ưu tiên lấy rate riêng trong plan (nếu có), không thì lấy Global (từ Settings)
    const rate = (planFarmRates && planFarmRates[res.code])
                 ? planFarmRates[res.code] 
                 : (globalFarmRates && globalFarmRates[res.code] ? globalFarmRates[res.code] : 0);

    const remaining = Math.max(0, res.total_needed - owned);

    let days = 0;
    if (remaining > 0) {
      if (rate > 0) {
        days = Math.ceil(remaining / rate);
      } else {
        days = Infinity; // Đây là lý do nó báo vô cực nếu ko nhận được rate
      }
    }

    if (days !== Infinity && days > maxDays) maxDays = days;

    analysis.push({ ...res, owned, rate, remaining, days: days === Infinity ? '∞' : days });
  });

  return {
    totalDays: maxDays === Infinity ? '∞' : maxDays,
    resourceAnalysis: analysis
  };
};

export const optimizeEventAllocation = (selectedResCodes, neededResources, inventory, globalFarmRates, totalBudget, conversionRates) => {
  const simInventory = { ...inventory };
  const allocation = {}; 
  const chestsUsed = {}; 
  selectedResCodes.forEach(code => { allocation[code] = 0; chestsUsed[code] = 0; });

  let remainingBudget = totalBudget;
  while (remainingBudget > 0) {
    let maxDays = -1;
    let bottleneckCode = null;
    let allFinished = true;
    selectedResCodes.forEach(code => {
      const res = neededResources[code];
      const owned = simInventory[code] || 0;
      const rate = globalFarmRates[code] || 0; 
      const remaining = Math.max(0, res.total_needed - owned);
      if (remaining > 0) {
        allFinished = false;
        let days = rate > 0 ? (remaining / rate) : 99999999;
        if (days > maxDays) { maxDays = days; bottleneckCode = code; }
      }
    });
    if (allFinished || !bottleneckCode) break;
    const quantityPerChest = conversionRates[bottleneckCode] || 1;
    simInventory[bottleneckCode] = (simInventory[bottleneckCode] || 0) + quantityPerChest;
    allocation[bottleneckCode] += quantityPerChest;
    chestsUsed[bottleneckCode] += 1;
    remainingBudget--;
  }
  const finalAnalysis = calculateDaysToGoal(neededResources, simInventory, globalFarmRates);
  return { allocation, chestsUsed, finalAnalysis, remainingBudget };
};