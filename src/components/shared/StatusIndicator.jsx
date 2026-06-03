import React from 'react';

const StatusIndicator = ({ status, size = 8, showLabel = true }) => {
  const config = {
    running: { label: 'Running', color: 'var(--status-running)' },
    idle: { label: 'Idle', color: 'var(--status-idle)' },
    breakdown: { label: 'Breakdown', color: 'var(--status-breakdown)' },
    maintenance: { label: 'Maintenance', color: 'var(--status-maintenance)' },
    noplan: { label: 'No Plan', color: 'var(--status-noplan)' },
    present: { label: 'Present', color: 'var(--status-running)' },
    absent: { label: 'Absent', color: 'var(--status-breakdown)' },
    on_break: { label: 'On Break', color: 'var(--status-idle)' },
  };

  const cfg = config[status] || config.idle;

  return (
    <div className="flex items-center gap-2">
      <div className="status-dot" style={{ width: size, height: size, background: cfg.color }} />
      {showLabel && (
        <span style={{ fontSize: 12, fontWeight: 500, color: cfg.color }}>{cfg.label}</span>
      )}
    </div>
  );
};

export default StatusIndicator;
