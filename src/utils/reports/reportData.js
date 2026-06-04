/**
 * reportData.js
 * Opus One Operational Intelligence Platform
 * Data computation and narrative generation for Executive Reports
 */

import {
  mdKPIs,
  plantPerformanceTable,
  operationalLossContributors,
  oeeTrendData,
  shiftProductivityComparison,
  alarmHeatmapData,
  enterpriseMachineStatus,
} from '../../data/mockData.js';

// ─── Role Labels ──────────────────────────────────────────────────────────────
const ROLE_LABELS = {
  MD:           'Managing Director',
  PLANT_HEAD:   'Plant Head',
  DEPT_HEAD:    'Department Head',
  SECTION_HEAD: 'Section Head',
  LINE_HEAD:    'Line Head',
};

// ─── KPI Targets & Direction ──────────────────────────────────────────────────
const KPI_TARGETS = {
  plantOEEAvg:  { target: 85,   higherIsBetter: true  },
  availability:  { target: 90,   higherIsBetter: true  },
  performance:   { target: 92,   higherIsBetter: true  },
  quality:       { target: 98.5, higherIsBetter: true  },
  totalDowntime: { target: 80,   higherIsBetter: false },
};

// ─── Report Governance ────────────────────────────────────────────────────────
export function generateReportMeta(user) {
  const now    = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const seq    = String(Math.floor(Math.random() * 900) + 100);
  const timeStr = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true,
  });

  return {
    reportId:    `OOI-MFG-${dateStr}-${seq}`,
    version:     '1.0',
    generatedAt: timeStr,
    generatedBy: user?.name || 'System Administrator',
    role:        ROLE_LABELS[user?.role] || 'Managing Director',
    organization:'Opus One Industries',
    platform:    'Opus One Operational Intelligence Platform',
    dateTag:     now.toISOString().slice(0, 10),
  };
}

// ─── Benchmarks ───────────────────────────────────────────────────────────────
export function computeBenchmarks() {
  return Object.entries(mdKPIs).map(([key, kpi]) => {
    const spec   = KPI_TARGETS[key];
    const target = spec?.target ?? null;
    const hib    = spec?.higherIsBetter ?? true;
    const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
    const adj    = gap != null ? (hib ? gap : -gap) : null;
    const status = adj == null ? 'neutral'
      : adj >= 0  ? 'good'
      : adj >= -5 ? 'warning'
      : 'critical';

    return {
      key, label: kpi.label, value: kpi.value, unit: kpi.unit,
      trend: kpi.trend, target, gap, status, higherIsBetter: hib,
    };
  });
}

// ─── Plant Health ─────────────────────────────────────────────────────────────
export function computePlantHealth() {
  return [...plantPerformanceTable]
    .sort((a, b) => b.oee - a.oee)
    .map((p, i) => ({
      ...p,
      rank:        i + 1,
      rankLabel:   ['#1', '#2', '#3', '#4'][i] || `#${i + 1}`,
      healthLabel: p.status === 'good' ? 'HEALTHY' : p.status === 'warning' ? 'MONITOR' : 'CRITICAL',
    }));
}

// ─── Executive Narrative ──────────────────────────────────────────────────────
export function generateNarrative() {
  const kpis      = mdKPIs;
  const plants    = computePlantHealth();
  const topLoss   = operationalLossContributors[0];
  const bestPlant = plants[0];
  const worstPlant= plants[plants.length - 1];
  const oeeTrend  = kpis.plantOEEAvg.trend;
  const dtTrend   = kpis.totalDowntime.trend;

  const oeeCtx = kpis.plantOEEAvg.value >= 80
    ? 'above the industry baseline of 80%'
    : kpis.plantOEEAvg.value >= 75
    ? 'approaching operational targets but below the 85% enterprise benchmark'
    : 'critically below target — requiring immediate senior leadership intervention';

  return [
    `Opus One Industries recorded an enterprise OEE of ${kpis.plantOEEAvg.value}% for the current reporting period — ` +
    `${oeeCtx}. OEE ${oeeTrend > 0 ? 'improved by' : 'declined by'} ${Math.abs(oeeTrend)}% versus the prior period, ` +
    `with total operational downtime recorded at ${kpis.totalDowntime.value} hours ` +
    `(${dtTrend < 0 ? 'a reduction' : 'an increase'} of ${Math.abs(dtTrend)} hours).`,

    `${bestPlant.plant} continues to lead all facilities at ${bestPlant.oee}% OEE with ${bestPlant.avail}% availability, ` +
    `serving as the operational excellence benchmark for the enterprise. In contrast, ${worstPlant.plant} requires priority ` +
    `leadership attention, operating at ${worstPlant.oee}% OEE with ${worstPlant.downtime} hours of recorded downtime — ` +
    `the highest across all plants this period.`,

    `${topLoss.cause} is the dominant productivity loss contributor, accounting for ${topLoss.hours} hours lost ` +
    `(${topLoss.percent}% of total downtime), primarily impacting ${topLoss.mostAffectedPlant} — ` +
    `${topLoss.affectedDepartment} Department. Targeted elimination of this single loss category represents ` +
    `the highest-impact OEE recovery opportunity available to leadership today.`,

    `Strategic leadership focus is recommended across three priority areas: (1) eliminating mechanical breakdown ` +
    `frequency through predictive maintenance deployment, (2) accelerating setup and changeover efficiency on ` +
    `high-volume production lines via SMED methodology, and (3) stabilising Shift C performance — which consistently ` +
    `underperforms against the enterprise benchmark across all four facilities.`,
  ];
}

