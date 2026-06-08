import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Cpu, BellRing, FileText,
  Settings, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'machines',  label: 'Machines',  icon: Cpu },
  { id: 'alerts',    label: 'Alerts',    icon: BellRing },
  { id: 'reports',   label: 'Reports',   icon: FileText },
  { id: 'settings',  label: 'Settings',  icon: Settings },
];

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { activePage, setActivePage, sidebarCollapsed, setSidebarCollapsed, user } = useApp();
  const { isDark } = useTheme();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      <motion.aside
        animate={{ width: sidebarCollapsed ? 60 : 200 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`flex-shrink-0 h-full flex flex-col z-50 fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--bg-sidebar)' }}
      >
      {/* Logo */}
      <div className="flex flex-col justify-center px-4 py-5 gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: '80px' }}>
        <div className={`relative flex-shrink-0 flex items-center justify-center transition-all duration-300 ${sidebarCollapsed ? 'w-8 h-8' : 'w-32 h-8'}`}>
          <img 
            src={sidebarCollapsed 
              ? (isDark ? '/logo-symbol-dark.png' : '/logo-symbol-light.png')
              : (isDark ? '/logo-dark.png' : '/logo-light.png')
            } 
            alt="Opus One" 
            className="max-w-none transition-all duration-300"
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain', 
              objectPosition: 'center'
            }} 
          />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 4 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <p style={{ fontSize: 10, color: 'var(--sidebar-text)', fontWeight: 600, letterSpacing: '0.02em' }}>Operational Intelligence Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                if (window.innerWidth < 768) setMobileMenuOpen(false);
              }}
              className={`sidebar-item w-full text-left ${active ? 'active' : ''}`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <Icon size={17} className="flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* User info */}
      {user && (
        <div className="mx-2 mb-3 p-3 rounded-lg flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--blue)', color: 'white' }}>
            {user.avatar}
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="overflow-hidden">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--sidebar-text-hi)' }}>{user.name}</p>
                <p className="truncate" style={{ fontSize: 10, color: 'var(--sidebar-text)' }}>{user.plant}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Collapse toggle (hidden on mobile) */}
      <div className="hidden md:flex p-3 mt-auto border-t border-white/5 justify-end">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
          style={{ color: 'var(--sidebar-text)' }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
    </>
  );
};

export default Sidebar;
