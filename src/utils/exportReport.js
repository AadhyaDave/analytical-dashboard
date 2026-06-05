/**
 * exportReport.js
 * Opus One Analytics Dashboard — Report Export Entry Point
 * Delegates to modular report builders for PDF and Excel generation.
 *
 * Architecture:
 *   src/utils/reports/reportData.js    — data computation, narratives, benchmarks
 *   src/utils/reports/pdfHelpers.js   — jsPDF drawing primitives
 *   src/utils/reports/pdfBuilder.js   — 4-page PDF assembly
 *   src/utils/reports/excelBuilder.js — 7-sheet styled Excel workbook
 */

export { buildPDF  as exportPDF   } from './reports/pdfBuilder.js';
export { buildExcel as exportExcel } from './reports/excelBuilder.js';