// ─── Key Highlights ───────────────────────────────────────────────────────────
export function generateHighlights() {
  const kpis      = mdKPIs;
  const plants    = computePlantHealth();
  const bestPlant = plants[0];
  const topLoss   = operationalLossContributors[0];
  const shifts    = shiftProductivityComparison;
  const bestShift = shifts[0];
  const bsAvg     = ((bestShift.plantA + bestShift.plantB + bestShift.plantC + bestShift.plantD) / 4).toFixed(1);

  return [
    `Enterprise OEE ${kpis.plantOEEAvg.trend > 0 ? 'improved' : 'declined'} by ${Math.abs(kpis.plantOEEAvg.trend)}% vs. prior period — current: ${kpis.plantOEEAvg.value}% (Target: ${KPI_TARGETS.plantOEEAvg.target}%)`,
    `Total operational downtime ${kpis.totalDowntime.trend < 0 ? 'reduced' : 'increased'} by ${Math.abs(kpis.totalDowntime.trend)} hours — recorded at ${kpis.totalDowntime.value}h enterprise-wide`,
    `${topLoss.cause} is the #1 productivity loss: ${topLoss.hours}h lost, ${topLoss.percent}% of all downtime, impacting ${topLoss.mostAffectedPlant}`,
    `${bestPlant.plant} is the top-performing facility at ${bestPlant.oee}% OEE with ${bestPlant.avail}% availability`,
    `${bestShift.shift} is the highest-performing shift across all facilities at an enterprise average of ${bsAvg}% OEE`,
  ];
}

// ─── Recommended Actions ──────────────────────────────────────────────────────
export function generateActions() {
  const plants        = computePlantHealth();
  const criticalPlants= plants.filter(p => p.status === 'critical');
  const top3          = operationalLossContributors.slice(0, 3);

  return [
    {
      priority: 'HIGH',
      area:     top3[0].cause,
      plant:    top3[0].mostAffectedPlant,
      impact:   `${top3[0].hours}h lost — ${top3[0].availabilityImpact} OEE impact`,
      action:   `Deploy predictive maintenance schedule targeting high-frequency breakdown equipment in ${top3[0].affectedDepartment}. Initiate root-cause analysis on ${top3[0].primaryContributor} with 72-hour resolution target.`,
    },
    {
      priority: 'HIGH',
      area:     top3[1].cause,
      plant:    top3[1].mostAffectedPlant,
      impact:   `${top3[1].hours}h lost — ${top3[1].availabilityImpact} OEE impact`,
      action:   `Implement SMED (Single-Minute Exchange of Die) programme on ${top3[1].primaryContributor}. Target 50% changeover time reduction within 30 days. Establish standardised work instructions.`,
    },
    {
      priority: 'HIGH',
      area:     criticalPlants[0] ? `${criticalPlants[0].plant} — OEE Recovery` : top3[2].cause,
      plant:    criticalPlants[0]?.plant || top3[2].mostAffectedPlant,
      impact:   criticalPlants[0]
        ? `${criticalPlants[0].downtime}h downtime — OEE at ${criticalPlants[0].oee}%`
        : `${top3[2].hours}h lost — ${top3[2].availabilityImpact} OEE impact`,
      action:   criticalPlants[0]
        ? `Initiate plant-level OEE recovery programme. Assign dedicated task force. Implement weekly executive review cadence until plant sustains >75% OEE for three consecutive weeks.`
        : `Deploy real-time micro-stoppage monitoring on ${top3[2].primaryContributor}. Set andon alert threshold at 5 stops/shift with supervisor escalation protocol.`,
    },
    {
      priority: 'MEDIUM',
      area:     'Shift C Performance Stabilisation',
      plant:    'All Facilities',
      impact:   'Consistent underperformance vs. enterprise average across all plants and shifts',
      action:   'Conduct shift-level performance review with all Line Heads. Improve shift handover protocols, review night-shift operator engagement programmes, and set shift-specific KPI dashboards.',
    },
  ];
}

// ─── Improvement Opportunities ────────────────────────────────────────────────
export function computeImprovements() {
  let cumulative = 0;
  return operationalLossContributors.map(loss => {
    cumulative += loss.percent;
    return {
      ...loss,
      potentialOEEGain:  parseFloat(loss.availabilityImpact),
      cumulativePercent: cumulative,
    };
  });
}

// ─── Machine Status Summary ───────────────────────────────────────────────────
export function computeMachineStatusSummary() {
  const total = enterpriseMachineStatus.reduce((s, m) => s + m.value, 0);
  return enterpriseMachineStatus.map(s => ({
    status:     s.name,
    count:      s.value,
    percentage: Math.round((s.value / total) * 100),
    total,
  }));
}

// ─── Raw data re-exports ──────────────────────────────────────────────────────
export {
  mdKPIs, plantPerformanceTable, operationalLossContributors,
  oeeTrendData, shiftProductivityComparison, alarmHeatmapData,
};
