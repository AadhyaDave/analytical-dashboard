/**
 * pdfHelpers.js
 * jsPDF Drawing Primitives — Opus One Executive Report
 * Provides reusable chart and layout components for the PDF builder.
 */

// ─── Brand Color Palette (RGB integer arrays) ───────────────────────────────
// Passing RGB arrays directly to jsPDF API is safe, as long as we destructure
// them correctly into r, g, b parameters.
export const C = {
  DARK:   [5,   11,  24],
  DARK2:  [8,   16,  36],
  DARK3:  [12,  22,  44],
  DARK4:  [15,  25,  50],
  CYAN:   [56,  189, 248],
  WHITE:  [240, 246, 255],
  MUTED:  [74,  96,  128],
  GREEN:  [16,  185, 129],
  RED:    [239, 68,  68],
  AMBER:  [245, 158, 11],
  PURPLE: [168, 85,  247],
  BLUE:   [59,  130, 246],
  SLATE:  [100, 130, 170],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Set fill colour safely */
export function sf(doc, rgb) { doc.setFillColor(rgb[0], rgb[1], rgb[2]); }
/** Set draw colour safely */
export function sd(doc, rgb) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); }
/** Set text colour safely */
export function st(doc, rgb) { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }

// ─── Page Background ──────────────────────────────────────────────────────────
export function fillPageBackground(doc, pageW, pageH) {
  sf(doc, C.DARK);
  doc.rect(0, 0, pageW, pageH, 'F');
}

