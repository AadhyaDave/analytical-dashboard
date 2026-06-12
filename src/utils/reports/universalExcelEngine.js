/**
 * universalExcelEngine.js
 * Opus One Operational Intelligence Platform
 * Universal Excel Workbook Builder — 7-sheet Executive Report
 */

import * as XLSX from 'xlsx';
import { generateReportMeta } from './reportData.js';

// ─────────────────────────────────────────────────────────────────────────────
// Style palette
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  DARK:   'FF050B18', DARK2:  'FF08101E', DARK3:  'FF0C162C', DARK4:  'FF0F1932',
  CYAN:   'FF38BDF8', WHITE:  'FFF0F6FF', MUTED:  'FF94A3B8',
  GREEN:  'FF10B981', GREEN_BG: 'FF064E3B', GREEN_FG: 'FF6EE7B7',
  RED:    'FFEF4444', RED_BG: 'FF7F1D1D', RED_FG: 'FFFCA5A5',
  AMBER:  'FFF59E0B', AMBER_BG: 'FF78350F', AMBER_FG: 'FFFDE68A',
  SLATE:  'FFCBD5E1', TEXT:   'FFE2E8F0',
};

const font = (color, sz = 9, bold = false) => ({ name: 'Calibri', sz, bold, color: { rgb: color } });
const fill = (rgb) => ({ fgColor: { rgb } });
const align = (h = 'left', wrap = false) => ({ horizontal: h, vertical: 'center', wrapText: wrap });
const border = (style = 'thin', color = '1E3A5F') => ({
  top: { style, color: { rgb: color } }, bottom: { style, color: { rgb: color } },
  left: { style, color: { rgb: color } }, right: { style, color: { rgb: color } },
});

const S = {
  brandHeader: { fill: fill(P.DARK), font: font(P.CYAN, 13, true), alignment: align('center') },
  subHeader: { fill: fill(P.DARK2), font: font(P.MUTED, 9), alignment: align('center') },
  sectionTitle: { fill: fill(P.DARK4), font: font(P.CYAN, 10, true), alignment: align('left'), border: { bottom: { style: 'medium', color: { rgb: P.CYAN } } } },
  colHeader: { fill: fill(P.DARK4), font: font(P.MUTED, 9, true), alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, border: border() },
  meta: { fill: fill(P.DARK2), font: font(P.MUTED, 9), alignment: align('left') },
  rowDark: { fill: fill(P.DARK2), font: font(P.SLATE, 9), alignment: { horizontal: 'left', vertical: 'center', wrapText: true }, border: border('hair') },
  rowLight: { fill: fill(P.DARK3), font: font(P.SLATE, 9), alignment: { horizontal: 'left', vertical: 'center', wrapText: true }, border: border('hair') },
  centerDark: { fill: fill(P.DARK2), font: font(P.SLATE, 9), alignment: align('center'), border: border('hair') },
  good: { fill: fill(P.GREEN_BG), font: font(P.GREEN_FG, 10, true), alignment: align('center'), border: border('thin', P.GREEN_BG) },
  warn: { fill: fill(P.AMBER_BG), font: font(P.AMBER_FG, 10, true), alignment: align('center'), border: border('thin', P.AMBER_BG) },
  crit: { fill: fill(P.RED_BG), font: font(P.RED_FG, 10, true), alignment: align('center'), border: border('thin', P.RED_BG) },
  priHigh: { fill: fill(P.RED_BG), font: font(P.RED_FG, 9, true), alignment: align('center'), border: border('thin', P.RED_BG) },
  priMed: { fill: fill(P.AMBER_BG), font: font(P.AMBER_FG, 9, true), alignment: align('center'), border: border('thin', P.AMBER_BG) },
  priLow: { fill: fill(P.GREEN_BG), font: font(P.GREEN_FG, 9, true), alignment: align('center'), border: border('thin', P.GREEN_BG) },
  highlight: { fill: fill(P.DARK3), font: font(P.SLATE, 9), alignment: { horizontal: 'left', vertical: 'center', wrapText: true }, border: border('hair') },
  empty: { fill: fill(P.DARK), font: font(P.DARK, 9) },
};

