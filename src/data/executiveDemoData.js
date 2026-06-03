// ============================================================
// EXECUTIVE DEMO DATA (Richer, High-Stakes Version)
// ============================================================

export const mdKPIs = {
  plantOEEAvg: { value: 84.2, unit: '%', trend: +3.4, label: 'Enterprise OEE Avg' },
  availability: { value: 92.1, unit: '%', trend: +1.5, label: 'Availability' },
  performance: { value: 94.6, unit: '%', trend: +2.8, label: 'Performance' },
  quality: { value: 98.7, unit: '%', trend: +0.6, label: 'Quality' },
  totalDowntime: { value: 840, unit: 'hrs', trend: -42.5, label: 'Total Downtime' }, // Huge numbers for executive scale
};

export const enterpriseMachineStatus = [
  { name: 'Running', value: 450, color: 'var(--green)' },
  { name: 'Idle', value: 45, color: 'var(--amber)' },
  { name: 'No Plan', value: 12, color: 'var(--text-muted)' },
  { name: 'Breakdown', value: 8, color: 'var(--red)' },
];

export const plantMachineStatus = {
  0: [
    { name: 'Running', value: 180, color: 'var(--green)' },
    { name: 'Idle', value: 15, color: 'var(--amber)' },
    { name: 'No Plan', value: 4, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 2, color: 'var(--red)' },
  ],
  1: [
    { name: 'Running', value: 120, color: 'var(--green)' },
    { name: 'Idle', value: 12, color: 'var(--amber)' },
    { name: 'No Plan', value: 2, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 3, color: 'var(--red)' },
  ],
  2: [
    { name: 'Running', value: 90, color: 'var(--green)' },
    { name: 'Idle', value: 10, color: 'var(--amber)' },
    { name: 'No Plan', value: 5, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 2, color: 'var(--red)' },
  ],
  3: [
    { name: 'Running', value: 60, color: 'var(--green)' },
    { name: 'Idle', value: 8, color: 'var(--amber)' },
    { name: 'No Plan', value: 1, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 1, color: 'var(--red)' },
  ],
};

export const plantOEETrend = {
  0: [
    { label: '06:00', oee: 88.5, availability: 94.1, performance: 95.2, quality: 98.4 },
    { label: '10:00', oee: 89.2, availability: 95.5, performance: 96.4, quality: 98.6 },
    { label: '14:00', oee: 91.0, availability: 96.2, performance: 97.8, quality: 99.1 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  1: [
    { label: '06:00', oee: 82.1, availability: 91.2, performance: 92.0, quality: 97.8 },
    { label: '10:00', oee: 81.8, availability: 90.5, performance: 91.2, quality: 97.9 },
    { label: '14:00', oee: 83.2, availability: 92.4, performance: 93.6, quality: 98.2 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  2: [
    { label: '06:00', oee: 79.4, availability: 89.5, performance: 91.0, quality: 97.5 },
    { label: '10:00', oee: 76.8, availability: 86.8, performance: 89.5, quality: 97.1 },
    { label: '14:00', oee: 78.9, availability: 88.1, performance: 90.2, quality: 97.6 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  3: [
    { label: '06:00', oee: 85.5, availability: 92.6, performance: 93.5, quality: 98.2 },
    { label: '10:00', oee: 87.2, availability: 94.2, performance: 95.8, quality: 98.5 },
    { label: '14:00', oee: 86.8, availability: 93.8, performance: 94.2, quality: 98.3 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
};

export const topPerformingMachines = {
  0: [
    { name: 'MEGA-CNC-01', oee: 98.4, status: 'running' },
    { name: 'AUTO-ASSY-3', oee: 97.8, status: 'running' },
    { name: 'ROBO-WELD-2', oee: 96.5, status: 'running' },
  ],
  1: [
    { name: 'HYD-PRESS-A', oee: 95.6, status: 'running' },
    { name: 'CNC-FLEX-05', oee: 94.4, status: 'running' },
    { name: 'VMC-PRO-01', oee: 93.9, status: 'running' },
  ],
  2: [
    { name: 'TURNING-C5', oee: 91.2, status: 'running' },
    { name: 'MILLING-X11', oee: 90.8, status: 'running' },
    { name: 'GRIND-02', oee: 89.1, status: 'running' },
  ],
  3: [
    { name: 'PACK-LINE-MAX', oee: 96.3, status: 'running' },
    { name: 'SORTING-SYS', oee: 95.5, status: 'running' },
    { name: 'PRESS-PRO-04', oee: 94.7, status: 'running' },
  ],
};

export const shiftProductivityComparison = [
  { shift: 'Shift 1', plantA: 96, plantB: 92, plantC: 86, plantD: 94 },
  { shift: 'Shift 2', plantA: 94, plantB: 89, plantC: 82, plantD: 91 },
  { shift: 'Shift 3', plantA: 89, plantB: 85, plantC: 78, plantD: 87 },
];

export const plantPerformanceTable = [
  { plant: 'Plant A — North America', oee: 89.8, avail: 95.2, perf: 96.8, qual: 99.2, downtime: 140, machines: 201, production: 45000, status: 'good' },
  { plant: 'Plant B — Europe Hub', oee: 82.5, avail: 90.4, perf: 92.6, qual: 98.5, downtime: 280, machines: 137, production: 32500, status: 'warning' },
  { plant: 'Plant C — APAC East', oee: 78.4, avail: 88.1, perf: 90.2, qual: 97.9, downtime: 310, machines: 107, production: 28900, status: 'critical' },
  { plant: 'Plant D — LatAm South', oee: 86.1, avail: 93.8, perf: 94.2, qual: 98.9, downtime: 190, machines: 70, production: 18450, status: 'good' },
];

export const executiveAttentionItems = [
  {
    id: 1,
    severity: 'critical',
    message: 'APAC East supply chain delay impacting Machine Availability across 3 lines. Projected $1.2M revenue risk.',
    targetLabel: 'Plant C\nAPAC East',
    contextData: { plantIdx: 2 }
  },
  {
    id: 2,
    severity: 'watch',
    message: 'Europe Hub energy consumption spiked 15% during Shift 3. Predictive models flag HVAC inefficiency.',
    targetLabel: 'Plant B\nEurope Hub',
    contextData: { plantIdx: 1 }
  },
  {
    id: 3,
    severity: 'critical',
    message: 'Repeated micro-stoppages detected on Auto-Assy-1 during Shift 2. Root cause: Material jam.',
    targetLabel: 'Plant A\nNorth America',
    contextData: { plantIdx: 0 }
  },
];

export const operationalLossContributors = [
  {
    cause: 'Supply Chain Delay (Raw Material)', hours: 240, percent: 34, category: 'Availability',
    mostAffectedPlant: 'Plant C', affectedDepartment: 'Assembly',
    availabilityImpact: '14%', primaryContributor: 'Line 4',
    contextData: { plantIdx: 2, deptIdx: 0, sectionIdx: 0, lineIdx: 3 }
  },
  {
    cause: 'Tooling Calibration Errors', hours: 160, percent: 23, category: 'Quality',
    mostAffectedPlant: 'Plant B', affectedDepartment: 'Machining',
    availabilityImpact: '9%', primaryContributor: 'Line 2',
    contextData: { plantIdx: 1, deptIdx: 1, sectionIdx: 0, lineIdx: 1 }
  },
];
