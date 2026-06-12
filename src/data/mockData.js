// ============================================================
// OPUS ONE ANALYTICAL DASHBOARD — OEE Intelligence Data v3.0
// ============================================================

export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  MD: 'Managing Director',
  PLANT_HEAD: 'Plant Head',
  DEPT_HEAD: 'Department Head',
  SECTION_HEAD: 'Section Head',
  LINE_HEAD: 'Line Head',
};

export const users = [
  { id: 0, name: 'Super Admin', role: 'SUPER_ADMIN', avatar: 'SA', email: 'admin@opusone.in', plant: 'Global Administrator' },
  { id: 1, name: 'Rajiv Mehta', role: 'MD', avatar: 'RM', email: 'r.mehta@opusone.in', plant: 'Corporate HQ' },
  { id: 2, name: 'Sunita Patel', role: 'PLANT_HEAD', avatar: 'SP', email: 's.patel@opusone.in', plant: 'Plant A — Pune' },
  { id: 3, name: 'Arvind Kumar', role: 'DEPT_HEAD', avatar: 'AK', email: 'a.kumar@opusone.in', plant: 'Plant A — Pune', dept: 'Machining' },
  { id: 4, name: 'Priya Sharma', role: 'SECTION_HEAD', avatar: 'PS', email: 'p.sharma@opusone.in', plant: 'Plant A — Pune', dept: 'Machining', section: 'CNC Section' },
  { id: 5, name: 'Ravi Nair', role: 'LINE_HEAD', avatar: 'RN', email: 'r.nair@opusone.in', plant: 'Plant A — Pune', dept: 'Machining', section: 'CNC Section', line: 'Line-01' },
];

// ============================================================
// SUPER ADMIN DASHBOARD DATA
// ============================================================

export const superAdminKPIs = {
  groupOEEAvg: { value: 75.4, unit: '%', trend: +0.8, label: 'Group OEE Avg' },
  availability: { value: 86.2, unit: '%', trend: +1.1, label: 'Availability' },
  performance: { value: 88.5, unit: '%', trend: +0.5, label: 'Performance' },
  quality: { value: 96.8, unit: '%', trend: +0.2, label: 'Quality' },
  totalDowntime: { value: 340, unit: 'hrs', trend: -12.5, label: 'Total Downtime' },
};

export const groupMachineStatus = [
  { name: 'Running', value: 350, color: 'var(--green)' },
  { name: 'Idle', value: 65, color: 'var(--amber)' },
  { name: 'No Plan', value: 30, color: 'var(--text-muted)' },
  { name: 'Breakdown', value: 15, color: 'var(--red)' },
];

export const groupCompanyStatus = [
  { name: 'Stable', value: 2, color: 'var(--green)' },
  { name: 'Needs Attention', value: 1, color: 'var(--amber)' },
  { name: 'Critical', value: 1, color: 'var(--red)' },
];

export const companyPerformanceTable = [
  { company: 'Company A', location: 'India', oee: 76.9, avail: 88.6, perf: 89.4, qual: 97.1, downtime: 122, status: 'good' },
  { company: 'Company B', location: 'Germany', oee: 71.2, avail: 84.5, perf: 86.1, qual: 95.8, downtime: 160, status: 'warning' },
  { company: 'Company C', location: 'USA', oee: 65.8, avail: 80.2, perf: 82.5, qual: 93.4, downtime: 210, status: 'critical' },
  { company: 'Company D', location: 'Japan', oee: 82.4, avail: 92.1, perf: 93.5, qual: 98.2, downtime: 85, status: 'good' },
];

