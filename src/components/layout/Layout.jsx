import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { useApp } from '../../context/AppContext';

const Layout = ({ children }) => {
  const { activePage, currentViewRole, drilldownPath } = useApp();

  // Unique key per drill-down level for smooth page transitions
  const pageKey = `${activePage}-${currentViewRole || 'root'}-${drilldownPath.length}`;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-app)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-6 min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
