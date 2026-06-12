import * as XLSX from 'xlsx';
import { generateReportMeta, getSuperAdminReportData } from '../reportData.js';

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

export function buildSuperAdminExcel(user, context) {
  const meta = generateReportMeta(user, 'SUPER_ADMIN');
  const data = getSuperAdminReportData(context);
  const wb = XLSX.utils.book_new();

  // Simple unstyled dump for Super Admin to prove architecture
  // (In a full implementation, this would use the same xlsx-js-style logic as mdExcel)

  const summaryData = [
    ['Opus One Industries — Global Enterprise Report'],
    [`Generated: ${meta.generatedAt} | By: ${meta.generatedBy}`],
    [],
    ['KPI', 'Value', 'Unit', 'Target', 'Status'],
    ...data.kpis.map(k => [k.label, k.value, k.unit, k.target || 'N/A', k.status.toUpperCase()])
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryData), 'Group Summary');

  const companyData = [
    ['Rank', 'Company', 'Region', 'OEE %', 'Avail %', 'Perf %', 'Qual %', 'Status'],
    ...data.companies.map(c => [c.rank, c.company, c.location, c.oee, c.avail, c.perf, c.qual, c.healthLabel])
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(companyData), 'Company Ranking');

  const actionData = [
    ['Severity', 'Target Company', 'Message'],
    ...data.actions.map(a => [a.severity.toUpperCase(), a.targetLabel, a.message])
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(actionData), 'Executive Actions');

  downloadWorkbook(wb, `OpusOne_Global_Enterprise_Report_${meta.dateTag}.xlsx`);
}
