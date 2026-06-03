import * as mockData from '../data/mockData';

const fluctuate = (val, maxDelta = 0.5, min = 0, max = 100) => {
  const delta = (Math.random() * maxDelta * 2) - maxDelta;
  const newValue = Math.max(min, Math.min(max, val + delta));
  return Math.round(newValue * 10) / 10;
};

// Realistic state transition probabilities
const STATE_TRANSITIONS = {
  running:   { running: 0.96, idle: 0.02, breakdown: 0.015, maintenance: 0.005 },
  idle:      { running: 0.15, idle: 0.82, breakdown: 0.01, maintenance: 0.02 },
  breakdown: { running: 0.05, idle: 0.02, breakdown: 0.90, maintenance: 0.03 },
  maintenance: { running: 0.08, idle: 0.02, breakdown: 0.0, maintenance: 0.90 },
  noplan:    { running: 0.0, idle: 0.0, breakdown: 0.0, noplan: 1.0 },
};

const transitionState = (currentStatus) => {
  const probs = STATE_TRANSITIONS[currentStatus] || STATE_TRANSITIONS.running;
  const roll = Math.random();
  let cumulative = 0;
  for (const [state, prob] of Object.entries(probs)) {
    cumulative += prob;
    if (roll <= cumulative) return state;
  }
  return currentStatus;
};

export const simulateTick = () => {
  // 1. MD KPIs — fluctuate A, P, Q then recalculate OEE
  mockData.mdKPIs.availability.value = fluctuate(mockData.mdKPIs.availability.value, 0.15, 82, 96);
  mockData.mdKPIs.performance.value = fluctuate(mockData.mdKPIs.performance.value, 0.15, 83, 95);
  mockData.mdKPIs.quality.value = fluctuate(mockData.mdKPIs.quality.value, 0.05, 94, 99.5);
  mockData.mdKPIs.plantOEEAvg.value = Math.round(
    (mockData.mdKPIs.availability.value * mockData.mdKPIs.performance.value * mockData.mdKPIs.quality.value) / 10000
  * 10) / 10;

  // 2. Plant KPIs
  mockData.plantKPIs.availability.value = fluctuate(mockData.plantKPIs.availability.value, 0.2, 85, 97);
  mockData.plantKPIs.performance.value = fluctuate(mockData.plantKPIs.performance.value, 0.2, 84, 96);
  mockData.plantKPIs.quality.value = fluctuate(mockData.plantKPIs.quality.value, 0.05, 95, 99.8);
  mockData.plantKPIs.plantOEE.value = Math.round(
    (mockData.plantKPIs.availability.value * mockData.plantKPIs.performance.value * mockData.plantKPIs.quality.value) / 10000
  * 10) / 10;
  mockData.plantKPIs.shiftOEE.value = fluctuate(mockData.plantKPIs.shiftOEE.value, 0.3, 78, 95);

  // 3. Production counters
  if (Math.random() > 0.35) {
    mockData.productionCounter.totalToday += 1;
    mockData.productionCounter.goodCount += 1;
  }
  if (Math.random() > 0.97) {
    mockData.productionCounter.totalToday += 1;
    mockData.productionCounter.rejectCount += 1;
  }

  // 4. Machine cards — state transitions + stat updates
  mockData.machineCards.forEach(machine => {
    // State transition
    const newStatus = transitionState(machine.status);
    if (newStatus !== machine.status) {
      machine.status = newStatus;
    }

    if (machine.status === 'running') {
      if (Math.random() > 0.5) {
        machine.production += 1;
        machine.goodCount += 1;
      }
      if (Math.random() > 0.97) {
        machine.production += 1;
        machine.rejectCount += 1;
      }
      machine.oee = fluctuate(machine.oee, 0.4, 60, 98);
      machine.availability = fluctuate(machine.availability || 90, 0.2, 80, 99);
      machine.performance = fluctuate(machine.performance || 88, 0.2, 78, 98);
      machine.quality = fluctuate(machine.quality || 97, 0.05, 93, 99.9);
      machine.temperature = Math.floor(fluctuate(machine.temperature, 1, 35, 85));
    } else if (machine.status === 'idle') {
      machine.temperature = Math.floor(fluctuate(machine.temperature, 0.5, 25, 45));
    } else if (machine.status === 'breakdown') {
      machine.temperature = Math.floor(fluctuate(machine.temperature, 2, 30, 95));
    }
  });

  // 5. Sync machineStatusList with machineCards
  mockData.machineStatusList.forEach(mList => {
    const mCard = mockData.machineCards.find(c => c.id === mList.id);
    if (mCard) {
      mList.output = mCard.production;
      mList.oee = mCard.oee;
      mList.status = mCard.status;
    } else if (mList.status === 'running') {
      if (Math.random() > 0.5) mList.output += 1;
      mList.oee = fluctuate(mList.oee, 0.4, 60, 98);
    }
  });

  // 6. Section KPIs
  mockData.sectionKPIs.sectionOEE.value = fluctuate(mockData.sectionKPIs.sectionOEE.value, 0.2, 75, 95);

  // 7. Dept KPIs
  mockData.deptOEEKPIs.oee.value = fluctuate(mockData.deptOEEKPIs.oee.value, 0.15, 78, 92);
};