function sc(v, s) {
  if (v == null || v === '') return { v: '', t: 's', s: s || S.empty };
  const t = typeof v === 'number' ? 'n' : 's';
  return { v, t, s: s || S.rowDark };
}

const oeeStyle = v => v == null ? S.rowDark : v >= 80 ? S.good : v >= 70 ? S.warn : S.crit;
const qualStyle = v => v == null ? S.rowDark : v >= 97 ? S.good : v >= 95 ? S.warn : S.crit;
const dtStyle = v => v == null ? S.rowDark : v <= 40 ? S.good : v <= 60 ? S.warn : S.crit;
const priStyle = p => p === 'HIGH' ? S.priHigh : p === 'MEDIUM' ? S.priMed : S.priLow;
const merge = (r1, c1, r2, c2) => ({ s: { r: r1, c: c1 }, e: { r: r2, c: c2 } });

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
  if (merges.length) ws['!merges'] = merges;
  if (colWidths.length) ws['!cols'] = colWidths.map(w => ({ wch: w }));
  return ws;
}

// ─────────────────────────────────────────────────────────────────────────────
// Engine
// ─────────────────────────────────────────────────────────────────────────────
export function generateUniversalExcel(user, roleType, config, data) {
  const meta = generateReportMeta(user, roleType);
  const wb = XLSX.utils.book_new();

  // 1. Executive Summary
  const buildExecutiveSummarySheet = () => {
    const COLS = 8;
    const E = () => Array(COLS).fill(sc('', S.empty));
    const rows = [], merges = [];
    
    let r = rows.length;
    rows.push([sc(`OPUS ONE INDUSTRIES — ${config.reportTitle}`, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))]);
    merges.push(merge(r, 0, r, COLS - 1));

    r = rows.length;
    rows.push([sc(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}  |  By: ${meta.generatedBy} — ${meta.role}`, S.subHeader), ...Array(COLS - 1).fill(sc('', S.subHeader))]);
    merges.push(merge(r, 0, r, COLS - 1));

    rows.push(E());

    r = rows.length;
    rows.push([sc(config.page2_1_Title, S.sectionTitle), ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
    merges.push(merge(r, 0, r, COLS - 1));

    rows.push([
      sc('KPI Metric', S.colHeader), sc('Value', S.colHeader), sc('Unit', S.colHeader),
      sc('Target', S.colHeader), sc('Gap', S.colHeader), sc('Status', S.colHeader),
      sc('', S.colHeader), sc('', S.colHeader)
    ]);

    data.kpis.forEach(kpi => {
      const gapStr = kpi.gap != null ? `${kpi.gap >= 0 ? '+' : ''}${kpi.gap}` : 'N/A';
      const stStr  = kpi.status === 'good' ? 'ON TARGET' : kpi.status === 'warning' ? 'BELOW TARGET' : 'CRITICAL';
      const ss     = kpi.status === 'good' ? S.good : kpi.status === 'warning' ? S.warn : S.crit;
      rows.push([
        sc(kpi.label || kpi.key, S.highlight), sc(kpi.value, oeeStyle(kpi.value)),
        sc(kpi.unit || '%', S.rowDark), sc(kpi.target ?? 'N/A', S.rowDark),
        sc(gapStr, ss), sc(stStr, ss), sc('', S.empty), sc('', S.empty)
      ]);
    });

    rows.push(E());

    r = rows.length;
    rows.push([sc(config.page2_2_Title, S.sectionTitle), ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
    merges.push(merge(r, 0, r, COLS - 1));

    rows.push(config.rankingTableColumns.map(col => sc(col, S.colHeader)));

    data.healthOverview.forEach((p, i) => {
      const hs = p.status === 'good' ? S.good : p.status === 'warning' ? S.warn : S.crit;
      const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
      rows.push([
        sc(p.rankLabel, { ...S.centerDark, font: font(P.CYAN, 10, true) }),
        sc(p.name, rs), sc(p.oee, oeeStyle(p.oee)), sc(p.avail, oeeStyle(p.avail)),
        sc(p.perf, oeeStyle(p.perf)), sc(p.qual, qualStyle(p.qual)),
        sc(p.downtime, dtStyle(p.downtime)), sc(p.healthLabel, hs)
      ]);
    });

    rows.push(E());

    r = rows.length;
    rows.push([sc('KEY HIGHLIGHTS — REPORTING PERIOD', S.sectionTitle), ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
    merges.push(merge(r, 0, r, COLS - 1));

    data.highlights.forEach((h, i) => {
      r = rows.length;
      rows.push([sc(`${i + 1}.  ${h}`, S.highlight), ...Array(COLS - 1).fill(sc('', S.empty))]);
      merges.push(merge(r, 0, r, COLS - 1));
    });

    rows.push(E());

    r = rows.length;
    rows.push([sc('RECOMMENDED ACTIONS — PRIORITY MATRIX', S.sectionTitle), ...Array(COLS - 1).fill(sc('', S.sectionTitle))]);
    merges.push(merge(r, 0, r, COLS - 1));

    rows.push([
      sc('Priority', S.colHeader), sc('Focus Area', S.colHeader), sc('Scope', S.colHeader),
      sc('Impact', S.colHeader), sc('Recommended Action', S.colHeader),
      sc('', S.colHeader), sc('', S.colHeader), sc('', S.colHeader),
    ]);

    data.actions.forEach(a => {
      r = rows.length;
      rows.push([
        sc(a.priority, priStyle(a.priority)), sc(a.area, S.rowDark), sc(a.scope, S.rowDark),
        sc(a.impact, S.rowDark), sc(a.action, S.highlight),
        sc('', S.empty), sc('', S.empty), sc('', S.empty),
      ]);
      merges.push(merge(r, 4, r, COLS - 1));
    });

    return buildWS(rows, merges, [12, 26, 10, 12, 12, 18, 14, 14]);
  };

  // 2. Ranking Comparison
  const buildComparisonSheet = () => {
    const COLS = config.rankingTableColumns.length;
    const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

    const rows = [
      H(`Opus One Industries — ${config.page2_2_Title}`),
      H(`Generated: ${meta.generatedAt}  |  Report ID: ${meta.reportId}`),
      Array(COLS).fill(sc('', S.empty)),
      config.rankingTableColumns.map(col => sc(col, S.colHeader)),
      ...data.healthOverview.map((p, i) => {
        const hs = p.status === 'good' ? S.good : p.status === 'warning' ? S.warn : S.crit;
        const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
        return [
          sc(p.rankLabel, { ...S.centerDark, font: font(P.CYAN, 10, true) }),
          sc(p.name, rs), sc(p.oee, oeeStyle(p.oee)), sc(p.avail, oeeStyle(p.avail)),
          sc(p.perf, oeeStyle(p.perf)), sc(p.qual, qualStyle(p.qual)),
          sc(p.downtime, dtStyle(p.downtime)), sc(p.healthLabel, hs)
        ];
      }),
    ];

    const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
    return buildWS(rows, merges, [12, 30, 10, 10, 10, 10, 13, 14]);
  };

  // 3. Trend Analysis
  const buildTrendSheet = () => {
    const COLS = 2;
    const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

    const rows = [
      H(`Opus One Industries — ${config.page3_4_Title}`),
      H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
      Array(COLS).fill(sc('', S.empty)),
      [sc('Time/Period', S.colHeader), sc('OEE %', S.colHeader)],
      ...data.trendData.map((d, i) => {
        const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
        return [
          sc(d.label || d.time, { ...rs, font: font(P.CYAN, 9, true) }),
          sc(d.oee, oeeStyle(d.oee))
        ];
      }),
    ];

    const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
    return buildWS(rows, merges, [16, 12]);
  };

  // 4. Downtime Analysis
  const buildDowntimeSheet = () => {
    const total = data.improvements.reduce((s, r) => s + r.hours, 0);
    const COLS = config.improvementColumns.length;
    const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

    const catStyle = cat => cat === 'Availability' ? S.crit : cat === 'Performance' ? S.warn : S.priMed;

    const rows = [
      H(`Opus One Industries — ${config.page4_7_Title}`),
      H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
      Array(COLS).fill(sc('', S.empty)),
      config.improvementColumns.map(col => sc(col, S.colHeader)),
      ...data.improvements.map((r, i) => {
        const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
        return [
          sc(`#${i + 1}`, { ...S.centerDark, font: font(P.CYAN, 9, true) }),
          sc(r.cause, rs),
          sc(r.hours, r.hours >= 30 ? S.crit : r.hours >= 15 ? S.warn : S.good),
          sc(r.availabilityImpact, rs),
          sc(r.potentialOEEGain, rs),
          sc(r.cumulativePercent, rs),
          sc(`${r.mostAffectedPlant} — ${r.primaryContributor}`, rs),
        ];
      }),
      [
        sc('TOTAL', S.colHeader), sc('', S.colHeader),
        sc(total, { ...S.colHeader, font: font(P.RED_FG, 10, true) }),
        ...Array(COLS - 3).fill(sc('', S.colHeader))
      ],
    ];

    const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
    return buildWS(rows, merges, [8, 26, 12, 12, 14, 16, 30]);
  };

  // 5. Shift/Productivity Analysis
  const buildProductivitySheet = () => {
    const COLS = config.productivityColumns.length;
    const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

    const rows = [
      H(`Opus One Industries — ${config.page3_5_Title}`),
      H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
      Array(COLS).fill(sc('', S.empty)),
      config.productivityColumns.map(col => sc(col, S.colHeader)),
      ...data.productivityComparison.map((rowArr, i) => {
        const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
        return rowArr.map((val, cIdx) => {
          if (cIdx === 0) return sc(val, { ...rs, font: font(P.CYAN, 9, true) });
          const numericVal = parseFloat(val);
          return sc(numericVal, oeeStyle(numericVal));
        });
      }),
    ];

    const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
    return buildWS(rows, merges, [14, 18, 18, 18, 20, 18]);
  };

  // 6. Alert Analysis
  const buildAlertSheet = () => {
    const COLS = config.alertAnalysisColumns.length;
    const H = (v) => [sc(v, S.brandHeader), ...Array(COLS - 1).fill(sc('', S.brandHeader))];

    const rows = [
      H(`Opus One Industries — ${config.page3_6_Title}`),
      H(`Report ID: ${meta.reportId}  |  Generated: ${meta.generatedAt}`),
      Array(COLS).fill(sc('', S.empty)),
      config.alertAnalysisColumns.map(col => sc(col, S.colHeader)),
      ...data.alertAnalysis.map((rowArr, i) => {
        const rs = i % 2 === 0 ? S.rowDark : S.rowLight;
        return rowArr.map((val, cIdx) => {
          if (cIdx === 0) return sc(val, rs);
          if (cIdx === COLS - 1) {
            const st = val === 'Decreasing' ? S.good : val === 'Increasing' ? S.crit : rs;
            return sc(val, st);
          }
          const numericVal = parseInt(val);
          return sc(numericVal, numericVal <= 5 ? S.good : numericVal <= 10 ? S.warn : S.crit);
        });
      }),
    ];

    const merges = [merge(0, 0, 0, COLS - 1), merge(1, 0, 1, COLS - 1), merge(2, 0, 2, COLS - 1)];
    return buildWS(rows, merges, [20, 10, 10, 10, 10, 10, 14]);
  };

  // 7. Raw Data
  const buildRawDataSheet = () => {
    const aoa = [
      ['KEY', 'VALUE'],
      ['Report Type', config.documentTitle],
      ['Entity Scope', config.entityName],
    ];
    return XLSX.utils.aoa_to_sheet(aoa);
  };

  function downloadWorkbook(wb, filename) {
    const wbOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbOut], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  XLSX.utils.book_append_sheet(wb, buildExecutiveSummarySheet(), 'Executive Summary');
  XLSX.utils.book_append_sheet(wb, buildComparisonSheet(), `${config.childEntityLabel} Comparison`);
  XLSX.utils.book_append_sheet(wb, buildTrendSheet(), 'Trend Analysis');
  XLSX.utils.book_append_sheet(wb, buildDowntimeSheet(), 'Downtime Analysis');
  XLSX.utils.book_append_sheet(wb, buildProductivitySheet(), 'Productivity Intelligence');
  XLSX.utils.book_append_sheet(wb, buildAlertSheet(), 'Alert Analysis');
  XLSX.utils.book_append_sheet(wb, buildRawDataSheet(), 'Raw Data');

  downloadWorkbook(wb, `OpusOne_${config.filenamePrefix}_${meta.dateTag}.xlsx`);
}
