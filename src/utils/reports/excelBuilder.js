/**
 * excelBuilder.js
 * Opus One Operational Intelligence Platform
 * Excel Workbook Builder — 7-sheet Executive Report
 *
 * Uses xlsx-js-style (browser-compatible build) with blob-based download.
 * All cell styles use the xlsx-js-style style schema (fill, font, alignment, border).
 */

import * as XLSX from 'xlsx';

import {
  generateReportMeta, generateHighlights, generateActions,
  computeBenchmarks, computePlantHealth, computeImprovements,
  computeMachineStatusSummary,
  mdKPIs, plantPerformanceTable, operationalLossContributors,
  oeeTrendData, shiftProductivityComparison, alarmHeatmapData,
} from './reportData.js';

// ─────────────────────────────────────────────────────────────────────────────
// Style palette — all colours as ARGB hex (no leading #)
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  DARK:   'FF050B18',
  DARK2:  'FF08101E',
  DARK3:  'FF0C162C',
  DARK4:  'FF0F1932',
  CYAN:   'FF38BDF8',
  WHITE:  'FFF0F6FF',
  MUTED:  'FF94A3B8',
  GREEN:  'FF10B981',
  GREEN_BG: 'FF064E3B',
  GREEN_FG: 'FF6EE7B7',
  RED:    'FFEF4444',
  RED_BG: 'FF7F1D1D',
  RED_FG: 'FFFCA5A5',
  AMBER:  'FFF59E0B',
  AMBER_BG: 'FF78350F',
  AMBER_FG: 'FFFDE68A',
  SLATE:  'FFCBD5E1',
  TEXT:   'FFE2E8F0',
};

// ─────────────────────────────────────────────────────────────────────────────
// Style factory functions
// ─────────────────────────────────────────────────────────────────────────────
const font = (color, sz = 9, bold = false) => ({
  name: 'Calibri', sz, bold, color: { rgb: color },
});
const fill = (rgb) => ({ fgColor: { rgb } });
const align = (h = 'left', wrap = false) => ({
  horizontal: h, vertical: 'center', wrapText: wrap,
});
const border = (style = 'thin', color = '1E3A5F') => ({
  top:    { style, color: { rgb: color } },
  bottom: { style, color: { rgb: color } },
  left:   { style, color: { rgb: color } },
  right:  { style, color: { rgb: color } },
});

