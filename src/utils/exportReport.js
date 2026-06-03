/**
 * exportReport.js
 * Opus One Analytics Dashboard — Report Export Utility
 * Supports: Excel (.xlsx) and PDF
 */

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  mdKPIs,
  plantPerformanceTable,
  operationalLossContributors,
  oeeTrendData,
  shiftProductivityComparison,
  alarmHeatmapData,
  predictiveInsights,
} from '../data/mockData';

// ─── Helpers ────────────────────────────────────────────────────────────────

const now = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
const dateTag = () => new Date().toISOString().slice(0, 10);

// ─── EXCEL EXPORT ────────────────────────────────────────────────────────────

export function exportExcel(user) {
  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Company KPIs ──────────────────────────────────────────────────
  const kpiRows = [
    ['Opus One Industries — Company KPI Report'],
    [`Generated: ${now()}  |  User: ${user?.name || 'N/A'}  |  Role: ${user?.role || 'N/A'}`],
    [],
    ['Metric', 'Value', 'Unit', 'Trend'],
    ...Object.entries(mdKPIs).map(([key, kpi]) => [
      kpi.label,
      kpi.value,
      kpi.unit,
      kpi.trend > 0 ? `+${kpi.trend}` : String(kpi.trend),
    ]),
  ];
  const wsKPI = XLSX.utils.aoa_to_sheet(kpiRows);
  wsKPI['!cols'] = [{ wch: 24 }, { wch: 10 }, { wch: 8 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, wsKPI, 'Company KPIs');

  // ── Sheet 2: Plant Performance ─────────────────────────────────────────────
  const plantRows = [
    ['Plant', 'OEE %', 'Availability %', 'Performance %', 'Quality %', 'Downtime (hrs)', 'Machines', 'Status'],
    ...plantPerformanceTable.map(r => [
      r.plant, r.oee, r.avail, r.perf, r.qual, r.downtime, r.machines, r.status.toUpperCase(),
    ]),
  ];
  const wsPlant = XLSX.utils.aoa_to_sheet(plantRows);
  wsPlant['!cols'] = [{ wch: 26 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 10 }, { wch: 16 }, { wch: 10 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, wsPlant, 'Plant Performance');

  // ── Sheet 3: OEE Trend (YTD) ───────────────────────────────────────────────
  const trendRows = [
    ['Month', 'OEE %', 'Availability %', 'Performance %', 'Quality %'],
    ...oeeTrendData.monthly
      .filter(r => r.oee != null)
      .map(r => [r.label, r.oee, r.availability, r.performance, r.quality]),
  ];
  const wsTrend = XLSX.utils.aoa_to_sheet(trendRows);
  wsTrend['!cols'] = [{ wch: 10 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, wsTrend, 'OEE Trend YTD');

  // ── Sheet 4: Top Downtime Causes ───────────────────────────────────────────
  const dtRows = [
    ['Downtime Cause', 'Hours Lost', '% Share', 'Category'],
    ...operationalLossContributors.map(r => [r.cause, r.hours, `${r.percent}%`, r.category]),
    [],
    ['TOTAL', operationalLossContributors.reduce((s, r) => s + r.hours, 0), '100%', ''],
  ];
  const wsDT = XLSX.utils.aoa_to_sheet(dtRows);
  wsDT['!cols'] = [{ wch: 28 }, { wch: 12 }, { wch: 10 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsDT, 'Downtime Causes');

  // ── Sheet 5: Shift Productivity ────────────────────────────────────────────
  const shiftRows = [
    ['Shift', 'Plant A OEE %', 'Plant B OEE %', 'Plant C OEE %', 'Plant D OEE %'],
    ...shiftProductivityComparison.map(r => [r.shift, r.plantA, r.plantB, r.plantC, r.plantD]),
  ];
  const wsShift = XLSX.utils.aoa_to_sheet(shiftRows);
  wsShift['!cols'] = [{ wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsShift, 'Shift Productivity');

  // ── Sheet 6: Andon Alert Summary ───────────────────────────────────────────
  const andonRows = [
    ['Plant', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total Alerts'],
    ...alarmHeatmapData.map(r => [
      r.label, r.W1, r.W2, r.W3, r.W4, r.W1 + r.W2 + r.W3 + r.W4,
    ]),
  ];
  const wsAndon = XLSX.utils.aoa_to_sheet(andonRows);
  wsAndon['!cols'] = [{ wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsAndon, 'Andon Alert Summary');

  XLSX.writeFile(wb, `OpusOne_Dashboard_Report_${dateTag()}.xlsx`);
}

// ─── PDF EXPORT ───────────────────────────────────────────────────────────────

export function exportPDF(user) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  let y = 0;

  // ── Colour palette ────────────────────────────────────────────────────────
  const DARK = [5, 11, 24];
  const CYAN = [56, 189, 248];
  const WHITE = [240, 246, 255];
  const MUTED = [74, 96, 128];
  const GREEN = [16, 185, 129];
  const RED = [239, 68, 68];
  const AMBER = [245, 158, 11];

  // ── Cover background ──────────────────────────────────────────────────────
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 60, 'F');

  // Accent line
  doc.setFillColor(...CYAN);
  doc.rect(0, 56, pageW, 1.5, 'F');

  // Logo text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...CYAN);
  doc.text('OPUS ONE', 14, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text('OEE Intelligence Platform', 14, 29);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...WHITE);
  doc.text('Manufacturing Analytics Report', 14, 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(`Generated: ${now()}`, 14, 49);
  doc.text(`User: ${user?.name || 'N/A'}  |  Role: ${user?.role || 'N/A'}`, 14, 54);

  y = 70;

  // ── Section helper ────────────────────────────────────────────────────────
  const sectionTitle = (title) => {
    doc.setFillColor(...DARK);
    doc.rect(0, y - 5, pageW, 10, 'F');
    doc.setFillColor(...CYAN);
    doc.rect(10, y - 4, 3, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...CYAN);
    doc.text(title, 16, y + 1);
    y += 10;
  };

  // ── 1. Company KPIs ───────────────────────────────────────────────────────
  sectionTitle('1. Company-Wide KPIs');

  const kpiData = Object.entries(mdKPIs).map(([, kpi]) => [
    kpi.label,
    `${kpi.value}${kpi.unit}`,
    kpi.trend > 0 ? `▲ +${kpi.trend}` : `▼ ${kpi.trend}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Metric', 'Current Value', 'Trend vs Last Month']],
    body: kpiData,
    theme: 'grid',
    headStyles: { fillColor: [15, 25, 50], textColor: CYAN, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fillColor: [8, 16, 36], textColor: WHITE, fontSize: 8 },
    alternateRowStyles: { fillColor: [12, 22, 44] },
    columnStyles: {
      2: {
        cellCallback: function (cell) {
          if (cell.raw?.toString().startsWith('▲')) doc.setTextColor(...GREEN);
          else doc.setTextColor(...RED);
        },
      },
    },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // ── 2. Plant Performance ──────────────────────────────────────────────────
  sectionTitle('2. Plant Performance Summary');

  autoTable(doc, {
    startY: y,
    head: [['Plant', 'OEE %', 'Avail %', 'Perf %', 'Qual %', 'Downtime (h)', 'Status']],
    body: plantPerformanceTable.map(r => [
      r.plant, r.oee, r.avail, r.perf, r.qual, r.downtime, r.status.toUpperCase(),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [15, 25, 50], textColor: CYAN, fontStyle: 'bold', fontSize: 7.5 },
    bodyStyles: { fillColor: [8, 16, 36], textColor: WHITE, fontSize: 7.5 },
    alternateRowStyles: { fillColor: [12, 22, 44] },
    margin: { left: 14, right: 14 },
    didParseCell: (data) => {
      if (data.column.index === 6 && data.section === 'body') {
        const v = data.cell.raw;
        if (v === 'GOOD') data.cell.styles.textColor = GREEN;
        if (v === 'WARNING') data.cell.styles.textColor = AMBER;
        if (v === 'CRITICAL') data.cell.styles.textColor = RED;
      }
    },
  });
  y = doc.lastAutoTable.finalY + 10;

  // ── Page break ────────────────────────────────────────────────────────────
  doc.addPage();
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 297, 'F');
  y = 20;

  // ── 3. OEE Trend ──────────────────────────────────────────────────────────
  sectionTitle('3. OEE Trend — Year to Date 2026');

  autoTable(doc, {
    startY: y,
    head: [['Month', 'OEE %', 'Availability %', 'Performance %', 'Quality %']],
    body: oeeTrendData.monthly.filter(r => r.oee != null).map(r => [
      r.label, r.oee, r.availability, r.performance, r.quality,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [15, 25, 50], textColor: CYAN, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fillColor: [8, 16, 36], textColor: WHITE, fontSize: 8 },
    alternateRowStyles: { fillColor: [12, 22, 44] },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // ── 4. Top Downtime Causes ─────────────────────────────────────────────────
  sectionTitle('4. Top Downtime Causes');

  autoTable(doc, {
    startY: y,
    head: [['Cause', 'Hours Lost', '% Share', 'OEE Category']],
    body: [
      ...operationalLossContributors.map(r => [r.cause, r.hours, `${r.percent}%`, r.category]),
      ['TOTAL', operationalLossContributors.reduce((s, r) => s + r.hours, 0), '100%', '—'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [15, 25, 50], textColor: CYAN, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fillColor: [8, 16, 36], textColor: WHITE, fontSize: 8 },
    alternateRowStyles: { fillColor: [12, 22, 44] },
    margin: { left: 14, right: 14 },
    didParseCell: (data) => {
      if (data.section === 'body' && data.row.index === operationalLossContributors.length) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.textColor = AMBER;
      }
    },
  });
  y = doc.lastAutoTable.finalY + 10;

  // ── 5. Andon Alert Heatmap ────────────────────────────────────────────────
  sectionTitle('5. Andon Alert Summary by Plant');

  autoTable(doc, {
    startY: y,
    head: [['Plant', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Total']],
    body: alarmHeatmapData.map(r => [
      r.label, r.W1, r.W2, r.W3, r.W4, r.W1 + r.W2 + r.W3 + r.W4,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [15, 25, 50], textColor: CYAN, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fillColor: [8, 16, 36], textColor: WHITE, fontSize: 8 },
    alternateRowStyles: { fillColor: [12, 22, 44] },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // ── 6. Shift Productivity ─────────────────────────────────────────────────
  sectionTitle('6. Shift Productivity');

  autoTable(doc, {
    startY: y,
    head: [['Shift', 'Plant A %', 'Plant B %', 'Plant C %', 'Plant D %']],
    body: shiftProductivityComparison.map(r => [r.shift, r.plantA, r.plantB, r.plantC, r.plantD]),
    theme: 'grid',
    headStyles: { fillColor: [15, 25, 50], textColor: CYAN, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fillColor: [8, 16, 36], textColor: WHITE, fontSize: 8 },
    alternateRowStyles: { fillColor: [12, 22, 44] },
    margin: { left: 14, right: 14 },
  });

  // ── Footer on each page ───────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(...DARK);
    doc.rect(0, 285, pageW, 12, 'F');
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text('Opus One Industries — Confidential Manufacturing Analytics Report', 14, 291);
    doc.text(`Page ${i} of ${pageCount}`, pageW - 14, 291, { align: 'right' });
  }

  doc.save(`OpusOne_Dashboard_Report_${dateTag()}.pdf`);
}
