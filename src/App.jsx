import React from 'react';
import InternalAccessPage from './pages/InternalAccessPage';

import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import MDDashboard from './pages/dashboards/MDDashboard';
import PlantHeadDashboard from './pages/dashboards/PlantHeadDashboard';
import DepartmentHeadDashboard from './pages/dashboards/DepartmentHeadDashboard';
import SectionHeadDashboard from './pages/dashboards/SectionHeadDashboard';
import LineHeadDashboard from './pages/dashboards/LineHeadDashboard';
import MachineDetailView from './pages/dashboards/MachineDetailView';

import ExecutiveMDDashboard from './pages/dashboards/ExecutiveMDDashboard';
import MDSinglePlantDashboard from './pages/dashboards/MDSinglePlantDashboard';

const DASHBOARD_MAP = {
  MD: MDDashboard,
  PLANT_HEAD: PlantHeadDashboard,
  DEPT_HEAD: DepartmentHeadDashboard,
  SECTION_HEAD: SectionHeadDashboard,
  LINE_HEAD: LineHeadDashboard,
  MACHINE: MachineDetailView,
};

// Placeholder for non-dashboard pages
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-64 gap-4">
    <div className="w-16 h-16 rounded-xl flex items-center justify-center"
      style={{ background: 'var(--bg-inset)', border: '1px solid var(--border)' }}>
      <span className="text-2xl">🔧</span>
    </div>
    <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Module coming soon — switch to Dashboard</p>
  </div>
);

const AppContent = () => {
  const { user, activePage, currentViewRole } = useApp();
  const isPrototypeRoute = window.location.pathname === '/demo/md-executive';
  const isSinglePlantRoute = window.location.pathname === '/demo/md-single-plant';

  if (isPrototypeRoute) {
    return <ExecutiveMDDashboard />;
  }

  if (isSinglePlantRoute) {
    return (
      <Layout>
        <MDSinglePlantDashboard />
      </Layout>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const roleToRender = currentViewRole || user.role;
  const DashboardComponent = DASHBOARD_MAP[roleToRender];

  const pageContent = activePage === 'dashboard' ? (
    DashboardComponent ? <DashboardComponent /> : <PlaceholderPage title="Dashboard" />
  ) : (
    <PlaceholderPage title={activePage.charAt(0).toUpperCase() + activePage.slice(1)} />
  );

  return (
    <Layout>
      {pageContent}
    </Layout>
  );
};


function App() {
  // Internal access gate — must be granted before the platform is shown
  const isGranted = localStorage.getItem('internalAccessGranted') === 'true';
  if (!isGranted) {
    return <InternalAccessPage />;
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
