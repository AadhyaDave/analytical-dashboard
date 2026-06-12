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
  superAdminKPIs,
  companyPerformanceTable,
  superAdminLossContributors,
  superAdminAttentionItems
} from '../../data/mockData.js';

// Fallback mocks for data that does not exist in mockData.js yet
const plantKPIs = {
  plantOEEAvg: { value: 75.3, unit: '%', trend: -2.1, label: 'Plant OEE' },
  availability: { value: 84.5, unit: '%', trend: -1.5, label: 'Availability' },
  performance: { value: 87.2, unit: '%', trend: +0.4, label: 'Performance' },
  quality: { value: 98.1, unit: '%', trend: +0.1, label: 'Quality' },
  totalDowntime: { value: 142, unit: 'hrs', trend: +14.2, label: 'Downtime' }
};

const deptOEEComparison = [
  { dept: 'Machining', oee: 68.4, availability: 72.1, performance: 78.5, quality: 96.2 },
  { dept: 'Assembly', oee: 84.2, availability: 89.5, performance: 91.2, quality: 99.1 },
  { dept: 'Testing', oee: 82.5, availability: 88.0, performance: 89.4, quality: 98.5 }
];

const hourlyOEETrend = [
  { label: '06:00', oee: 78.5, availability: 86.1, performance: 88.2, quality: 98.4 },
  { label: '10:00', oee: 75.2, availability: 83.5, performance: 86.4, quality: 98.1 },
  { label: '14:00', oee: 71.9, availability: 80.6, performance: 84.4, quality: 97.8 },
  { label: '18:00', oee: 74.2, availability: 82.1, performance: 85.5, quality: 98.2 },
];

const plantAttentionItems = [
  { severity: 'critical', targetLabel: 'Machining downtime spike', message: 'VMC-02 spindle failure' },
  { severity: 'watch', targetLabel: 'Assembly Line 2', message: 'Minor micro-stops increasing' }
];

const sectionKPIs = { ...plantKPIs, plantOEEAvg: { value: 78.1, unit: '%', trend: +1.2, label: 'Section OEE' } };
const sectionOEEComparison = deptOEEComparison.map(d => ({ ...d, dept: d.dept + ' Line' }));

const lineKPIs = { ...plantKPIs, plantOEEAvg: { value: 81.2, unit: '%', trend: +2.4, label: 'Line OEE' } };
const lineOEEComparison = deptOEEComparison.map(d => ({ ...d, dept: d.dept + ' Machine' }));

