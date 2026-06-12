/**
 * exportReport.js
 * Opus One Analytics Dashboard — Report Export Entry Point (Router)
 * Delegates to modular role-based report builders based on current view.
 */

// MD Legacy protected builders
import { buildMDPDF } from './reports/pdfBuilders/mdPdf.js';
import { buildMDExcel } from './reports/excelBuilders/mdExcel.js';

// Super Admin
import { buildSuperAdminPDF } from './reports/pdfBuilders/superAdminPdf.js';
import { buildSuperAdminExcel } from './reports/excelBuilders/superAdminExcel.js';
import { generateUniversalPDF } from './reports/universalPdfEngine.js';
import { generateUniversalExcel } from './reports/universalExcelEngine.js';
import {
  getPlantReportProvider,
  getDepartmentReportProvider,
  getSectionReportProvider,
  getLineReportProvider,
  getMachineReportProvider
} from './reports/reportData.js';

export function exportPDF(user, role, contextData) {
  const targetRole = role || user?.role || 'MD';

  switch (targetRole) {
    case 'SUPER_ADMIN':
      return buildSuperAdminPDF(user, contextData);
    case 'MD':
      return buildMDPDF(user); // Legacy protected
    case 'PLANT_HEAD': {
      const { config, data } = getPlantReportProvider(contextData);
      return generateUniversalPDF(user, 'PLANT_HEAD', config, data);
    }
    case 'DEPT_HEAD': {
      const { config, data } = getDepartmentReportProvider(contextData);
      return generateUniversalPDF(user, 'DEPT_HEAD', config, data);
    }
    case 'SECTION_HEAD': {
      const { config, data } = getSectionReportProvider(contextData);
      return generateUniversalPDF(user, 'SECTION_HEAD', config, data);
    }
    case 'LINE_HEAD': {
      const { config, data } = getLineReportProvider(contextData);
      return generateUniversalPDF(user, 'LINE_HEAD', config, data);
    }
    case 'MACHINE': {
      const { config, data } = getMachineReportProvider(contextData);
      return generateUniversalPDF(user, 'MACHINE', config, data);
    }
    default:
      console.warn(`No PDF builder defined for role: ${targetRole}. Defaulting to MD.`);
      return buildMDPDF(user);
  }
}

export function exportExcel(user, role, contextData) {
  const targetRole = role || user?.role || 'MD';

  switch (targetRole) {
    case 'SUPER_ADMIN':
      return buildSuperAdminExcel(user, contextData);
    case 'MD':
      return buildMDExcel(user); // Legacy protected
    case 'PLANT_HEAD': {
      const { config, data } = getPlantReportProvider(contextData);
      return generateUniversalExcel(user, 'PLANT_HEAD', config, data);
    }
    case 'DEPT_HEAD': {
      const { config, data } = getDepartmentReportProvider(contextData);
      return generateUniversalExcel(user, 'DEPT_HEAD', config, data);
    }
    case 'SECTION_HEAD': {
      const { config, data } = getSectionReportProvider(contextData);
      return generateUniversalExcel(user, 'SECTION_HEAD', config, data);
    }
    case 'LINE_HEAD': {
      const { config, data } = getLineReportProvider(contextData);
      return generateUniversalExcel(user, 'LINE_HEAD', config, data);
    }
    case 'MACHINE': {
      const { config, data } = getMachineReportProvider(contextData);
      return generateUniversalExcel(user, 'MACHINE', config, data);
    }
    default:
      console.warn(`No Excel builder defined for role: ${targetRole}. Defaulting to MD.`);
      return buildMDExcel(user);
  }
}
