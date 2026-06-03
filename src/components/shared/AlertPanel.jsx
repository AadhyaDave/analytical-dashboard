import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';

const severityConfig = {
  critical: {
    icon: XCircle,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    dot: 'status-breakdown animate-pulse-red',
  },
  warning: {
    icon: AlertTriangle,
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.25)',
    dot: 'status-idle animate-pulse-yellow',
  },
  info: {
    icon: Info,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
    dot: '',
  },
  success: {
    icon: CheckCircle,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    dot: 'status-running',
  },
};

const AlertPanel = ({ alerts = [], title = 'Alerts', maxHeight = 320 }) => {
  return (
    <div className="ops-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          {title}
        </h3>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'var(--issue-critical-bg)', color: 'var(--issue-critical-text)' }}
        >
          {alerts.filter(a => a.severity === 'critical' || a.type === 'critical').length} Critical
        </span>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight }}>
        {alerts.map((alert, i) => {
          const severity = alert.severity || alert.type || 'info';
          const cfg = severityConfig[severity] || severityConfig.info;
          const Icon = cfg.icon;

          return (
            <motion.div
              key={alert.id || i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon size={15} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {alert.message || alert.title}
                </p>
                {alert.dept && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{alert.dept}</p>
                )}
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                {alert.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertPanel;
