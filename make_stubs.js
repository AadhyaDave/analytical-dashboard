const fs = require('fs');
const roles = ['plant', 'department', 'section', 'line', 'machine'];
roles.forEach(r => {
  const cap = r.charAt(0).toUpperCase() + r.slice(1);
  const pdfCode = import jsPDF from 'jspdf';
export function build + cap + PDF(user, context) {
  const doc = new jsPDF();
  doc.text(' + cap +  Report Stub', 10, 10);
  doc.save('OpusOne_ + cap + _Report.pdf');
};
  fs.writeFileSync('src/utils/reports/pdfBuilders/' + r + 'Pdf.js', pdfCode);
  
  const excelCode = import * as XLSX from 'xlsx';
export function build + cap + Excel(user, context) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([[' + cap +  Report Stub']]);
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, 'OpusOne_ + cap + _Report.xlsx');
};
  fs.writeFileSync('src/utils/reports/excelBuilders/' + r + 'Excel.js', excelCode);
});
