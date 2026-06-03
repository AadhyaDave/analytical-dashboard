import React from 'react';

/**
 * DrilldownCard — Primary navigation component for the drill-down hierarchy.
 * Clickable card that guides users deeper into operational context.
 */
const DrilldownCard = ({ title, subtitle, oee, status, issue, metrics, onClick }) => {
  const statusColors = {
    running: 'var(--status-running)',
    good: 'var(--status-running)',
    idle: 'var(--status-idle)',
    warning: 'var(--status-idle)',
    breakdown: 'var(--status-breakdown)',
    critical: 'var(--status-breakdown)',
    noplan: 'var(--status-noplan)',
  };

  const statusLabels = {
    running: 'Running',
    good: 'On Target',
    idle: 'Idle',
    warning: 'Watch',
    breakdown: 'Breakdown',
    critical: 'Critical',
    noplan: 'No Plan',
  };

  const statusColor = statusColors[status] || 'var(--text-muted)';

  return (
    <div
      className="drill-card p-4 h-full flex flex-col"
      data-status={status}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 pr-6">
        <div>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          {subtitle && <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="status-dot" style={{ width: 8, height: 8, background: statusColor }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: statusColor }}>
            {statusLabels[status] || status}
          </span>
        </div>
      </div>

      {/* OEE Prominent */}
      {oee != null && (
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {typeof oee === 'number' ? oee.toFixed(1) : oee}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>% OEE</span>
          </div>
          <div className="progress-bar mt-2">
            <div className="progress-fill" style={{
              width: `${Math.min(100, oee)}%`,
              background: oee >= 85 ? 'var(--green)' : oee >= 75 ? 'var(--amber)' : 'var(--red)',
            }} />
          </div>
        </div>
      )}

      {/* Inline metrics */}
      {metrics && (
        <div className="flex gap-3 mb-3">
          {metrics.map((m, i) => (
            <div key={i} style={{ fontSize: 11 }}>
              <span style={{ color: 'var(--text-muted)' }}>{m.label}: </span>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Issue callout */}
      {issue && (
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md mt-auto border"
          style={{ background: 'var(--bg-inset)', borderColor: 'var(--border-light)', fontSize: 11 }}>
          <div className="status-dot" style={{
            width: 6, height: 6,
            background: issue.severity === 'critical' ? 'var(--red)' : 'var(--amber)'
          }} />
          <span style={{ color: issue.severity === 'critical' ? 'var(--red)' : 'var(--amber)', fontWeight: 500 }}>
            {issue.text}
          </span>
        </div>
      )}
    </div>
  );
};

export default DrilldownCard;