// Pre-built styles
const S = {
  brandHeader: {
    fill: fill(P.DARK),
    font: font(P.CYAN, 13, true),
    alignment: align('center'),
  },
  subHeader: {
    fill: fill(P.DARK2),
    font: font(P.MUTED, 9),
    alignment: align('center'),
  },
  sectionTitle: {
    fill: fill(P.DARK4),
    font: font(P.CYAN, 10, true),
    alignment: align('left'),
    border: { bottom: { style: 'medium', color: { rgb: P.CYAN } } },
  },
  colHeader: {
    fill: fill(P.DARK4),
    font: font(P.MUTED, 9, true),
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: border(),
  },
  meta: {
    fill: fill(P.DARK2),
    font: font(P.MUTED, 9),
    alignment: align('left'),
  },
  metaVal: {
    fill: fill(P.DARK2),
    font: font(P.TEXT, 9, true),
    alignment: align('left'),
  },
  rowDark: {
    fill: fill(P.DARK2),
    font: font(P.SLATE, 9),
    alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
    border: border('hair'),
  },
  rowLight: {
    fill: fill(P.DARK3),
    font: font(P.SLATE, 9),
    alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
    border: border('hair'),
  },
  centerDark: {
    fill: fill(P.DARK2),
    font: font(P.SLATE, 9),
    alignment: align('center'),
    border: border('hair'),
  },
  good: {
    fill: fill(P.GREEN_BG),
    font: font(P.GREEN_FG, 10, true),
    alignment: align('center'),
    border: border('thin', P.GREEN_BG),
  },
  warn: {
    fill: fill(P.AMBER_BG),
    font: font(P.AMBER_FG, 10, true),
    alignment: align('center'),
    border: border('thin', P.AMBER_BG),
  },
  crit: {
    fill: fill(P.RED_BG),
    font: font(P.RED_FG, 10, true),
    alignment: align('center'),
    border: border('thin', P.RED_BG),
  },
  priHigh: {
    fill: fill(P.RED_BG),
    font: font(P.RED_FG, 9, true),
    alignment: align('center'),
    border: border('thin', P.RED_BG),
  },
  priMed: {
    fill: fill(P.AMBER_BG),
    font: font(P.AMBER_FG, 9, true),
    alignment: align('center'),
    border: border('thin', P.AMBER_BG),
  },
  priLow: {
    fill: fill(P.GREEN_BG),
    font: font(P.GREEN_FG, 9, true),
    alignment: align('center'),
    border: border('thin', P.GREEN_BG),
  },
  highlight: {
    fill: fill(P.DARK3),
    font: font(P.SLATE, 9),
    alignment: { horizontal: 'left', vertical: 'center', wrapText: true },
    border: border('hair'),
  },
  empty: {
    fill: fill(P.DARK),
    font: font(P.DARK, 9),
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Styled cell */
function sc(v, s) {
  if (v == null || v === '') return { v: '', t: 's', s: s || S.empty };
  const t = typeof v === 'number' ? 'n' : 's';
  return { v, t, s: s || S.rowDark };
}

/** OEE conditional style */
const oeeStyle = v =>
  v == null ? S.rowDark : v >= 80 ? S.good : v >= 70 ? S.warn : S.crit;

/** Quality conditional style */
const qualStyle = v =>
  v == null ? S.rowDark : v >= 97 ? S.good : v >= 95 ? S.warn : S.crit;

/** Downtime style (lower = better) */
const dtStyle = v =>
  v == null ? S.rowDark : v <= 40 ? S.good : v <= 60 ? S.warn : S.crit;

/** Priority style */
const priStyle = p =>
  p === 'HIGH' ? S.priHigh : p === 'MEDIUM' ? S.priMed : S.priLow;

/** Merge helper {s:{r,c}, e:{r,c}} */
const merge = (r1, c1, r2, c2) => ({ s: { r: r1, c: c1 }, e: { r: r2, c: c2 } });

/** Build worksheet from 2-D styled-cell array */
function buildWS(rows, merges = [], colWidths = []) {
  const ws = {};
  rows.forEach((row, r) => {
    row.forEach((cell, c) => {
      const addr = XLSX.utils.encode_cell({ r, c });
      ws[addr] = (cell && typeof cell === 'object' && 'v' in cell) ? cell : sc(cell);
    });
  });

  const maxR = rows.length - 1;
  const maxC = Math.max(...rows.map(r => r.length)) - 1;
  ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: maxR, c: maxC } });
  if (merges.length)    ws['!merges'] = merges;
  if (colWidths.length) ws['!cols']   = colWidths.map(w => ({ wch: w }));
  return ws;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 1 — Executive Summary
