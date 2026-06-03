import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Search, RefreshCw, Download, LogOut,
  FileSpreadsheet, FileText, ChevronDown, Sun, Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { exportExcel, exportPDF } from '../../utils/exportReport';
import { simulateTick } from '../../utils/simulation';

const ROLE_LABELS = {
  MD: 'Managing Director',
  PLANT_HEAD: 'Plant Head',
  DEPT_HEAD: 'Department Head',
  SECTION_HEAD: 'Section Head',
  LINE_HEAD: 'Line Head',
  MACHINE: 'Machine Detail',
};

const TopNavbar = () => {
  const { 
    user, currentViewRole, logout, notifications, unreadCount, 
    markAllRead, searchQuery, setSearchQuery, drilldownPath
  } = useApp();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const notifRef = useRef(null);
  const exportRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (exportRef.current && !exportRef.current.contains(e.target)) setShowExportMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    simulateTick();
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleExport = async (type) => {
    setShowExportMenu(false);
    try {
      if (type === 'excel') await exportExcel();
      else await exportPDF();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const roleKey = currentViewRole || user?.role || 'MD';
  const activeAlerts = notifications.filter(n => !n.read).length;

  return (
    <header className="flex items-center justify-between px-5 py-3 flex-shrink-0"
      style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>

      {/* Left — Role + time */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            {ROLE_LABELS[roleKey] || 'Dashboard'}
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            {' · '}
            {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                alert(`Search results for "${searchQuery}" will be available in the next update.`);
                setSearchQuery('');
              }
            }}
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 rounded-lg text-xs"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              width: 180,
              outline: 'none',
            }}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Refresh */}
        <button onClick={handleRefresh}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
          title="Refresh data">
          <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
        </button>

        {/* Export */}
        <div className="relative" ref={exportRef}>
          <button onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1 p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
            title="Export report">
            <Download size={15} />
            <ChevronDown size={10} />
          </button>
          <AnimatePresence>
            {showExportMenu && (
              <motion.div
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-10 z-50 py-1 rounded-lg"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', minWidth: 150 }}>
                <button onClick={() => handleExport('excel')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.target.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}>
                  <FileSpreadsheet size={13} /> Export Excel
                </button>
                <button onClick={() => handleExport('pdf')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.target.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.target.style.background = 'transparent'}>
                  <FileText size={13} /> Export PDF
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) markAllRead(); }}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <Bell size={15} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ fontSize: 9, fontWeight: 700, background: 'var(--red)' }}>{unreadCount}</span>
            )}
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-10 z-50 rounded-lg overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', width: 300, maxHeight: 360, overflowY: 'auto' }}>
                <div className="px-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Notifications</p>
                </div>
                {notifications.slice(0, 8).map((n, i) => (
                  <div key={i} className="alert-item">
                    <div className="alert-dot" style={{ background: n.type === 'critical' ? 'var(--red)' : n.type === 'warning' ? 'var(--amber)' : 'var(--blue)' }} />
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{n.message}</p>
                      <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <button onClick={logout}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
          title="Logout">
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