const machineKPIs = { ...plantKPIs, plantOEEAvg: { value: 85.6, unit: '%', trend: +3.1, label: 'Machine OEE' } };
const machineOEEComparison = deptOEEComparison.map(d => ({ ...d, dept: 'Subsystem ' + d.dept }));

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
export function generateReportMeta(user, role) {
  const now    = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const seq    = String(Math.floor(Math.random() * 900) + 100);
  const timeStr = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true,
  });

  const activeRole = role || user?.role || 'MD';

  return {
    reportId:    `OOI-MFG-${dateStr}-${seq}`,
    version:     '1.0',
    generatedAt: timeStr,
    generatedBy: user?.name || 'System Administrator',
    role:        ROLE_LABELS[activeRole] || 'Managing Director',
    organization:'Opus One Industries',
    platform:    'Opus One Reporting Engine v1',
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

// ─── Super Admin Data Selectors ───────────────────────────────────────────────
export function getSuperAdminReportData() {
  return {
    kpis: Object.entries(superAdminKPIs).map(([key, kpi]) => {
      const spec   = KPI_TARGETS[key] || { target: null, higherIsBetter: true };
      const target = spec.target;
      const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
      const adj    = gap != null ? (spec.higherIsBetter ? gap : -gap) : null;
      const status = adj == null ? 'neutral' : adj >= 0 ? 'good' : adj >= -5 ? 'warning' : 'critical';
      return { key, ...kpi, target, gap, status, higherIsBetter: spec.higherIsBetter };
    }),
    companies: [...companyPerformanceTable].sort((a, b) => b.oee - a.oee).map((c, i) => ({
      ...c, rank: i + 1, rankLabel: `#${i + 1}`, healthLabel: c.status === 'good' ? 'HEALTHY' : c.status === 'warning' ? 'MONITOR' : 'CRITICAL'
    })),
    trends: groupOEETrend,
    losses: superAdminLossContributors,
    actions: superAdminAttentionItems,
  };
}

// ─── Plant Data Selectors ─────────────────────────────────────────────────────
export function getPlantReportProvider(context) {
  const plantName = context?.plant || 'Plant A — Pune';
  
  const productivityComparison = shiftProductivityComparison.map(s => {
      const dept1 = s.plantA;
      const dept2 = s.plantB;
      const dept3 = s.plantC;
      const avg = ((dept1 + dept2 + dept3) / 3).toFixed(1);
      return [s.shift, `${dept1}%`, `${dept2}%`, `${dept3}%`, `${avg}%`];
  });
  
  const alertAnalysis = alarmHeatmapData.map(r => {
      const total = r.W1 + r.W2 + r.W3 + r.W4;
      const trend = r.W4 > r.W1 ? 'Increasing' : r.W4 < r.W1 ? 'Decreasing' : 'Stable';
      return [r.label, r.W1, r.W2, r.W3, r.W4, total, trend];
  });
  
  const improvements = operationalLossContributors.map((l, i) => ({
      ...l,
      availabilityImpact: l.availabilityImpact || `${(-l.hours/10).toFixed(1)}%`,
      potentialOEEGain: l.potentialOEEGain || +(l.hours/15).toFixed(1),
      cumulativePercent: l.cumulativePercent || `${Math.min(100, 20 + i*15)}%`,
      mostAffectedPlant: l.affectedDepartment || l.mostAffectedPlant || 'Machining',
      primaryContributor: l.primaryContributor || 'Unknown'
  }));

  const data = {
    narrative: [
      `Overall OEE for ${plantName} is currently tracking below target at 75.3%, primarily driven by excessive downtime in the Machining department. Immediate intervention is recommended for CNC-01 and VMC-02.`,
      `Quality metrics remain strong across Assembly and Testing, maintaining a 98% first-pass yield. Focus should shift entirely to machine availability to recover the OEE gap before end-of-week.`
    ],
    healthOverview: [...(deptOEEComparison || [])].sort((a, b) => b.oee - a.oee).map((d, i) => ({
      ...d, name: d.dept, rankLabel: `#${i + 1}`, healthLabel: d.oee >= 82 ? 'HEALTHY' : d.oee >= 76 ? 'MONITOR' : 'CRITICAL',
      status: d.oee >= 82 ? 'good' : d.oee >= 76 ? 'warning' : 'critical',
      avail: d.availability,
      perf: d.performance,
      qual: d.quality,
      downtime: 4 // mock
    })),
    highlights: [
      "Assembly Section reached record 99.2% Quality Yield.",
      "Machining downtime increased by 14% vs previous week.",
      "Tooling shortages resolved, reducing micro-stops on Line 2."
    ],
    actions: (plantAttentionItems || []).map(a => ({
        priority: a.severity === 'critical' ? 'HIGH' : 'MEDIUM',
        area: a.targetLabel,
        scope: a.contextData?.deptIdx != null ? deptOEEComparison[a.contextData.deptIdx]?.dept : 'General',
        impact: 'High',
        action: a.message
    })),
    kpis: Object.entries(plantKPIs || {}).map(([key, kpi]) => {
      const spec   = KPI_TARGETS[key] || { target: null, higherIsBetter: true };
      const target = spec.target;
      const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
      const adj    = gap != null ? (spec.higherIsBetter ? gap : -gap) : null;
      const status = adj == null ? 'neutral' : adj >= 0 ? 'good' : adj >= -5 ? 'warning' : 'critical';
      return { key, label: kpi.label || key, ...kpi, target, gap, status, higherIsBetter: spec.higherIsBetter };
    }),
    trendData: hourlyOEETrend || [],
    productivityComparison,
    alertAnalysis,
    improvements
  };

  const config = {
    documentTitle: 'PLANT INTELLIGENCE REPORT',
    reportTitle: 'Plant Operational Intelligence Report',
    reportSubtitle: 'Facility Review — Comprehensive Analysis',
    entityName: plantName,
    childEntityLabel: 'Department',
    page2_1_Title: '1.  PLANT KPI DASHBOARD — PERFORMANCE VS. TARGET',
    page2_2_Title: '2.  DEPARTMENT PERFORMANCE RANKING',
    page2_3_Title: '3.  DEPARTMENT HEALTH MATRIX',
    page3_4_Title: '4.  OEE TREND ANALYSIS — 24 HOUR',
    page3_5_Title: '5.  SHIFT PRODUCTIVITY INTELLIGENCE',
    page3_6_Title: '6.  ANDON ALERT FREQUENCY ANALYSIS',
    page4_7_Title: '7.  DOWNTIME PARETO ANALYSIS — PRODUCTIVITY LOSS CONTRIBUTORS',
    page4_8_Title: '8.  TOP IMPROVEMENT OPPORTUNITIES — ESTIMATED OEE RECOVERY POTENTIAL',
    page4_9_Title: '9.  EXECUTIVE ACTION TRACKER — PRIORITY MATRIX',
    filenamePrefix: 'Plant_Intelligence_Report',
    rankingTableColumns: ['Rank', 'Department', 'OEE %', 'Avail %', 'Perf %', 'Quality %', 'Downtime', 'Status'],
    healthMatrixColumns: ['Department', 'OEE Status', 'Availability Status', 'Overall Health', 'Recommended Action'],
    productivityColumns: ['Shift', 'Department 1', 'Department 2', 'Department 3', 'Enterprise Avg'],
    alertAnalysisColumns: ['Department', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total', 'Alert Trend'],
    improvementColumns: ['#', 'Loss Category', 'Hours Lost', 'OEE Impact', 'Potential Recovery', 'Cum. %', 'Primary Location'],
    actionTrackerColumns: ['Priority', 'Focus Area', 'Scope', 'Business Impact', 'Recommended Action']
  };

  return { config, data };
}

// ─── Department Data Selectors ────────────────────────────────────────────────
export function getDepartmentReportProvider(context) {
  const deptName = context?.dept || 'Machining Department';
  
  const productivityComparison = shiftProductivityComparison.map(s => {
      return [s.shift, `${s.plantA}%`, `${s.plantB}%`, `${s.plantC}%`, `${s.plantD}%`];
  });
  
  const alertAnalysis = alarmHeatmapData.map(r => {
      const total = r.W1 + r.W2 + r.W3 + r.W4;
      const trend = r.W4 > r.W1 ? 'Increasing' : r.W4 < r.W1 ? 'Decreasing' : 'Stable';
      return [r.label, r.W1, r.W2, r.W3, r.W4, total, trend];
  });
  
  const improvements = operationalLossContributors.map((l, i) => ({
      ...l,
      availabilityImpact: l.availabilityImpact || `${(-l.hours/10).toFixed(1)}%`,
      potentialOEEGain: l.potentialOEEGain || +(l.hours/15).toFixed(1),
      cumulativePercent: l.cumulativePercent || `${Math.min(100, 20 + i*15)}%`,
      mostAffectedPlant: l.affectedDepartment || l.mostAffectedPlant || 'CNC Section',
      primaryContributor: l.primaryContributor || 'Unknown'
  }));

  const data = {
    narrative: [
      `Overall OEE for ${deptName} is currently tracking below target at 75.3%, primarily driven by excessive downtime in the CNC Section. Immediate intervention is recommended for CNC-01 and VMC-02.`,
      `Quality metrics remain strong across all sections, maintaining a 98% first-pass yield. Focus should shift entirely to machine availability to recover the OEE gap before end-of-week.`
    ],
    healthOverview: [...(deptOEEComparison || [])].sort((a, b) => b.oee - a.oee).map((d, i) => ({
      ...d, name: `Section ${i+1}`, rankLabel: `#${i + 1}`, healthLabel: d.oee >= 82 ? 'HEALTHY' : d.oee >= 76 ? 'MONITOR' : 'CRITICAL',
      status: d.oee >= 82 ? 'good' : d.oee >= 76 ? 'warning' : 'critical',
      avail: d.availability,
      perf: d.performance,
      qual: d.quality,
      downtime: 4
    })),
    highlights: [
      "Milling Section reached record 99.2% Quality Yield.",
      "CNC Section downtime increased by 14% vs previous week.",
      "Tooling shortages resolved, reducing micro-stops on Line 2."
    ],
    actions: (plantAttentionItems || []).map(a => ({
        priority: a.severity === 'critical' ? 'HIGH' : 'MEDIUM',
        area: a.targetLabel,
        scope: 'Section Level',
        impact: 'High',
        action: a.message
    })),
    kpis: Object.entries(plantKPIs || {}).map(([key, kpi]) => {
      const spec   = KPI_TARGETS[key] || { target: null, higherIsBetter: true };
      const target = spec.target;
      const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
      const adj    = gap != null ? (spec.higherIsBetter ? gap : -gap) : null;
      const status = adj == null ? 'neutral' : adj >= 0 ? 'good' : adj >= -5 ? 'warning' : 'critical';
      return { key, label: kpi.label || key, ...kpi, target, gap, status, higherIsBetter: spec.higherIsBetter };
    }),
    trendData: hourlyOEETrend || [],
    productivityComparison,
    alertAnalysis,
    improvements
  };

  const config = {
    documentTitle: 'DEPARTMENT INTELLIGENCE REPORT',
    reportTitle: 'Department Operational Intelligence Report',
    reportSubtitle: 'Department Review — Comprehensive Analysis',
    entityName: deptName,
    childEntityLabel: 'Section',
    page2_1_Title: '1.  DEPARTMENT KPI DASHBOARD — PERFORMANCE VS. TARGET',
    page2_2_Title: '2.  SECTION PERFORMANCE RANKING',
    page2_3_Title: '3.  SECTION HEALTH MATRIX',
    page3_4_Title: '4.  OEE TREND ANALYSIS — 24 HOUR',
    page3_5_Title: '5.  SHIFT PRODUCTIVITY INTELLIGENCE',
    page3_6_Title: '6.  ANDON ALERT FREQUENCY ANALYSIS',
    page4_7_Title: '7.  DOWNTIME PARETO ANALYSIS — PRODUCTIVITY LOSS CONTRIBUTORS',
    page4_8_Title: '8.  TOP IMPROVEMENT OPPORTUNITIES — ESTIMATED OEE RECOVERY POTENTIAL',
    page4_9_Title: '9.  EXECUTIVE ACTION TRACKER — PRIORITY MATRIX',
    filenamePrefix: 'Department_Intelligence_Report',
    rankingTableColumns: ['Rank', 'Section', 'OEE %', 'Avail %', 'Perf %', 'Quality %', 'Downtime', 'Status'],
    healthMatrixColumns: ['Section', 'OEE Status', 'Availability Status', 'Overall Health', 'Recommended Action'],
    productivityColumns: ['Shift', 'Section 1', 'Section 2', 'Section 3', 'Enterprise Avg'],
    alertAnalysisColumns: ['Section', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total', 'Alert Trend'],
    improvementColumns: ['#', 'Loss Category', 'Hours Lost', 'OEE Impact', 'Potential Recovery', 'Cum. %', 'Primary Location'],
    actionTrackerColumns: ['Priority', 'Focus Area', 'Scope', 'Business Impact', 'Recommended Action']
  };

  return { config, data };
}

// ─── Section Data Selectors ────────────────────────────────────────────────
export function getSectionReportProvider(context) {
  const sectionName = context?.section || 'CNC Section';
  
  const productivityComparison = shiftProductivityComparison.map(s => {
      return [s.shift, `${s.plantA}%`, `${s.plantB}%`, `${s.plantC}%`, `${s.plantD}%`];
  });
  
  const alertAnalysis = alarmHeatmapData.map(r => {
      const total = r.W1 + r.W2 + r.W3 + r.W4;
      const trend = r.W4 > r.W1 ? 'Increasing' : r.W4 < r.W1 ? 'Decreasing' : 'Stable';
      return [r.label, r.W1, r.W2, r.W3, r.W4, total, trend];
  });
  
  const improvements = operationalLossContributors.map((l, i) => ({
      ...l,
      availabilityImpact: l.availabilityImpact || `${(-l.hours/10).toFixed(1)}%`,
      potentialOEEGain: l.potentialOEEGain || +(l.hours/15).toFixed(1),
      cumulativePercent: l.cumulativePercent || `${Math.min(100, 20 + i*15)}%`,
      mostAffectedPlant: l.affectedDepartment || l.mostAffectedPlant || 'Line 1',
      primaryContributor: l.primaryContributor || 'Unknown'
  }));

  const data = {
    narrative: [
      `Overall OEE for ${sectionName} is currently tracking below target at 75.3%, primarily driven by excessive downtime in Line 1. Immediate intervention is recommended for CNC-01 and VMC-02.`,
      `Quality metrics remain strong across all lines, maintaining a 98% first-pass yield. Focus should shift entirely to machine availability to recover the OEE gap before end-of-week.`
    ],
    healthOverview: [...(deptOEEComparison || [])].sort((a, b) => b.oee - a.oee).map((d, i) => ({
      ...d, name: `Line ${i+1}`, rankLabel: `#${i + 1}`, healthLabel: d.oee >= 82 ? 'HEALTHY' : d.oee >= 76 ? 'MONITOR' : 'CRITICAL',
      status: d.oee >= 82 ? 'good' : d.oee >= 76 ? 'warning' : 'critical',
      avail: d.availability,
      perf: d.performance,
      qual: d.quality,
      downtime: 4
    })),
    highlights: [
      "Line 2 reached record 99.2% Quality Yield.",
      "Line 1 downtime increased by 14% vs previous week.",
      "Tooling shortages resolved, reducing micro-stops on Line 2."
    ],
    actions: (plantAttentionItems || []).map(a => ({
        priority: a.severity === 'critical' ? 'HIGH' : 'MEDIUM',
        area: a.targetLabel,
        scope: 'Line Level',
        impact: 'High',
        action: a.message
    })),
    kpis: Object.entries(plantKPIs || {}).map(([key, kpi]) => {
      const spec   = KPI_TARGETS[key] || { target: null, higherIsBetter: true };
      const target = spec.target;
      const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
      const adj    = gap != null ? (spec.higherIsBetter ? gap : -gap) : null;
      const status = adj == null ? 'neutral' : adj >= 0 ? 'good' : adj >= -5 ? 'warning' : 'critical';
      return { key, label: kpi.label || key, ...kpi, target, gap, status, higherIsBetter: spec.higherIsBetter };
    }),
    trendData: hourlyOEETrend || [],
    productivityComparison,
    alertAnalysis,
    improvements
  };

  const config = {
    documentTitle: 'SECTION INTELLIGENCE REPORT',
    reportTitle: 'Section Operational Intelligence Report',
    reportSubtitle: 'Section Review — Comprehensive Analysis',
    entityName: sectionName,
    childEntityLabel: 'Line',
    page2_1_Title: '1.  SECTION KPI DASHBOARD — PERFORMANCE VS. TARGET',
    page2_2_Title: '2.  LINE PERFORMANCE RANKING',
    page2_3_Title: '3.  LINE HEALTH MATRIX',
    page3_4_Title: '4.  OEE TREND ANALYSIS — 24 HOUR',
    page3_5_Title: '5.  SHIFT PRODUCTIVITY INTELLIGENCE',
    page3_6_Title: '6.  ANDON ALERT FREQUENCY ANALYSIS',
    page4_7_Title: '7.  DOWNTIME PARETO ANALYSIS — PRODUCTIVITY LOSS CONTRIBUTORS',
    page4_8_Title: '8.  TOP IMPROVEMENT OPPORTUNITIES — ESTIMATED OEE RECOVERY POTENTIAL',
    page4_9_Title: '9.  EXECUTIVE ACTION TRACKER — PRIORITY MATRIX',
    filenamePrefix: 'Section_Intelligence_Report',
    rankingTableColumns: ['Rank', 'Line', 'OEE %', 'Avail %', 'Perf %', 'Quality %', 'Downtime', 'Status'],
    healthMatrixColumns: ['Line', 'OEE Status', 'Availability Status', 'Overall Health', 'Recommended Action'],
    productivityColumns: ['Shift', 'Line 1', 'Line 2', 'Line 3', 'Enterprise Avg'],
    alertAnalysisColumns: ['Line', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total', 'Alert Trend'],
    improvementColumns: ['#', 'Loss Category', 'Hours Lost', 'OEE Impact', 'Potential Recovery', 'Cum. %', 'Primary Location'],
    actionTrackerColumns: ['Priority', 'Focus Area', 'Scope', 'Business Impact', 'Recommended Action']
  };

  return { config, data };
}

// ─── Line Data Selectors ────────────────────────────────────────────────
export function getLineReportProvider(context) {
  const lineName = context?.line || 'Line 1';
  
  const productivityComparison = shiftProductivityComparison.map(s => {
      return [s.shift, `${s.plantA}%`, `${s.plantB}%`, `${s.plantC}%`, `${s.plantD}%`];
  });
  
  const alertAnalysis = alarmHeatmapData.map(r => {
      const total = r.W1 + r.W2 + r.W3 + r.W4;
      const trend = r.W4 > r.W1 ? 'Increasing' : r.W4 < r.W1 ? 'Decreasing' : 'Stable';
      return [r.label, r.W1, r.W2, r.W3, r.W4, total, trend];
  });
  
  const improvements = operationalLossContributors.map((l, i) => ({
      ...l,
      availabilityImpact: l.availabilityImpact || `${(-l.hours/10).toFixed(1)}%`,
      potentialOEEGain: l.potentialOEEGain || +(l.hours/15).toFixed(1),
      cumulativePercent: l.cumulativePercent || `${Math.min(100, 20 + i*15)}%`,
      mostAffectedPlant: l.affectedDepartment || l.mostAffectedPlant || 'Machine 1',
      primaryContributor: l.primaryContributor || 'Unknown'
  }));

  const data = {
    narrative: [
      `Overall OEE for ${lineName} is currently tracking below target at 75.3%, primarily driven by excessive downtime in Machine 1. Immediate intervention is recommended.`,
      `Quality metrics remain strong across all machines, maintaining a 98% first-pass yield. Focus should shift entirely to machine availability to recover the OEE gap before end-of-week.`
    ],
    healthOverview: [...(deptOEEComparison || [])].sort((a, b) => b.oee - a.oee).map((d, i) => ({
      ...d, name: `Machine ${i+1}`, rankLabel: `#${i + 1}`, healthLabel: d.oee >= 82 ? 'HEALTHY' : d.oee >= 76 ? 'MONITOR' : 'CRITICAL',
      status: d.oee >= 82 ? 'good' : d.oee >= 76 ? 'warning' : 'critical',
      avail: d.availability,
      perf: d.performance,
      qual: d.quality,
      downtime: 4
    })),
    highlights: [
      "Machine 2 reached record 99.2% Quality Yield.",
      "Machine 1 downtime increased by 14% vs previous week.",
      "Tooling shortages resolved, reducing micro-stops on Machine 2."
    ],
    actions: (plantAttentionItems || []).map(a => ({
        priority: a.severity === 'critical' ? 'HIGH' : 'MEDIUM',
        area: a.targetLabel,
        scope: 'Machine Level',
        impact: 'High',
        action: a.message
    })),
    kpis: Object.entries(plantKPIs || {}).map(([key, kpi]) => {
      const spec   = KPI_TARGETS[key] || { target: null, higherIsBetter: true };
      const target = spec.target;
      const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
      const adj    = gap != null ? (spec.higherIsBetter ? gap : -gap) : null;
      const status = adj == null ? 'neutral' : adj >= 0 ? 'good' : adj >= -5 ? 'warning' : 'critical';
      return { key, label: kpi.label || key, ...kpi, target, gap, status, higherIsBetter: spec.higherIsBetter };
    }),
    trendData: hourlyOEETrend || [],
    productivityComparison,
    alertAnalysis,
    improvements
  };

  const config = {
    documentTitle: 'LINE INTELLIGENCE REPORT',
    reportTitle: 'Line Operational Intelligence Report',
    reportSubtitle: 'Line Review — Comprehensive Analysis',
    entityName: lineName,
    childEntityLabel: 'Machine',
    page2_1_Title: '1.  LINE KPI DASHBOARD — PERFORMANCE VS. TARGET',
    page2_2_Title: '2.  MACHINE PERFORMANCE RANKING',
    page2_3_Title: '3.  MACHINE HEALTH MATRIX',
    page3_4_Title: '4.  OEE TREND ANALYSIS — 24 HOUR',
    page3_5_Title: '5.  SHIFT PRODUCTIVITY INTELLIGENCE',
    page3_6_Title: '6.  ANDON ALERT FREQUENCY ANALYSIS',
    page4_7_Title: '7.  DOWNTIME PARETO ANALYSIS — PRODUCTIVITY LOSS CONTRIBUTORS',
    page4_8_Title: '8.  TOP IMPROVEMENT OPPORTUNITIES — ESTIMATED OEE RECOVERY POTENTIAL',
    page4_9_Title: '9.  EXECUTIVE ACTION TRACKER — PRIORITY MATRIX',
    filenamePrefix: 'Line_Intelligence_Report',
    rankingTableColumns: ['Rank', 'Machine', 'OEE %', 'Avail %', 'Perf %', 'Quality %', 'Downtime', 'Status'],
    healthMatrixColumns: ['Machine', 'OEE Status', 'Availability Status', 'Overall Health', 'Recommended Action'],
    productivityColumns: ['Shift', 'Machine 1', 'Machine 2', 'Machine 3', 'Enterprise Avg'],
    alertAnalysisColumns: ['Machine', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total', 'Alert Trend'],
    improvementColumns: ['#', 'Loss Category', 'Hours Lost', 'OEE Impact', 'Potential Recovery', 'Cum. %', 'Primary Location'],
    actionTrackerColumns: ['Priority', 'Focus Area', 'Scope', 'Business Impact', 'Recommended Action']
  };

  return { config, data };
}

// ─── Machine Data Selectors ────────────────────────────────────────────────
export function getMachineReportProvider(context) {
  const machineName = context?.machine || 'CNC-01';
  
  const productivityComparison = shiftProductivityComparison.map(s => {
      return [s.shift, `${s.plantA}%`, `${s.plantB}%`, `${s.plantC}%`, `${s.plantD}%`];
  });
  
  const alertAnalysis = alarmHeatmapData.map(r => {
      const total = r.W1 + r.W2 + r.W3 + r.W4;
      const trend = r.W4 > r.W1 ? 'Increasing' : r.W4 < r.W1 ? 'Decreasing' : 'Stable';
      return [r.label, r.W1, r.W2, r.W3, r.W4, total, trend];
  });
  
  const improvements = operationalLossContributors.map((l, i) => ({
      ...l,
      availabilityImpact: l.availabilityImpact || `${(-l.hours/10).toFixed(1)}%`,
      potentialOEEGain: l.potentialOEEGain || +(l.hours/15).toFixed(1),
      cumulativePercent: l.cumulativePercent || `${Math.min(100, 20 + i*15)}%`,
      mostAffectedPlant: l.affectedDepartment || l.mostAffectedPlant || 'Spindle System',
      primaryContributor: l.primaryContributor || 'Unknown'
  }));

  const data = {
    narrative: [
      `Overall OEE for ${machineName} is currently tracking below target at 75.3%, primarily driven by excessive downtime in the Spindle System. Immediate intervention is recommended.`,
      `Quality metrics remain strong, maintaining a 98% first-pass yield. Focus should shift entirely to machine availability to recover the OEE gap before end-of-week.`
    ],
    healthOverview: [...(deptOEEComparison || [])].sort((a, b) => b.oee - a.oee).map((d, i) => ({
      ...d, name: `Subsystem ${i+1}`, rankLabel: `#${i + 1}`, healthLabel: d.oee >= 82 ? 'HEALTHY' : d.oee >= 76 ? 'MONITOR' : 'CRITICAL',
      status: d.oee >= 82 ? 'good' : d.oee >= 76 ? 'warning' : 'critical',
      avail: d.availability,
      perf: d.performance,
      qual: d.quality,
      downtime: 4
    })),
    highlights: [
      "Tooling Subsystem reached record 99.2% Quality Yield.",
      "Spindle Subsystem downtime increased by 14% vs previous week.",
      "Tooling shortages resolved, reducing micro-stops."
    ],
    actions: (plantAttentionItems || []).map(a => ({
        priority: a.severity === 'critical' ? 'HIGH' : 'MEDIUM',
        area: a.targetLabel,
        scope: 'Subsystem Level',
        impact: 'High',
        action: a.message
    })),
    kpis: Object.entries(plantKPIs || {}).map(([key, kpi]) => {
      const spec   = KPI_TARGETS[key] || { target: null, higherIsBetter: true };
      const target = spec.target;
      const gap    = target != null ? +(kpi.value - target).toFixed(1) : null;
      const adj    = gap != null ? (spec.higherIsBetter ? gap : -gap) : null;
      const status = adj == null ? 'neutral' : adj >= 0 ? 'good' : adj >= -5 ? 'warning' : 'critical';
      return { key, label: kpi.label || key, ...kpi, target, gap, status, higherIsBetter: spec.higherIsBetter };
    }),
    trendData: hourlyOEETrend || [],
    productivityComparison,
    alertAnalysis,
    improvements
  };

  const config = {
    documentTitle: 'MACHINE INTELLIGENCE REPORT',
    reportTitle: 'Machine Operational Intelligence Report',
    reportSubtitle: 'Machine Review — Comprehensive Analysis',
    entityName: machineName,
    childEntityLabel: 'Subsystem',
    page2_1_Title: '1.  MACHINE KPI DASHBOARD — PERFORMANCE VS. TARGET',
    page2_2_Title: '2.  SUBSYSTEM PERFORMANCE RANKING',
    page2_3_Title: '3.  SUBSYSTEM HEALTH MATRIX',
    page3_4_Title: '4.  OEE TREND ANALYSIS — 24 HOUR',
    page3_5_Title: '5.  SHIFT PRODUCTIVITY INTELLIGENCE',
    page3_6_Title: '6.  ANDON ALERT FREQUENCY ANALYSIS',
    page4_7_Title: '7.  DOWNTIME PARETO ANALYSIS — PRODUCTIVITY LOSS CONTRIBUTORS',
    page4_8_Title: '8.  TOP IMPROVEMENT OPPORTUNITIES — ESTIMATED OEE RECOVERY POTENTIAL',
    page4_9_Title: '9.  EXECUTIVE ACTION TRACKER — PRIORITY MATRIX',
    filenamePrefix: 'Machine_Intelligence_Report',
    rankingTableColumns: ['Rank', 'Subsystem', 'OEE %', 'Avail %', 'Perf %', 'Quality %', 'Downtime', 'Status'],
    healthMatrixColumns: ['Subsystem', 'OEE Status', 'Availability Status', 'Overall Health', 'Recommended Action'],
    productivityColumns: ['Shift', 'Subsystem 1', 'Subsystem 2', 'Subsystem 3', 'Enterprise Avg'],
    alertAnalysisColumns: ['Subsystem', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total', 'Alert Trend'],
    improvementColumns: ['#', 'Loss Category', 'Hours Lost', 'OEE Impact', 'Potential Recovery', 'Cum. %', 'Primary Location'],
    actionTrackerColumns: ['Priority', 'Focus Area', 'Scope', 'Business Impact', 'Recommended Action']
  };

  return { config, data };
}
