import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { notifications as initialNotifications } from '../data/mockData';

const AppContext = createContext(null);

const ROLE_HIERARCHY = ['MD', 'PLANT_HEAD', 'DEPT_HEAD', 'SECTION_HEAD', 'LINE_HEAD', 'MACHINE'];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tick, setTick] = useState(0);

  // Drill-down navigation state
  const [drilldownPath, setDrilldownPath] = useState(['Opus One Industries']);
  const [drilldownContext, setDrilldownContext] = useState({});
  const [currentViewRole, setCurrentViewRole] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Drill down into a child level
  const drillDown = useCallback((label, contextData = {}) => {
    setDrilldownPath(prev => [...prev, label]);
    setDrilldownContext(prev => ({ ...prev, ...contextData }));
    // Navigate to the next role level
    const currentRole = currentViewRole || user?.role || 'MD';
    const currentIdx = ROLE_HIERARCHY.indexOf(currentRole);
    if (currentIdx < ROLE_HIERARCHY.length - 1) {
      setCurrentViewRole(ROLE_HIERARCHY[currentIdx + 1]);
    }
    setActivePage('dashboard');
  }, [currentViewRole, user]);

  // Drill up to a specific breadcrumb level
  const drillUp = useCallback((targetLevel) => {
    setDrilldownPath(prev => prev.slice(0, targetLevel + 1));
    // Reset context keys that are deeper than target
    const role = ROLE_HIERARCHY[targetLevel] || 'MD';
    setCurrentViewRole(targetLevel === 0 ? null : role);
    setActivePage('dashboard');
  }, []);

  // Legacy support
  const navigateToRole = useCallback((role) => {
    setCurrentViewRole(role);
    setActivePage('dashboard');
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    setCurrentViewRole(null);
    setDrilldownPath(['Opus One Industries']);
    setDrilldownContext({});
    setActivePage('dashboard');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentViewRole(null);
    setDrilldownPath(['Opus One Industries']);
    setDrilldownContext({});
    setActivePage('dashboard');
  }, []);

  return (
    <AppContext.Provider value={{
      user, login, logout,
      activePage, setActivePage,
      currentViewRole, navigateToRole,
      drilldownPath, drilldownContext, drillDown, drillUp,
      notifications, markAllRead, unreadCount,
      sidebarCollapsed, setSidebarCollapsed,
      searchQuery, setSearchQuery,
      tick
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
