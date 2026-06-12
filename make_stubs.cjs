const fs = require('fs');

const roles = ['plant', 'department', 'section', 'line', 'machine'];

roles.forEach(r => {
  const cap = r.charAt(0).toUpperCase() + r.slice(1);
  
  const pdfCode = `import jsPDF from 'jspdf';
export function build${cap}PDF(user, context) {
  const doc = new jsPDF();
  doc.text('${cap} Report Stub', 10, 10);
  doc.save('OpusOne_${cap}_Report.pdf');
}
`;
  fs.writeFileSync('src/utils/reports/pdfBuilders/' + r + 'Pdf.js', pdfCode);
  
  const excelCode = `import * as XLSX from 'xlsx';

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

export function build${cap}Excel(user, context) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([['${cap} Report Stub']]);
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  downloadWorkbook(wb, 'OpusOne_${cap}_Report.xlsx');
}
`;
  fs.writeFileSync('src/utils/reports/excelBuilders/' + r + 'Excel.js', excelCode);
});