// ─────────────────────────────────────────────────────────────────────────────
function buildExecutiveSummarySheet(meta) {
  const benchmarks = computeBenchmarks();
  const plants     = computePlantHealth();
  const highlights = generateHighlights();
  const actions    = generateActions();
  const COLS       = 8;
  const E          = () => Array(COLS).fill(sc('', S.empty));
  const rows       = [];
  const merges     = [];

  // Brand header
  let r = rows.length;
  rows.push([sc('OPUS ONE INDUSTRIES — Executive Manufacturing Intelligence Report', S.brandHeader),
    ...Array(COLS - 1).fill(sc('', S.brandHeader))]);
  merges.push(merge(r, 0, r, COLS - 1));

  r = rows.length;
  rows.push([sc(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}  |  By: ${meta.generatedBy} — ${meta.role}`, S.subHeader),
    ...Array(COLS - 1).fill(sc('', S.subHeader))]);
  merges.push(merge(r, 0, r, COLS - 1));

  rows.push(E());

  // KPI section
  r = rows.length;
  rows.push([sc('KPI PERFORMANCE DASHBOARD — CURRENT VS. TARGET', S.sectionTitle),
    ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
  merges.push(merge(r, 0, r, COLS - 1));

  rows.push([
    sc('KPI Metric', S.colHeader), sc('Value', S.colHeader), sc('Unit', S.colHeader),
    sc('Target', S.colHeader),     sc('Gap', S.colHeader),   sc('Trend', S.colHeader),
    sc('Status', S.colHeader),     sc('', S.colHeader),
  ]);

  benchmarks.forEach(kpi => {
    const gapStr = kpi.gap != null ? `${kpi.gap >= 0 ? '+' : ''}${kpi.gap}` : 'N/A';
    const stStr  = kpi.status === 'good' ? 'ON TARGET' : kpi.status === 'warning' ? 'BELOW TARGET' : 'CRITICAL';
    const ss     = kpi.status === 'good' ? S.good : kpi.status === 'warning' ? S.warn : S.crit;
    rows.push([
      sc(kpi.label, S.highlight), sc(kpi.value, oeeStyle(kpi.value)),
      sc(kpi.unit, S.rowDark),   sc(kpi.target ?? 'N/A', S.rowDark),
      sc(gapStr, ss),
      sc(`${kpi.trend >= 0 ? '+' : ''}${kpi.trend}`, S.rowDark),
      sc(stStr, ss), sc('', S.empty),
    ]);
  });

  rows.push(E());

  // Plant section
  r = rows.length;
  rows.push([sc('PLANT PERFORMANCE RANKING & HEALTH STATUS', S.sectionTitle),
    ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
  merges.push(merge(r, 0, r, COLS - 1));

  rows.push([
    sc('Rank', S.colHeader), sc('Plant Facility', S.colHeader), sc('OEE %', S.colHeader),
    sc('Avail %', S.colHeader), sc('Perf %', S.colHeader), sc('Quality %', S.colHeader),
    sc('Downtime (h)', S.colHeader), sc('Health', S.colHeader),
  ]);

  plants.forEach((p, i) => {
    const hs = p.status === 'good' ? S.good : p.status === 'warning' ? S.warn : S.crit;
    const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
    rows.push([
      sc(p.rankLabel, { ...S.centerDark, font: font(P.CYAN, 10, true) }),
      sc(p.plant,     rs),
      sc(p.oee,       oeeStyle(p.oee)),
      sc(p.avail,     oeeStyle(p.avail)),
      sc(p.perf,      oeeStyle(p.perf)),
      sc(p.qual,      qualStyle(p.qual)),
      sc(p.downtime,  dtStyle(p.downtime)),
      sc(p.healthLabel, hs),
    ]);
  });

  rows.push(E());

  // Highlights
  r = rows.length;
  rows.push([sc('KEY HIGHLIGHTS — REPORTING PERIOD', S.sectionTitle),
    ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
  merges.push(merge(r, 0, r, COLS - 1));

  highlights.forEach((h, i) => {
    r = rows.length;
    rows.push([sc(`${i + 1}.  ${h}`, S.highlight), ...Array(COLS - 1).fill(sc('', S.empty))]);
    merges.push(merge(r, 0, r, COLS - 1));
  });

  rows.push(E());

  // Actions
  r = rows.length;
  rows.push([sc('RECOMMENDED ACTIONS — PRIORITY MATRIX', S.sectionTitle),
    ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
  merges.push(merge(r, 0, r, COLS - 1));

  rows.push([
    sc('Priority', S.colHeader), sc('Focus Area', S.colHeader), sc('Scope', S.colHeader),
    sc('Impact', S.colHeader), sc('Recommended Action', S.colHeader),
    sc('', S.colHeader), sc('', S.colHeader), sc('', S.colHeader),
  ]);

  actions.forEach(a => {
    r = rows.length;
    rows.push([
      sc(a.priority, priStyle(a.priority)), sc(a.area, S.rowDark), sc(a.plant, S.rowDark),
      sc(a.impact, S.rowDark), sc(a.action, S.highlight),
      sc('', S.empty), sc('', S.empty), sc('', S.empty),
    ]);
    merges.push(merge(r, 4, r, COLS - 1));
  });

  return buildWS(rows, merges, [12, 26, 10, 12, 12, 18, 14, 14]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 2 — Plant Comparison
// ─────────────────────────────────────────────────────────────────────────────
function buildPlantComparisonSheet(meta) {
  const plants = computePlantHealth();
  const COLS   = 8;
  const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

  const rows = [
    H('Opus One Industries — Plant Performance Comparison'),
    H(`Generated: ${meta.generatedAt}  |  Report ID: ${meta.reportId}`),
    Array(COLS).fill(sc('', S.empty)),
    [
      sc('Plant Facility', S.colHeader), sc('OEE %', S.colHeader), sc('Avail %', S.colHeader),
      sc('Perf %', S.colHeader), sc('Quality %', S.colHeader), sc('Downtime (h)', S.colHeader),
      sc('Machines', S.colHeader), sc('Health', S.colHeader),
    ],
    ...plants.map((p, i) => {
      const hs = p.status === 'good' ? S.good : p.status === 'warning' ? S.warn : S.crit;
      const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
      return [
        sc(p.plant, rs),         sc(p.oee,      oeeStyle(p.oee)),
        sc(p.avail, oeeStyle(p.avail)), sc(p.perf, oeeStyle(p.perf)),
        sc(p.qual,  qualStyle(p.qual)), sc(p.downtime, dtStyle(p.downtime)),
        sc(p.machines, S.centerDark),   sc(p.healthLabel, hs),
      ];
    }),
  ];

  const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
  return buildWS(rows, merges, [30, 10, 10, 10, 10, 13, 10, 14]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 3 — OEE Trend
// ─────────────────────────────────────────────────────────────────────────────
function buildOEETrendSheet(meta) {
  const trend = oeeTrendData.monthly.filter(d => d.oee != null);
  const COLS  = 5;
  const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

  const rows = [
    H('Opus One Industries — OEE Trend Analysis (YTD 2026)'),
    H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
    Array(COLS).fill(sc('', S.empty)),
    [
      sc('Month', S.colHeader), sc('OEE %', S.colHeader), sc('Availability %', S.colHeader),
      sc('Performance %', S.colHeader), sc('Quality %', S.colHeader),
    ],
    ...trend.map((d, i) => {
      const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
      return [
        sc(d.label, { ...rs, font: font(P.CYAN, 9, true) }),
        sc(d.oee,          oeeStyle(d.oee)),
        sc(d.availability, oeeStyle(d.availability)),
        sc(d.performance,  oeeStyle(d.performance)),
        sc(d.quality,      qualStyle(d.quality)),
      ];
    }),
  ];

  const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
  return buildWS(rows, merges, [12, 10, 16, 16, 12]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 4 — Downtime Analysis
// ─────────────────────────────────────────────────────────────────────────────
function buildDowntimeSheet(meta) {
  const imps  = computeImprovements();
  const total = imps.reduce((s, r) => s + r.hours, 0);
  const COLS  = 7;
  const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

  const catStyle = cat =>
    cat === 'Availability' ? S.crit : cat === 'Performance' ? S.warn : S.priMed;

  const rows = [
    H('Opus One Industries — Downtime Pareto Analysis'),
    H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
    Array(COLS).fill(sc('', S.empty)),
    [
      sc('Rank', S.colHeader), sc('Loss Category', S.colHeader), sc('Hours Lost', S.colHeader),
      sc('% Share', S.colHeader), sc('Cumulative %', S.colHeader),
      sc('OEE Category', S.colHeader), sc('Primary Location', S.colHeader),
    ],
    ...imps.map((r, i) => {
      const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
      return [
        sc(`#${i + 1}`, { ...S.centerDark, font: font(P.CYAN, 9, true) }),
        sc(r.cause, rs),
        sc(r.hours, r.hours >= 30 ? S.crit : r.hours >= 15 ? S.warn : S.good),
        sc(`${r.percent}%`, rs),
        sc(`${r.cumulativePercent}%`, rs),
        sc(r.category, catStyle(r.category)),
        sc(`${r.mostAffectedPlant} — ${r.primaryContributor}`, rs),
      ];
    }),
    [
      sc('TOTAL', S.colHeader), sc('', S.colHeader),
      sc(total, { ...S.colHeader, font: font(P.RED_FG, 10, true) }),
      sc('100%', S.colHeader), sc('', S.colHeader), sc('', S.colHeader), sc('', S.colHeader),
    ],
  ];

  const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
  return buildWS(rows, merges, [8, 26, 12, 12, 14, 16, 30]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 5 — Shift Performance
// ─────────────────────────────────────────────────────────────────────────────
function buildShiftSheet(meta) {
  const COLS = 6;
  const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

  const rows = [
    H('Opus One Industries — Shift Productivity Intelligence'),
    H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
    Array(COLS).fill(sc('', S.empty)),
    [
      sc('Shift', S.colHeader), sc('Plant A — Pune', S.colHeader), sc('Plant B — Nashik', S.colHeader),
      sc('Plant C — Chennai', S.colHeader), sc('Plant D — Ahmedabad', S.colHeader),
      sc('Enterprise Avg', S.colHeader),
    ],
    ...shiftProductivityComparison.map((s, i) => {
      const avg = (s.plantA + s.plantB + s.plantC + s.plantD) / 4;
      const rs  = i % 2 === 0 ? S.rowDark : S.rowLight;
      return [
        sc(s.shift, { ...rs, font: font(P.CYAN, 9, true) }),
        sc(s.plantA, oeeStyle(s.plantA)), sc(s.plantB, oeeStyle(s.plantB)),
        sc(s.plantC, oeeStyle(s.plantC)), sc(s.plantD, oeeStyle(s.plantD)),
        sc(+avg.toFixed(1), oeeStyle(avg)),
      ];
    }),
  ];

  const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
  return buildWS(rows, merges, [14, 18, 18, 18, 20, 18]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 6 — Machine Status
// ─────────────────────────────────────────────────────────────────────────────
function buildMachineStatusSheet(meta) {
  const summary = computeMachineStatusSummary();
  const COLS    = 4;
  const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

  const statusStyle = name =>
    name === 'Running'   ? S.good :
    name === 'Breakdown' ? S.crit :
    name === 'Idle'      ? S.warn : S.rowDark;

  const statusNote = name =>
    name === 'Running'   ? 'Normal production — no intervention required' :
    name === 'Idle'      ? 'No plan or operator on break' :
    name === 'Breakdown' ? 'Machine failure — immediate maintenance required' :
    'Scheduled downtime or no production order assigned';

  const rows = [
    H('Opus One Industries — Enterprise Machine Status Summary'),
    H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
    Array(COLS).fill(sc('', S.empty)),
    [
      sc('Status', S.colHeader), sc('Count', S.colHeader),
      sc('% Fleet', S.colHeader), sc('Description', S.colHeader),
    ],
    ...summary.map((s, i) => {
      const ss = statusStyle(s.status);
      const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
      return [
        sc(s.status, ss),
        sc(s.count, S.centerDark),
        sc(`${s.percentage}%`, S.centerDark),
        sc(statusNote(s.status), rs),
      ];
    }),
    Array(COLS).fill(sc('', S.empty)),
    [sc(`Total Fleet: ${summary[0]?.total ?? 0} machines`, S.meta),
     sc('', S.empty), sc('', S.empty), sc('', S.empty)],
  ];

  const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
  return buildWS(rows, merges, [18, 10, 12, 44]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sheet 7 — Raw Data (no styling needed)
// ─────────────────────────────────────────────────────────────────────────────
function buildRawDataSheet() {
  const aoa = [
    ['CATEGORY', 'KEY', 'LABEL', 'VALUE', 'UNIT', 'TREND'],
    ...Object.entries(mdKPIs).map(([k, v]) =>
      ['Company KPI', k, v.label, v.value, v.unit, v.trend],
    ),
    [],
    ['PLANT', 'OEE', 'AVAIL', 'PERF', 'QUAL', 'DOWNTIME', 'MACHINES', 'STATUS'],
    ...plantPerformanceTable.map(p =>
      [p.plant, p.oee, p.avail, p.perf, p.qual, p.downtime, p.machines, p.status],
    ),
    [],
    ['LOSS CAUSE', 'HOURS', 'PERCENT', 'CATEGORY', 'AFFECTED PLANT', 'PRIMARY CONTRIBUTOR'],
    ...operationalLossContributors.map(r =>
      [r.cause, r.hours, `${r.percent}%`, r.category, r.mostAffectedPlant, r.primaryContributor],
    ),
    [],
    ['SHIFT', 'PLANT A', 'PLANT B', 'PLANT C', 'PLANT D'],
    ...shiftProductivityComparison.map(s =>
      [s.shift, s.plantA, s.plantB, s.plantC, s.plantD],
    ),
  ];
  return XLSX.utils.aoa_to_sheet(aoa);
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser-safe file download via Blob
// ─────────────────────────────────────────────────────────────────────────────
function downloadWorkbook(wb, filename) {
  const wbOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob  = new Blob([wbOut], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export function buildExcel(user) {
  const meta = generateReportMeta(user);
  const wb   = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, buildExecutiveSummarySheet(meta), 'Executive Summary');
  XLSX.utils.book_append_sheet(wb, buildPlantComparisonSheet(meta),  'Plant Comparison');
  XLSX.utils.book_append_sheet(wb, buildOEETrendSheet(meta),         'OEE Trend Analysis');
  XLSX.utils.book_append_sheet(wb, buildDowntimeSheet(meta),         'Downtime Analysis');
  XLSX.utils.book_append_sheet(wb, buildShiftSheet(meta),            'Shift Performance');
  XLSX.utils.book_append_sheet(wb, buildMachineStatusSheet(meta),    'Machine Status');
  XLSX.utils.book_append_sheet(wb, buildRawDataSheet(),               'Raw Data');

  downloadWorkbook(wb, `OpusOne_Executive_Intelligence_Report_${meta.dateTag}.xlsx`);
}