// ─── Section Title Bar ────────────────────────────────────────────────────────
/** Draws a styled section header and returns the new Y position below it */
export function drawSectionTitle(doc, title, y, pageW) {
  sf(doc, C.DARK4);
  doc.rect(0, y - 5, pageW, 11, 'F');
  sf(doc, C.CYAN);
  doc.rect(10, y - 4, 3, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  st(doc, C.CYAN);
  doc.text(title, 16, y + 2);
  return y + 13;
}

// ─── Horizontal Divider ───────────────────────────────────────────────────────
export function drawDivider(doc, y, pageW, margin = 14) {
  sd(doc, C.DARK3);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  return y + 5;
}

// ─── KPI Card ────────────────────────────────────────────────────────────────
/** Draws a single branded KPI tile at (x, y) with dimensions (w x h) */
export function drawKPICard(doc, x, y, w, h, kpi) {
  const accent = kpi.status === 'good' ? C.GREEN
    : kpi.status === 'warning' ? C.AMBER : C.RED;

  // Background
  sf(doc, C.DARK2);
  doc.rect(x, y, w, h, 'F');

  // Top accent strip
  sf(doc, accent);
  doc.rect(x, y, w, 1.5, 'F');

  // Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  st(doc, C.MUTED);
  const labelLines = doc.splitTextToSize(kpi.label.toUpperCase(), w - 2);
  doc.text(labelLines, x + w / 2, y + 8.5, { align: 'center' });

  // Primary value
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  st(doc, accent);
  doc.text(String(kpi.value), x + w / 2, y + 21, { align: 'center' });

  // Unit
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  st(doc, C.MUTED);
  doc.text(kpi.unit, x + w / 2, y + 27, { align: 'center' });

  // Trend vs prior
  const sign = kpi.trend > 0 ? '+' : '';
  const tClr = kpi.higherIsBetter
    ? (kpi.trend > 0 ? C.GREEN : C.RED)
    : (kpi.trend < 0 ? C.GREEN : C.RED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  st(doc, tClr);
  doc.text(`${sign}${kpi.trend} vs prior`, x + w / 2, y + 34, { align: 'center' });

  // Target / Gap strip
  if (kpi.target != null) {
    sf(doc, C.DARK3);
    doc.rect(x + 2, y + h - 14, w - 4, 12, 'F');

    const gSign = kpi.gap >= 0 ? '+' : '';
    const gClr  = kpi.status === 'good' ? C.GREEN : kpi.status === 'warning' ? C.AMBER : C.RED;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    st(doc, C.MUTED);
    doc.text(`Target: ${kpi.target}${kpi.unit}`, x + 5, y + h - 9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    st(doc, gClr);
    doc.text(`Gap: ${gSign}${kpi.gap}${kpi.unit}`, x + 5, y + h - 3);
  }
}

// ─── OEE Multi-Line Trend Chart ───────────────────────────────────────────────
/**
 * Draws a 4-line OEE trend chart using jsPDF primitives.
 * @returns {number} new Y position after chart + legend
 */
export function drawOEETrendChart(doc, data, x, y, w, h) {
  const valid = data.filter(d => d.oee != null);
  if (valid.length < 2) return y + h + 15;

  const MIN_V   = 60;
  const MAX_V   = 100;
  const YAXIS_W = 14;
  const cL = x + YAXIS_W;
  const cR = x + w;
  const cT = y;
  const cB = y + h;
  const cW = cR - cL;
  const cH = cB - cT;

  const toX = i => cL + (i / Math.max(valid.length - 1, 1)) * cW;
  const toY = v => cB - ((v - MIN_V) / (MAX_V - MIN_V)) * cH;

  // Chart background
  sf(doc, C.DARK2);
  doc.rect(cL, cT, cW, cH, 'F');

  // Grid lines + Y-axis labels
  for (let v = MIN_V; v <= MAX_V; v += 10) {
    const gy = toY(v);
    sd(doc, C.DARK4);
    doc.setLineWidth(0.15);
    doc.line(cL, gy, cR, gy);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    st(doc, C.MUTED);
    doc.text(`${v}`, cL - 2, gy + 1.5, { align: 'right' });
  }

  // X-axis labels
  valid.forEach((d, i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    st(doc, C.MUTED);
    doc.text(d.label, toX(i), cB + 5.5, { align: 'center' });
  });

  const lastIdx = valid.length - 1;

  const series = [
    { key: 'quality',      color: C.GREEN,  lw: 0.8, label: 'Quality'      },
    { key: 'performance',  color: C.PURPLE, lw: 0.8, label: 'Performance'  },
    { key: 'availability', color: C.BLUE,   lw: 0.8, label: 'Availability' },
    { key: 'oee',          color: C.CYAN,   lw: 2.0, label: 'OEE'          },
  ];

  series.forEach(({ key, color, lw }) => {
    const pts = valid.map((d, i) => ({ px: toX(i), py: toY(d[key]) }));

    sd(doc, color);
    doc.setLineWidth(lw);
    for (let i = 0; i < pts.length - 1; i++) {
      doc.line(pts[i].px, pts[i].py, pts[i + 1].px, pts[i + 1].py);
    }
    pts.forEach(p => {
      sf(doc, color);
      doc.circle(p.px, p.py, 0.9, 'F');
    });

    const lastPt  = pts[lastIdx];
    const lastVal = valid[lastIdx][key];
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    st(doc, color);
    doc.text(`${lastVal}%`, lastPt.px + 4, lastPt.py + 1.5);
  });

  // Legend
  const legY = cB + 12;
  let lx = cL;
  series.slice().reverse().forEach(({ color, label }) => {
    sf(doc, color);
    doc.rect(lx, legY - 2.5, 8, 2.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    st(doc, C.MUTED);
    doc.text(label, lx + 10, legY);
    lx += 34;
  });

  return legY + 6;
}

// ─── Horizontal Pareto Bar Chart ─────────────────────────────────────────────
/** Draws a horizontal Pareto bar chart. @returns {number} new Y after bars */
export function drawParetoChart(doc, data, x, y, w) {
  const maxH   = Math.max(...data.map(d => d.hours));
  const LABL_W = 54;
  const VAL_W  = 28;
  const BAR_W  = w - LABL_W - VAL_W;
  const BAR_H  = 7;
  const GAP    = 4;

  const catColor = { Availability: C.RED, Performance: C.AMBER, Quality: C.BLUE };

  data.forEach((item, i) => {
    const barY  = y + i * (BAR_H + GAP);
    const fillW = (item.hours / maxH) * BAR_W;
    const color = catColor[item.category] || C.CYAN;
    const lbl   = item.cause.length > 24 ? item.cause.slice(0, 23) + '\u2026' : item.cause;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    st(doc, C.WHITE);
    doc.text(lbl, x + LABL_W - 2, barY + BAR_H - 1.5, { align: 'right' });

    sf(doc, C.DARK3);
    doc.rect(x + LABL_W, barY, BAR_W, BAR_H, 'F');

    sf(doc, color);
    doc.rect(x + LABL_W, barY, Math.max(fillW, 1.5), BAR_H, 'F');

    sf(doc, color);
    doc.circle(x + LABL_W + BAR_W + 4, barY + BAR_H / 2, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    st(doc, C.WHITE);
    doc.text(`${item.hours}h  ${item.percent}%`, x + LABL_W + BAR_W + 9, barY + BAR_H - 1.5);
  });

  return y + data.length * (BAR_H + GAP) + 4;
}

// ─── Page Footer ─────────────────────────────────────────────────────────────
export function drawPageFooter(doc, pageNum, pageCount, timestamp, pageW) {
  const fy = 285;
  sf(doc, C.DARK2);
  doc.rect(0, fy, pageW, 12, 'F');
  sf(doc, C.CYAN);
  doc.rect(0, fy, pageW, 0.4, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  st(doc, C.MUTED);
  doc.text(
    'CONFIDENTIAL INTERNAL DOCUMENT  \u00B7  Generated by Opus One Operational Intelligence Platform  \u00B7  \u00A9 Opus One Industries',
    14, fy + 5,
  );
  doc.text(timestamp, 14, fy + 10);
  doc.text(`Page ${pageNum} of ${pageCount}`, pageW - 14, fy + 7.5, { align: 'right' });
}