export const groupOEETrend = {
  0: [
    { label: '06:00', oee: 75.5, availability: 88.1, performance: 88.2, quality: 96.4 },
    { label: '10:00', oee: 76.2, availability: 89.5, performance: 89.4, quality: 96.6 },
    { label: '14:00', oee: 76.9, availability: 88.6, performance: 89.4, quality: 97.1 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  1: [
    { label: '06:00', oee: 70.1, availability: 83.2, performance: 85.0, quality: 95.1 },
    { label: '10:00', oee: 71.8, availability: 84.5, performance: 86.2, quality: 95.8 },
    { label: '14:00', oee: 71.2, availability: 84.5, performance: 86.1, quality: 95.8 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  2: [
    { label: '06:00', oee: 64.4, availability: 79.5, performance: 81.0, quality: 92.5 },
    { label: '10:00', oee: 63.8, availability: 78.8, performance: 80.5, quality: 92.1 },
    { label: '14:00', oee: 65.8, availability: 80.2, performance: 82.5, quality: 93.4 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  3: [
    { label: '06:00', oee: 81.5, availability: 91.6, performance: 92.5, quality: 98.0 },
    { label: '10:00', oee: 82.2, availability: 92.2, performance: 93.8, quality: 98.2 },
    { label: '14:00', oee: 82.4, availability: 92.1, performance: 93.5, quality: 98.2 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
};

export const companyMachineStatus = {
  0: [
    { name: 'Running', value: 112, color: 'var(--green)' },
    { name: 'Idle', value: 18, color: 'var(--amber)' },
    { name: 'No Plan', value: 9, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 5, color: 'var(--red)' },
  ],
  1: [
    { name: 'Running', value: 85, color: 'var(--green)' },
    { name: 'Idle', value: 20, color: 'var(--amber)' },
    { name: 'No Plan', value: 15, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 8, color: 'var(--red)' },
  ],
  2: [
    { name: 'Running', value: 45, color: 'var(--green)' },
    { name: 'Idle', value: 30, color: 'var(--amber)' },
    { name: 'No Plan', value: 10, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 15, color: 'var(--red)' },
  ],
  3: [
    { name: 'Running', value: 140, color: 'var(--green)' },
    { name: 'Idle', value: 10, color: 'var(--amber)' },
    { name: 'No Plan', value: 5, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 2, color: 'var(--red)' },
  ],
};

export const topPerformingCompanies = {
  0: [{ name: 'Plant A — Pune', oee: 81.0, status: 'running' }],
  1: [{ name: 'Berlin Factory', oee: 75.5, status: 'running' }],
  2: [{ name: 'Texas Hub', oee: 68.2, status: 'running' }],
  3: [{ name: 'Tokyo Main', oee: 85.1, status: 'running' }],
};

export const superAdminAttentionItems = [
  {
    id: 1,
    severity: 'critical',
    message: 'Company C operating 12% below group target OEE',
    targetLabel: 'Company C',
    contextData: { companyIdx: 2 }
  },
  {
    id: 2,
    severity: 'watch',
    message: 'Company B showing consecutive performance drops',
    targetLabel: 'Company B',
    contextData: { companyIdx: 1 }
  }
];

export const superAdminLossContributors = [
  {
    cause: 'Supply Chain Delay', hours: 140, percent: 34, category: 'Availability',
    mostAffectedEntity: 'Company C', primaryContributor: 'Texas Hub',
    availabilityImpact: '8%',
    contextData: { companyIdx: 2 }
  },
  {
    cause: 'Mechanical Breakdown', hours: 85, percent: 23, category: 'Availability',
    mostAffectedEntity: 'Acme Manufacturing', primaryContributor: 'Berlin Factory',
    availabilityImpact: '6%',
    contextData: { companyIdx: 1 }
  }
];
export const executiveSummaries = {
  0: { trend: '+2.4', statusText: 'No active situations.', rootCause: null, recommendedAction: null }, // Stable
  1: { trend: '-1.2', statusText: 'Consecutive performance drops detected.', rootCause: 'Machine Reliability', recommendedAction: 'Review maintenance schedules for Berlin Factory', worstPlant: 'Berlin Factory' }, // Warning
  2: { trend: '-4.3', statusText: 'Operating 12% below group target OEE.', rootCause: 'Supply Chain Delay', recommendedAction: 'Escalate supplier review for Texas Hub', worstPlant: 'Texas Hub' }, // Critical
  3: { trend: '+1.8', statusText: 'No active situations.', rootCause: null, recommendedAction: null }, // Stable
};

export const performanceDrivers = {
  0: [
    { label: 'Plant A — Pune', impact: '+1.4', type: 'positive' },
    { label: 'Assembly Line 1', impact: '+0.8', type: 'positive' },
    { label: 'Quality Control', impact: '+0.2', type: 'positive' }
  ],
  1: [
    { label: 'Berlin Factory', impact: '-1.8', type: 'negative' },
    { label: 'Maintenance Delays', impact: '-0.7', type: 'negative' },
    { label: 'Quality Rejects', impact: '-0.2', type: 'negative' }
  ],
  2: [
    { label: 'Texas Hub', impact: '-3.2', type: 'negative' },
    { label: 'Extrusion Operations', impact: '-1.8', type: 'negative' },
    { label: 'Material Shortage', impact: '-1.1', type: 'negative' }
  ],
  3: [
    { label: 'Tokyo Main', impact: '+2.1', type: 'positive' },
    { label: 'Robotics Assembly', impact: '+1.5', type: 'positive' },
    { label: 'Zero Breakdown Shift', impact: '+0.9', type: 'positive' }
  ]
};

export const activeSituations = {
  0: [],
  1: [
    { type: 'Underperforming Plants', count: 1, severity: 'warning' },
    { type: 'Maintenance Overdue', count: 2, severity: 'warning' }
  ],
  2: [
    { type: 'Machine Failures', count: 8, severity: 'critical' },
    { type: 'Underperforming Plants', count: 3, severity: 'warning' },
    { type: 'Material Shortages', count: 2, severity: 'critical' }
  ],
  3: []
};

export const impactRankings = {
  0: [
    { plant: 'Plant A — Pune', oee: 84.2, impact: '+0.9' },
    { plant: 'Plant B — Mumbai', oee: 81.0, impact: '+0.5' }
  ],
  1: [
    { plant: 'Berlin Factory', oee: 68.4, impact: '-1.8' },
    { plant: 'Munich Facility', oee: 74.0, impact: '-0.4' }
  ],
  2: [
    { plant: 'Texas Hub', oee: 62.1, impact: '-4.1' },
    { plant: 'Ohio Plant', oee: 68.2, impact: '-1.8' },
    { plant: 'Nevada Facility', oee: 70.0, impact: '-0.5' }
  ],
  3: [
    { plant: 'Tokyo Main', oee: 88.5, impact: '+2.1' },
    { plant: 'Osaka Hub', oee: 85.1, impact: '+1.2' }
  ]
};

export const executiveDecisions = {
  0: [],
  1: [
    { title: 'Approve Maintenance Shutdown', target: 'Berlin Factory', pendingTime: '2h', status: 'pending', impactInfo: 'Prevents critical failure' }
  ],
  2: [
    { title: 'Budget Request for Parts', target: 'Texas Hub', pendingTime: '4h', status: 'pending', impactInfo: 'Resolves material shortage' },
    { title: 'Overtime Approval', target: 'Ohio Plant', pendingTime: '1h', status: 'pending', impactInfo: 'Recovers 2% OEE loss' }
  ],
  3: []
};


// ============================================================
// MD DASHBOARD DATA
// ============================================================

export const mdKPIs = {
  plantOEEAvg: { value: 76.9, unit: '%', trend: +1.4, label: 'Plant OEE Avg' },
  availability: { value: 88.6, unit: '%', trend: +0.9, label: 'Availability' },
  performance: { value: 89.4, unit: '%', trend: +1.2, label: 'Performance' },
  quality: { value: 97.1, unit: '%', trend: +0.3, label: 'Quality' },
  totalDowntime: { value: 122, unit: 'hrs', trend: -8.4, label: 'Total Downtime' },
};

export const enterpriseMachineStatus = [
  { name: 'Running', value: 112, color: 'var(--green)' },
  { name: 'Idle', value: 18, color: 'var(--amber)' },
  { name: 'No Plan', value: 9, color: 'var(--text-muted)' },
  { name: 'Breakdown', value: 5, color: 'var(--red)' },
];

export const plantMachineStatus = {
  0: [
    { name: 'Running', value: 38, color: 'var(--green)' },
    { name: 'Idle', value: 6, color: 'var(--amber)' },
    { name: 'No Plan', value: 2, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 2, color: 'var(--red)' },
  ],
  1: [
    { name: 'Running', value: 28, color: 'var(--green)' },
    { name: 'Idle', value: 4, color: 'var(--amber)' },
    { name: 'No Plan', value: 3, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 1, color: 'var(--red)' },
  ],
  2: [
    { name: 'Running', value: 20, color: 'var(--green)' },
    { name: 'Idle', value: 4, color: 'var(--amber)' },
    { name: 'No Plan', value: 2, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 2, color: 'var(--red)' },
  ],
  3: [
    { name: 'Running', value: 26, color: 'var(--green)' },
    { name: 'Idle', value: 4, color: 'var(--amber)' },
    { name: 'No Plan', value: 2, color: 'var(--text-muted)' },
    { name: 'Breakdown', value: 0, color: 'var(--red)' },
  ],
};

export const plantOEETrend = {
  0: [
    { label: '06:00', oee: 79.5, availability: 90.1, performance: 89.2, quality: 97.4 },
    { label: '10:00', oee: 80.2, availability: 91.5, performance: 90.4, quality: 97.6 },
    { label: '14:00', oee: 81.0, availability: 91.2, performance: 90.8, quality: 97.8 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  1: [
    { label: '06:00', oee: 76.1, availability: 88.2, performance: 89.0, quality: 96.8 },
    { label: '10:00', oee: 74.8, availability: 86.5, performance: 88.2, quality: 97.0 },
    { label: '14:00', oee: 75.2, availability: 87.4, performance: 88.6, quality: 97.2 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  2: [
    { label: '06:00', oee: 72.4, availability: 85.5, performance: 88.0, quality: 96.5 },
    { label: '10:00', oee: 69.8, availability: 82.8, performance: 86.5, quality: 96.8 },
    { label: '14:00', oee: 70.9, availability: 84.1, performance: 87.2, quality: 96.8 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
  3: [
    { label: '06:00', oee: 75.5, availability: 87.6, performance: 88.5, quality: 96.8 },
    { label: '10:00', oee: 77.2, availability: 89.2, performance: 89.8, quality: 97.2 },
    { label: '14:00', oee: 76.8, availability: 88.8, performance: 89.2, quality: 97.0 },
    { label: '18:00', oee: null, availability: null, performance: null, quality: null },
  ],
};

export const topPerformingMachines = {
  0: [
    { name: 'CNC-01', oee: 92.4, status: 'running' },
    { name: 'VMC-03', oee: 91.8, status: 'running' },
    { name: 'LATHE-02', oee: 90.5, status: 'running' },
  ],
  1: [
    { name: 'PRESS-02', oee: 89.6, status: 'running' },
    { name: 'CNC-05', oee: 88.4, status: 'running' },
    { name: 'VMC-01', oee: 87.9, status: 'running' },
  ],
  2: [
    { name: 'LATHE-05', oee: 85.2, status: 'running' },
    { name: 'CNC-11', oee: 84.8, status: 'running' },
    { name: 'MILL-02', oee: 84.1, status: 'running' },
  ],
  3: [
    { name: 'PACK-01', oee: 90.3, status: 'running' },
    { name: 'CNC-08', oee: 89.5, status: 'running' },
    { name: 'PRESS-04', oee: 88.7, status: 'running' },
  ],
};

export const oeeTrendData = {
  daily: [
    { label: '06:00', oee: 72.0, availability: 85.1, performance: 87.4, quality: 96.8 },
    { label: '08:00', oee: 75.4, availability: 87.2, performance: 88.1, quality: 97.2 },
    { label: '10:00', oee: 78.1, availability: 89.6, performance: 89.2, quality: 97.5 },
    { label: '12:00', oee: 74.5, availability: 86.8, performance: 87.8, quality: 96.9 },
    { label: '14:00', oee: 79.2, availability: 90.1, performance: 90.5, quality: 97.8 },
    { label: '16:00', oee: null, availability: null, performance: null, quality: null },
  ],
  weekly: [
    { label: 'Mon', oee: 74.2, availability: 86.1, performance: 88.4, quality: 97.1 },
    { label: 'Tue', oee: 73.8, availability: 85.6, performance: 87.9, quality: 96.9 },
    { label: 'Wed', oee: 76.5, availability: 88.2, performance: 89.5, quality: 97.4 },
    { label: 'Thu', oee: 75.9, availability: 87.5, performance: 88.8, quality: 97.2 },
    { label: 'Fri', oee: 78.4, availability: 89.8, performance: 90.2, quality: 97.7 },
    { label: 'Sat', oee: null, availability: null, performance: null, quality: null },
    { label: 'Sun', oee: null, availability: null, performance: null, quality: null },
  ],
  monthly: [
    { label: 'Jan', oee: 72.0, availability: 85.1, performance: 87.4, quality: 96.8 },
    { label: 'Feb', oee: 69.4, availability: 83.6, performance: 86.2, quality: 96.4 },
    { label: 'Mar', oee: 73.5, availability: 86.2, performance: 87.9, quality: 97.0 },
    { label: 'Apr', oee: 74.8, availability: 87.0, performance: 88.5, quality: 97.1 },
    { label: 'May', oee: 76.9, availability: 88.6, performance: 89.4, quality: 97.1 },
    { label: 'Jun', oee: null, availability: null, performance: null, quality: null },
    { label: 'Jul', oee: null, availability: null, performance: null, quality: null },
  ],
  quarterly: [
    { label: 'Q1', oee: 71.6, availability: 84.9, performance: 87.1, quality: 96.7 },
    { label: 'Q2', oee: 75.8, availability: 87.8, performance: 88.9, quality: 97.1 },
    { label: 'Q3', oee: null, availability: null, performance: null, quality: null },
    { label: 'Q4', oee: null, availability: null, performance: null, quality: null },
  ],
  yearly: [
    { label: '2022', oee: 68.4, availability: 82.1, performance: 84.5, quality: 95.8 },
    { label: '2023', oee: 71.2, availability: 84.6, performance: 86.8, quality: 96.4 },
    { label: '2024', oee: 73.5, availability: 86.2, performance: 87.9, quality: 97.0 },
    { label: '2025', oee: 75.1, availability: 87.2, performance: 88.6, quality: 97.2 },
    { label: '2026', oee: 76.9, availability: 88.6, performance: 89.4, quality: 97.1 },
  ]
};

export const plantOEEComparison = [
  { plant: 'Plant A\nPune', oee: 81.0, availability: 91.2, performance: 90.8, quality: 97.8, downtime: 38, color: '#10b981' },
  { plant: 'Plant B\nNashik', oee: 75.2, availability: 87.4, performance: 88.6, quality: 97.2, downtime: 52, color: '#38bdf8' },
  { plant: 'Plant C\nChennai', oee: 70.9, availability: 84.1, performance: 87.2, quality: 96.8, downtime: 71, color: '#f59e0b' },
  { plant: 'Plant D\nAhmedabad', oee: 76.8, availability: 88.8, performance: 89.2, quality: 97.0, downtime: 44, color: '#a855f7' },
];

export const alarmHeatmapData = [
  { label: 'Plant A', W1: 4, W2: 7, W3: 2, W4: 5 },
  { label: 'Plant B', W1: 9, W2: 6, W3: 11, W4: 8 },
  { label: 'Plant C', W1: 14, W2: 10, W3: 16, W4: 12 },
  { label: 'Plant D', W1: 5, W2: 3, W3: 6, W4: 4 },
];



export const operationalLossContributors = [
  {
    cause: 'Mechanical Breakdown', hours: 42, percent: 34, category: 'Availability',
    mostAffectedPlant: 'Plant C', affectedDepartment: 'CNC Department',
    availabilityImpact: '11%', primaryContributor: 'Line 4',
    contextData: { plantIdx: 2, deptIdx: 0, sectionIdx: 0, lineIdx: 3 }
  },
  {
    cause: 'Setup & Changeover', hours: 28, percent: 23, category: 'Availability',
    mostAffectedPlant: 'Plant B', affectedDepartment: 'Assembly',
    availabilityImpact: '8%', primaryContributor: 'Line 2',
    contextData: { plantIdx: 1, deptIdx: 1, sectionIdx: 0, lineIdx: 1 }
  },
  {
    cause: 'Minor Stops', hours: 18, percent: 15, category: 'Performance',
    mostAffectedPlant: 'Plant A', affectedDepartment: 'Packaging',
    availabilityImpact: '5%', primaryContributor: 'Line 1',
    contextData: { plantIdx: 0, deptIdx: 2, sectionIdx: 1, lineIdx: 0 }
  },
  {
    cause: 'Slow Running', hours: 16, percent: 13, category: 'Performance',
    mostAffectedPlant: 'Plant C', affectedDepartment: 'Machining',
    availabilityImpact: '4%', primaryContributor: 'Line 3',
    contextData: { plantIdx: 2, deptIdx: 0, sectionIdx: 1, lineIdx: 2 }
  },
  {
    cause: 'Quality Rejects', hours: 12, percent: 10, category: 'Quality',
    mostAffectedPlant: 'Plant D', affectedDepartment: 'Testing',
    availabilityImpact: '3%', primaryContributor: 'Test Bench 2',
    contextData: { plantIdx: 3, deptIdx: 3, sectionIdx: 0, lineIdx: 1 }
  },
  {
    cause: 'No Plan / Idle', hours: 6, percent: 5, category: 'Availability',
    mostAffectedPlant: 'Plant A', affectedDepartment: 'Dispatch',
    availabilityImpact: '2%', primaryContributor: 'Loading Bay A',
    contextData: { plantIdx: 0, deptIdx: 4, sectionIdx: 0, lineIdx: 0 }
  },
];

export const shiftProductivityComparison = [
  { shift: 'Shift A', plantA: 92, plantB: 88, plantC: 84, plantD: 90 },
  { shift: 'Shift B', plantA: 87, plantB: 82, plantC: 79, plantD: 85 },
  { shift: 'Shift C', plantA: 78, plantB: 74, plantC: 71, plantD: 76 },
];

export const plantPerformanceTables = {
  0: [
    { plant: 'Plant A — Pune', oee: 81.0, avail: 91.2, perf: 90.8, qual: 97.8, downtime: 38, machines: 48, production: 1401, status: 'good' },
    { plant: 'Plant B — Nashik', oee: 75.2, avail: 87.4, perf: 88.6, qual: 97.2, downtime: 52, machines: 36, production: 1120, status: 'warning' },
    { plant: 'Plant C — Chennai', oee: 70.9, avail: 84.1, perf: 87.2, qual: 96.8, downtime: 71, machines: 28, production: 890, status: 'critical' },
    { plant: 'Plant D — Ahmedabad', oee: 76.8, avail: 88.8, perf: 89.2, qual: 97.0, downtime: 44, machines: 32, production: 1045, status: 'good' },
  ],
  1: [
    { plant: 'Plant E — Berlin', oee: 82.5, avail: 92.1, perf: 91.5, qual: 98.2, downtime: 32, machines: 40, production: 1250, status: 'good' },
    { plant: 'Plant F — Munich', oee: 73.1, avail: 85.2, perf: 86.4, qual: 96.5, downtime: 65, machines: 25, production: 810, status: 'warning' },
  ],
  2: [
    { plant: 'Plant G — Texas', oee: 68.2, avail: 82.1, perf: 84.5, qual: 94.0, downtime: 110, machines: 50, production: 1800, status: 'critical' },
    { plant: 'Plant H — Ohio', oee: 63.5, avail: 78.4, perf: 80.6, qual: 92.8, downtime: 100, machines: 35, production: 1100, status: 'critical' },
  ],
  3: [
    { plant: 'Plant I — Tokyo', oee: 85.1, avail: 94.2, perf: 93.8, qual: 98.6, downtime: 28, machines: 60, production: 2200, status: 'good' },
    { plant: 'Plant J — Osaka', oee: 79.8, avail: 90.1, perf: 93.2, qual: 97.8, downtime: 57, machines: 45, production: 1650, status: 'good' },
  ]
};

export const plantPerformanceTable = plantPerformanceTables[0];

// ============================================================
// PLANT HEAD DASHBOARD DATA
// ============================================================

export const plantKPIs = {
  plantOEE: { value: 81.0, unit: '%', trend: +1.8, target: 87.0 },
  shiftOEE: { value: 85.3, unit: '%', trend: +2.1, target: 87.0 },
  availability: { value: 91.2, unit: '%', trend: +0.9, target: 93.0 },
  performance: { value: 90.8, unit: '%', trend: +1.4, target: 92.0 },
  quality: { value: 97.8, unit: '%', trend: +0.2, target: 98.5 },
  downtime: { value: 38, unit: 'h', trend: -4.5, target: 30.0 },
};

export const shiftOEEData = [
  { shift: 'Shift A\n06:00–14:00', oee: 85.3, availability: 93.6, performance: 92.8, quality: 98.2 },
  { shift: 'Shift B\n14:00–22:00', oee: 81.0, availability: 91.2, performance: 90.8, quality: 97.8 },
  { shift: 'Shift C\n22:00–06:00', oee: 73.2, availability: 86.4, performance: 87.2, quality: 97.2 },
];

export const deptOEEComparison = [
  { dept: 'Machining', oee: 81.0, availability: 91.2, performance: 90.8, quality: 97.8 },
  { dept: 'Assembly', oee: 77.5, availability: 89.4, performance: 89.0, quality: 97.4 },
  { dept: 'Packaging', oee: 84.5, availability: 93.0, performance: 92.2, quality: 98.4 },
  { dept: 'Finishing', oee: 74.4, availability: 87.2, performance: 88.0, quality: 97.0 },
];

export const availabilityLossBreakdown = [
  { name: 'Breakdown', value: 38, color: '#ef4444' },
  { name: 'Maintenance', value: 24, color: '#f97316' },
  { name: 'Idle', value: 22, color: '#f59e0b' },
  { name: 'No Plan', value: 16, color: '#818cf8' },
];

export const performanceLossBreakdown = [
  { name: 'Slow Cycle', value: 42, color: '#f97316' },
  { name: 'Minor Stops', value: 35, color: '#f59e0b' },
  { name: 'Reduced Speed', value: 23, color: '#a855f7' },
];

export const qualityLossBreakdown = [
  { name: 'Rejects', value: 48, color: '#ef4444' },
  { name: 'Rework', value: 32, color: '#f97316' },
  { name: 'Quality Variation', value: 20, color: '#f59e0b' },
];

export const energyTrend = [
  { time: '06:00', kwh: 280 }, { time: '07:00', kwh: 340 },
  { time: '08:00', kwh: 420 }, { time: '09:00', kwh: 460 },
  { time: '10:00', kwh: 450 }, { time: '11:00', kwh: 430 },
  { time: '12:00', kwh: 380 }, { time: '13:00', kwh: 390 },
  { time: '14:00', kwh: 440 }, { time: '15:00', kwh: 470 },
  { time: '16:00', kwh: 455 }, { time: '17:00', kwh: 410 },
];

export const machineDowntimeHeatmap = [
  { machine: 'CNC-01', mon: 0, tue: 0.5, wed: 0, thu: 0, fri: 1.2, sat: 0 },
  { machine: 'CNC-02', mon: 0.3, tue: 0, wed: 0, thu: 2.1, fri: 0, sat: 0 },
  { machine: 'VMC-01', mon: 0, tue: 0, wed: 0.8, thu: 0, fri: 0, sat: 0.5 },
  { machine: 'VMC-02', mon: 1.5, tue: 0, wed: 0, thu: 0, fri: 0.4, sat: 0 },
  { machine: 'LATHE-01', mon: 0, tue: 0.2, wed: 0, thu: 0.3, fri: 0, sat: 0 },
  { machine: 'PRESS-01', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 1.8 },
];

export const machineStatusList = [
  { id: 'CNC-01', name: 'CNC Machining Centre 01', status: 'running', operator: 'D. Patil', uptime: 97, output: 142, target: 150, oee: 91.2 },
  { id: 'CNC-02', name: 'CNC Machining Centre 02', status: 'running', operator: 'S. More', uptime: 94, output: 138, target: 150, oee: 88.4 },
  { id: 'CNC-03', name: 'CNC Machining Centre 03', status: 'breakdown', operator: '—', uptime: 0, output: 67, target: 150, oee: 0 },
  { id: 'VMC-01', name: 'Vertical Milling Centre 01', status: 'running', operator: 'R. Jadhav', uptime: 89, output: 96, target: 110, oee: 84.6 },
  { id: 'VMC-02', name: 'Vertical Milling Centre 02', status: 'idle', operator: 'K. Singh', uptime: 72, output: 78, target: 110, oee: 0 },
  { id: 'LATHE-01', name: 'CNC Lathe 01', status: 'running', operator: 'A. Gupta', uptime: 95, output: 205, target: 220, oee: 92.1 },
  { id: 'PRESS-01', name: 'Hydraulic Press 01', status: 'maintenance', operator: 'Maintenance', uptime: 0, output: 110, target: 220, oee: 0 },
  { id: 'PACK-01', name: 'Packaging Line A', status: 'running', operator: 'M. Khan', uptime: 91, output: 312, target: 320, oee: 90.3 },
];

export const plantActivityFeed = [
  { time: '15:42', event: 'CNC-03 breakdown reported — bearing failure', type: 'critical' },
  { time: '15:28', event: 'Shift B OEE at 86.4% — above target', type: 'success' },
  { time: '15:10', event: 'VMC-02 switched to idle — operator break', type: 'warning' },
  { time: '14:55', event: 'PRESS-01 sent for scheduled PM', type: 'info' },
  { time: '14:30', event: 'Shift B handover completed', type: 'info' },
  { time: '14:12', event: 'Quality inspection passed — Batch #B2047', type: 'success' },
  { time: '13:50', event: 'Performance loss detected — Slow Cycle on LATHE-01', type: 'warning' },
];

// ============================================================
// DEPARTMENT HEAD DASHBOARD DATA
// ============================================================

export const deptOEEKPIs = {
  oee: { value: 81.0, trend: +1.8 },
  availability: { value: 91.2, trend: +0.9 },
  performance: { value: 90.8, trend: +1.4 },
  quality: { value: 97.8, trend: +0.2 },
  downtime: { value: 14.5, trend: -0.5 },
};

export const sectionOEEComparison = [
  { section: 'CNC Section', oee: 81.0, avail: 91.2, perf: 90.8, qual: 97.8 },
  { section: 'VMC Section', oee: 77.5, avail: 89.4, perf: 89.0, qual: 97.4 },
  { section: 'Lathe Section', oee: 84.5, avail: 93.0, perf: 92.2, qual: 98.4 },
  { section: 'Press Section', oee: 69.1, avail: 82.6, perf: 86.4, qual: 96.8 },
];

export const qualityMetrics = {
  defectRate: { value: 2.2, trend: -0.3 },
  reworkRate: { value: 1.4, trend: -0.1 },
  firstPassYield: { value: 97.8, trend: +0.8 },
  rejectCount: { value: 48, trend: -12 },
};

export const rejectTrend = [
  { week: 'W1', rejects: 62, rework: 28 },
  { week: 'W2', rejects: 58, rework: 31 },
  { week: 'W3', rejects: 54, rework: 24 },
  { week: 'W4', rejects: 48, rework: 19 },
];

export const defectCategoryData = [
  { name: 'Dimensional Variance', value: 38 },
  { name: 'Surface Finish', value: 25 },
  { name: 'Tool Wear Defects', value: 18 },
  { name: 'Burr / Flash', value: 12 },
  { name: 'Wrong Material', value: 7 },
];

export const paretoData = [
  { cause: 'Tool Wear', count: 48, cumulative: 35 },
  { cause: 'Fixture Error', count: 32, cumulative: 58 },
  { cause: 'Program Error', count: 22, cumulative: 74 },
  { cause: 'Coolant Issue', count: 18, cumulative: 87 },
  { cause: 'Operator Error', count: 10, cumulative: 94 },
  { cause: 'Other', count: 8, cumulative: 100 },
];

export const maintenanceMetrics = {
  mttr: { value: 2.4, unit: 'hrs', trend: -0.3 },
  mtbf: { value: 68.2, unit: 'hrs', trend: +3.1 },
  breakdownFrequency: { value: 7, unit: 'this month', trend: -2 },
  pmCompliance: { value: 91, unit: '%', trend: +4 },
};

export const pendingMaintenanceTasks = [
  { id: 'PM-001', machine: 'CNC-04', type: 'Preventive', priority: 'High', due: '2026-05-26', status: 'overdue' },
  { id: 'PM-002', machine: 'VMC-03', type: 'Predictive', priority: 'Medium', due: '2026-05-27', status: 'pending' },
  { id: 'PM-003', machine: 'LATHE-03', type: 'Preventive', priority: 'Low', due: '2026-05-30', status: 'pending' },
  { id: 'PM-004', machine: 'PRESS-02', type: 'Corrective', priority: 'High', due: '2026-05-25', status: 'overdue' },
  { id: 'PM-005', machine: 'CNC-01', type: 'Predictive', priority: 'Medium', due: '2026-06-02', status: 'scheduled' },
];

export const downtimeTimeline = [
  { time: '06:00', duration: 0, cause: '', type: 'running' },
  { time: '07:30', duration: 45, cause: 'CNC-03 Breakdown', type: 'breakdown' },
  { time: '09:15', duration: 20, cause: 'Setup Changeover', type: 'planned' },
  { time: '11:00', duration: 15, cause: 'Minor Stop', type: 'performance' },
  { time: '13:30', duration: 30, cause: 'Quality Check Hold', type: 'quality' },
  { time: '15:42', duration: null, cause: 'CNC-03 Bearing', type: 'breakdown' },
];

export const shiftOEEComparison = [
  { name: 'Shift A', oee: 88.4, avail: 93.6, perf: 92.8, qual: 98.2 },
  { name: 'Shift B', oee: 84.2, avail: 91.2, perf: 90.8, qual: 97.8 },
  { name: 'Shift C', oee: 78.6, avail: 86.4, perf: 87.2, qual: 97.2 },
];

// ============================================================
// SECTION HEAD DASHBOARD DATA
// ============================================================

export const sectionKPIs = {
  sectionOEE: { value: 84.2, trend: +1.8 },
  microStoppages: { value: 12, trend: -3 },
  downtimeHrs: { value: 1.8, trend: -0.4 },
  shiftProgress: { value: 62, trend: 0 },
};

export const hourlyProductionData = [
  { hour: '06:00', actual: 0, target: 120 },
  { hour: '07:00', actual: 118, target: 120 },
  { hour: '08:00', actual: 125, target: 120 },
  { hour: '09:00', actual: 132, target: 120 },
  { hour: '10:00', actual: 119, target: 120 },
  { hour: '11:00', actual: 108, target: 120 },
  { hour: '12:00', actual: 95, target: 120 },
  { hour: '13:00', actual: 115, target: 120 },
  { hour: '14:00', actual: 128, target: 120 },
  { hour: '15:00', actual: 134, target: 120 },
  { hour: '16:00', actual: 127, target: 120 },
];

export const machineTimelineData = [
  {
    id: 'CNC-01',
    segments: [
      { state: 'running', duration: 216, reason: 'Production batch B2047' },
      { state: 'idle', duration: 24, reason: 'Operator break' },
      { state: 'running', duration: 216, reason: 'Resumed production' },
      { state: 'running', duration: 24, reason: 'Ongoing' },
    ],
  },
  {
    id: 'CNC-02',
    segments: [
      { state: 'running', duration: 96, reason: 'Morning production' },
      { state: 'breakdown', duration: 48, reason: 'Coolant pump failure' },
      { state: 'idle', duration: 86, reason: 'Awaiting maintenance' },
      { state: 'running', duration: 250, reason: 'Resumed after repair' },
    ],
  },
  {
    id: 'VMC-01',
    segments: [
      { state: 'running', duration: 288, reason: 'Continuous milling' },
      { state: 'idle', duration: 38, reason: 'Setup changeover' },
      { state: 'running', duration: 154, reason: 'New batch started' },
    ],
  },
  {
    id: 'LATHE-01',
    segments: [
      { state: 'running', duration: 144, reason: 'Turning operations' },
      { state: 'maintenance', duration: 38, reason: 'Preventive maintenance' },
      { state: 'running', duration: 298, reason: 'Post-PM production' },
    ],
  },
  {
    id: 'PRESS-01',
    segments: [
      { state: 'running', duration: 192, reason: 'Stamping batch' },
      { state: 'noplan', duration: 288, reason: 'No production plan' },
    ],
  },
];

export const microStoppageData = [
  { hour: '07:00', count: 2, duration: 8 },
  { hour: '08:00', count: 1, duration: 3 },
  { hour: '09:00', count: 0, duration: 0 },
  { hour: '10:00', count: 3, duration: 12 },
  { hour: '11:00', count: 4, duration: 18 },
  { hour: '12:00', count: 2, duration: 9 },
  { hour: '13:00', count: 1, duration: 4 },
  { hour: '14:00', count: 0, duration: 0 },
  { hour: '15:00', count: 2, duration: 7 },
];

export const manpowerStatus = [
  { id: 'OP-001', name: 'Dinesh Patil', role: 'CNC Operator', machine: 'CNC-01', status: 'present', skill: 'Level 3' },
  { id: 'OP-002', name: 'Suresh More', role: 'CNC Operator', machine: 'CNC-02', status: 'present', skill: 'Level 2' },
  { id: 'OP-003', name: 'Ramesh Jadhav', role: 'VMC Operator', machine: 'VMC-01', status: 'present', skill: 'Level 3' },
  { id: 'OP-004', name: 'Kishan Singh', role: 'VMC Operator', machine: 'VMC-02', status: 'on_break', skill: 'Level 2' },
  { id: 'OP-005', name: 'Anil Gupta', role: 'Lathe Operator', machine: 'LATHE-01', status: 'present', skill: 'Level 4' },
  { id: 'OP-006', name: 'Manoj Khan', role: 'Press Operator', machine: 'PRESS-01', status: 'absent', skill: 'Level 2' },
];

export const andonAlerts = [
  { id: 1, line: 'Line-01', machine: 'CNC-03', type: 'BREAKDOWN', color: 'red', active: true, message: 'Bearing failure — spindle overheating', time: '15:42' },
  { id: 2, line: 'Line-02', machine: 'VMC-02', type: 'IDLE', color: 'yellow', active: true, message: 'Operator on extended break — idle >20m', time: '15:10' },
  { id: 3, line: 'Line-01', machine: 'CNC-01', type: 'RUNNING', color: 'green', active: false, message: 'Resumed after coolant top-up', time: '14:30' },
  { id: 4, line: 'Line-03', machine: 'LATHE-01', type: 'RUNNING', color: 'green', active: false, message: 'PM completed — operational', time: '14:00' },
];

// ============================================================
// LINE HEAD DASHBOARD DATA
// ============================================================

export const machineCards = [
  {
    id: 'CNC-01', name: 'CNC-01', type: 'Machining Centre',
    status: 'running', stateDetail: 'Running — Normal Production', operator: 'D. Patil',
    oee: 91.2, availability: 94.8, performance: 93.6, quality: 98.4,
    production: 142, target: 150, goodCount: 139, rejectCount: 3,
    idealCycleTime: 4.0, actualCycleTime: 4.2,
    runtime: '7h 24m', downtime: '36m', energyKwh: 48.2,
    alarms: [], temperature: 62,
    stability: 'Stable',
    rootCauseSuggestions: []
  },
  {
    id: 'CNC-02', name: 'CNC-02', type: 'Machining Centre',
    status: 'running', stateDetail: 'Running — Performance Loss', operator: 'S. More',
    oee: 88.4, availability: 92.4, performance: 91.8, quality: 97.8,
    production: 138, target: 150, goodCount: 133, rejectCount: 5,
    idealCycleTime: 4.0, actualCycleTime: 4.4,
    runtime: '7h 10m', downtime: '50m', energyKwh: 46.8,
    alarms: ['Coolant Low'], temperature: 68,
    stability: 'Moderate Instability',
    rootCauseSuggestions: [
      'Micro stoppages increasing during Shift B changeovers',
      'Coolant pressure fluctuations causing cycle delays'
    ]
  },
  {
    id: 'CNC-03', name: 'CNC-03', type: 'Machining Centre',
    status: 'breakdown', stateDetail: 'Breakdown — Mechanical Failure', operator: '—',
    oee: 0, availability: 0, performance: 0, quality: 0,
    production: 67, target: 150, goodCount: 59, rejectCount: 8,
    idealCycleTime: 4.0, actualCycleTime: 0,
    runtime: '3h 20m', downtime: '4h 40m', energyKwh: 18.4,
    alarms: ['Bearing Failure', 'Spindle Error'], temperature: 88,
    stability: 'Critical Instability',
    rootCauseSuggestions: [
      'Repeated bearing overheating after maintenance cycle',
      'Spindle vibration anomaly detected prior to failure'
    ]
  },
  {
    id: 'VMC-01', name: 'VMC-01', type: 'Vertical Mill',
    status: 'running', stateDetail: 'Running — Normal Production', operator: 'R. Jadhav',
    oee: 84.6, availability: 92.0, performance: 90.4, quality: 97.2,
    production: 96, target: 110, goodCount: 93, rejectCount: 3,
    idealCycleTime: 6.5, actualCycleTime: 6.8,
    runtime: '7h 30m', downtime: '30m', energyKwh: 62.4,
    alarms: [], temperature: 58,
    stability: 'Stable',
    rootCauseSuggestions: []
  },
  {
    id: 'VMC-02', name: 'VMC-02', type: 'Vertical Mill',
    status: 'idle', stateDetail: 'Idle — No Operator', operator: 'K. Singh',
    oee: 0, availability: 71.2, performance: 0, quality: 0,
    production: 78, target: 110, goodCount: 77, rejectCount: 1,
    idealCycleTime: 6.5, actualCycleTime: 0,
    runtime: '6h 05m', downtime: '1h 55m', energyKwh: 22.1,
    alarms: ['Operator Break'], temperature: 41,
    stability: 'Moderate Instability',
    rootCauseSuggestions: [
      'Frequent idle states caused by extended operator breaks',
      'Runtime instability detected after operator shift transition'
    ]
  },
  {
    id: 'LATHE-01', name: 'LATHE-01', type: 'CNC Lathe',
    status: 'running', stateDetail: 'Running — Normal Production', operator: 'A. Gupta',
    oee: 92.8, availability: 95.6, performance: 94.8, quality: 98.6,
    production: 205, target: 220, goodCount: 202, rejectCount: 3,
    idealCycleTime: 3.0, actualCycleTime: 3.1,
    runtime: '7h 45m', downtime: '15m', energyKwh: 38.6,
    alarms: [], temperature: 55,
    stability: 'Stable',
    rootCauseSuggestions: []
  },
];

export const productionCounter = {
  totalToday: 1401,
  targetToday: 1680,
  goodCount: 1363,
  rejectCount: 38, // goodCount + rejectCount = totalToday
  reworked: 15, // subset of rejectCount that were reworked
};

export const cycleTimeHistory = [
  { time: '10:00', cnc01: 4.2, cnc02: 4.4, vmc01: 6.9 },
  { time: '11:00', cnc01: 4.1, cnc02: 4.3, vmc01: 6.8 },
  { time: '12:00', cnc01: 4.4, cnc02: 4.6, vmc01: 7.1 },
  { time: '13:00', cnc01: 4.2, cnc02: 4.5, vmc01: 6.7 },
  { time: '14:00', cnc01: 4.3, cnc02: 4.4, vmc01: 6.8 },
  { time: '15:00', cnc01: 4.1, cnc02: 4.2, vmc01: 6.6 },
];

// ============================================================
// PREDICTIVE INSIGHTS (AI-simulated)
// ============================================================

export const predictiveInsights = [
  { id: 1, severity: 'critical', machine: 'CNC-02', insight: 'Spindle vibration rising — bearing wear predicted within 12 hrs', confidence: 87, icon: '⚡' },
  { id: 2, severity: 'warning', machine: 'VMC-01', insight: 'Cycle time degradation trend detected — performance loss imminent', confidence: 74, icon: '📉' },
  { id: 3, severity: 'warning', machine: 'Shift C', insight: 'Historical pattern: Shift C OEE typically drops >5% past 02:00', confidence: 91, icon: '🌙' },
  { id: 4, severity: 'info', machine: 'Press-01', insight: 'PM due in 6 hrs — schedule before next shift to avoid unplanned stop', confidence: 99, icon: '🔧' },
  { id: 5, severity: 'warning', machine: 'Plant B', insight: 'Availability loss accelerating — 3 consecutive weeks of decline', confidence: 82, icon: '📊' },
];

// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = [
  { id: 1, type: 'critical', title: 'CNC-03 Breakdown', message: 'Bearing failure on CNC-03 — OEE impact: -3.8%', time: '2m ago', read: false },
  { id: 2, type: 'warning', title: 'Plant C OEE Below Target', message: 'Plant C OEE at 76.4% — 10.6% below 87% target.', time: '18m ago', read: false },
  { id: 3, type: 'warning', title: 'Availability Loss Rising', message: 'Plant B availability dropped to 87.4% this shift.', time: '45m ago', read: false },
  { id: 4, type: 'info', title: 'Shift B Started', message: 'Shift B handover completed. Current OEE: 86.4%.', time: '1h ago', read: true },
  { id: 5, type: 'success', title: 'PM Completed', message: 'Preventive maintenance on PRESS-01 completed. OEE restored.', time: '2h ago', read: true },
];

// ============================================================
// EXECUTIVE OPERATIONAL ATTENTION AREAS
// ============================================================

export const executiveAttentionItems = [
  {
    id: 1,
    severity: 'critical',
    message: 'Plant C availability dropped 10.6% below target',
    targetLabel: 'Plant C\nChennai',
    contextData: { plantIdx: 2 }
  },
  {
    id: 2,
    severity: 'watch',
    message: 'Mechanical breakdowns contributed 42h downtime this week',
    targetLabel: 'Plant B\nNashik',
    contextData: { plantIdx: 1 }
  },
  {
    id: 3,
    severity: 'critical',
    message: 'Repeated micro-stoppages detected on Line 4 during Shift B',
    targetLabel: 'Plant A\nPune',
    contextData: { plantIdx: 0 }
  },
  {
    id: 4,
    severity: 'watch',
    message: 'Packaging section reject trend increased 8% over last 3 shifts',
    targetLabel: 'Plant A\nPune',
    contextData: { plantIdx: 0 }
  },
  {
    id: 5,
    severity: 'watch',
    message: 'Availability degradation detected across CNC lines',
    targetLabel: 'Plant C\nChennai',
    contextData: { plantIdx: 2 }
  }
];

// ============================================================
// PLANT HEAD OPERATIONAL INVESTIGATION AREAS
// ============================================================

export const plantAttentionItems = [
  {
    id: 1,
    severity: 'critical',
    message: 'Mechanical breakdown contributed highest downtime losses',
    targetLabel: 'Machining',
    contextData: { deptIdx: 0 }
  },
  {
    id: 2,
    severity: 'critical',
    message: 'Finishing section operating below target OEE',
    targetLabel: 'Finishing',
    contextData: { deptIdx: 3 }
  },
  {
    id: 3,
    severity: 'watch',
    message: 'Shift C showing repeated availability losses',
    targetLabel: 'Assembly',
    contextData: { deptIdx: 1 }
  },
  {
    id: 4,
    severity: 'watch',
    message: 'Packaging line generating recurring micro stoppages',
    targetLabel: 'Packaging',
    contextData: { deptIdx: 2 }
  },
  {
    id: 5,
    severity: 'watch',
    message: 'Performance degradation detected during night shift',
    targetLabel: 'Machining',
    contextData: { deptIdx: 0 }
  }
];

// ============================================================
// DEPARTMENT HEAD OPERATIONAL BOTTLENECKS
// ============================================================

export const departmentAttentionItems = [
  {
    id: 1,
    severity: 'critical',
    message: 'CNC-03 causing repeated bearing failures',
    targetLabel: 'CNC Section',
    contextData: { sectionIdx: 0 }
  },
  {
    id: 2,
    severity: 'critical',
    message: 'Reject hotspot detected in Packaging Section',
    targetLabel: 'Packaging Section',
    contextData: { sectionIdx: 2 }
  },
  {
    id: 3,
    severity: 'watch',
    message: 'Line 2 contributing highest performance losses',
    targetLabel: 'VMC Section',
    contextData: { sectionIdx: 1 }
  },
  {
    id: 4,
    severity: 'watch',
    message: 'Press section operating below target OEE',
    targetLabel: 'Press Section',
    contextData: { sectionIdx: 3 }
  },
  {
    id: 5,
    severity: 'watch',
    message: 'Repeated micro stoppages reducing throughput',
    targetLabel: 'Lathe Section',
    contextData: { sectionIdx: 2 }
  }
];

// ============================================================
// DRILL-DOWN HIERARCHY
// ============================================================

export const drilldownHierarchy = {
  group: 'Global Group',
  companies: [
    { id: 'comp-opus', name: 'Opus One Industries', oee: 76.9 },
    { id: 'comp-acme', name: 'Acme Manufacturing', oee: 71.2 },
    { id: 'comp-nova', name: 'Nova Tech', oee: 65.8 },
    { id: 'comp-zenith', name: 'Zenith Production', oee: 82.4 },
  ],
  company: 'Opus One Industries',
  plants: [
    { id: 'plant-a', name: 'Plant A — Pune', oee: 84.2 },
    { id: 'plant-b', name: 'Plant B — Nashik', oee: 79.8 },
    { id: 'plant-c', name: 'Plant C — Chennai', oee: 76.4 },
    { id: 'plant-d', name: 'Plant D — Ahmedabad', oee: 80.6 },
  ],
  departments: [
    { id: 'dept-mach', plant: 'plant-a', name: 'Machining', oee: 84.2 },
    { id: 'dept-assy', plant: 'plant-a', name: 'Assembly', oee: 81.6 },
    { id: 'dept-pack', plant: 'plant-a', name: 'Packaging', oee: 87.4 },
    { id: 'dept-fin', plant: 'plant-a', name: 'Finishing', oee: 79.2 },
  ],
  sections: [
    { id: 'sec-cnc', dept: 'dept-mach', name: 'CNC Section', oee: 84.2 },
    { id: 'sec-vmc', dept: 'dept-mach', name: 'VMC Section', oee: 81.6 },
    { id: 'sec-lathe', dept: 'dept-mach', name: 'Lathe Section', oee: 86.8 },
    { id: 'sec-press', dept: 'dept-mach', name: 'Press Section', oee: 74.2 },
  ],
  lines: [
    { id: 'line-01', section: 'sec-cnc', name: 'Line-01', oee: 84.2 },
    { id: 'line-02', section: 'sec-cnc', name: 'Line-02', oee: 81.8 },
  ],
};

// ============================================================
// REFINED OEE ANALYTICS DATA — v4.0
// ============================================================

export const productionLines = [
  { id: 'Line-01', name: 'Line 01 (Heavy)', status: 'running', oee: 84.2, target: 450, output: 380, machines: 4 },
  { id: 'Line-02', name: 'Line 02 (Medium)', status: 'warning', oee: 76.4, target: 500, output: 410, machines: 3 },
  { id: 'Line-03', name: 'Line 03 (Light)', status: 'idle', oee: 81.8, target: 600, output: 450, machines: 3 },
];

// Cross-plant OEE loss attribution (stacked loss bar for MD)
export const crossPlantLossData = [
  { plant: 'Plant A', oee: 81.0, availLoss: 8.8, perfLoss: 8.0, qualLoss: 2.2 },
  { plant: 'Plant B', oee: 75.2, availLoss: 12.6, perfLoss: 9.4, qualLoss: 2.8 },
  { plant: 'Plant C', oee: 70.9, availLoss: 15.9, perfLoss: 10.0, qualLoss: 3.2 },
  { plant: 'Plant D', oee: 76.8, availLoss: 11.2, perfLoss: 9.1, qualLoss: 2.9 },
];

// Intra-shift hourly OEE trend for Plant Head
export const hourlyOEETrend = [
  { time: '06:00', oee: 72.0, availability: 85.2, performance: 88.4, quality: 95.6 },
  { time: '07:00', oee: 77.8, availability: 89.0, performance: 90.0, quality: 97.2 },
  { time: '08:00', oee: 82.9, availability: 92.2, performance: 91.8, quality: 97.9 },
  { time: '09:00', oee: 85.1, availability: 93.4, performance: 92.6, quality: 98.4 },
  { time: '10:00', oee: 81.8, availability: 91.8, performance: 91.2, quality: 97.8 },
  { time: '11:00', oee: 79.7, availability: 90.6, performance: 90.0, quality: 97.6 },
  { time: '12:00', oee: 75.6, availability: 88.4, performance: 88.2, quality: 96.9 },
  { time: '13:00', oee: 78.6, availability: 90.2, performance: 89.4, quality: 97.4 },
  { time: '14:00', oee: 81.0, availability: 91.4, performance: 90.6, quality: 97.8 },
  { time: '15:00', oee: 82.9, availability: 92.4, performance: 91.4, quality: 98.0 },
];

// Section comparison radar (for Dept Head)
export const sectionRadarData = [
  { metric: 'OEE', CNC: 84, VMC: 82, Lathe: 87, Press: 74 },
  { metric: 'Avail', CNC: 91, VMC: 89, Lathe: 93, Press: 83 },
  { metric: 'Performance', CNC: 91, VMC: 89, Lathe: 92, Press: 86 },
  { metric: 'Quality', CNC: 98, VMC: 97, Lathe: 98, Press: 97 },
  { metric: 'PM Comp.', CNC: 91, VMC: 87, Lathe: 94, Press: 78 },
  { metric: 'MTBF Score', CNC: 80, VMC: 75, Lathe: 88, Press: 65 },
];

// Section OEE loss detail for waterfall in Dept Head
export const sectionLossDetail = [
  { section: 'CNC Section', availLoss: 8.8, perfLoss: 5.2, qualLoss: 2.2 },
  { section: 'VMC Section', availLoss: 10.6, perfLoss: 6.4, qualLoss: 2.6 },
  { section: 'Lathe Section', availLoss: 7.0, perfLoss: 4.2, qualLoss: 1.6 },
  { section: 'Press Section', availLoss: 17.4, perfLoss: 7.6, qualLoss: 3.2 },
];

// Bottleneck machines for Section Head
export const bottleneckData = [
  { machine: 'CNC-03', reason: 'Bearing Failure', category: 'Breakdown', lostUnits: 83, lostHrs: 4.7, oeeImpact: 8.4, status: 'breakdown' },
  { machine: 'PRESS-01', reason: 'No Plan / Idle', category: 'No Plan', lostUnits: 55, lostHrs: 3.3, oeeImpact: 5.9, status: 'noplan' },
  { machine: 'VMC-02', reason: 'Operator Break', category: 'Idle', lostUnits: 32, lostHrs: 1.9, oeeImpact: 3.4, status: 'idle' },
];

// Machine OEE trend (hourly) for Line Head
export const machineOEETrend = [
  { time: '10:00', CNC01: 94, CNC02: 90, VMC01: 87, LATHE01: 95 },
  { time: '11:00', CNC01: 92, CNC02: 88, VMC01: 85, LATHE01: 93 },
  { time: '12:00', CNC01: 88, CNC02: 84, VMC01: 82, LATHE01: 91 },
  { time: '13:00', CNC01: 90, CNC02: 86, VMC01: 83, LATHE01: 93 },
  { time: '14:00', CNC01: 91, CNC02: 88, VMC01: 85, LATHE01: 94 },
  { time: '15:00', CNC01: 91, CNC02: 88, VMC01: 85, LATHE01: 93 },
];

// OEE targets per metric
export const oeeTargets = {
  oee: 87.0, availability: 93.0, performance: 92.0, quality: 98.5,
  maxAvailLoss: 7.0, maxPerfLoss: 6.0, maxQualLoss: 1.5,
};
