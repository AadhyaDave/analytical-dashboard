import React from 'react';
import StatusIndicator from './StatusIndicator';

/**
 * MachineCard — Compact operational card for machine state visibility.
 * Clickable → navigates to Machine Detail view.
 */
const MachineCard = ({ machine, onClick }) => {
  if (!machine) return null;

  const statusBorders = {
    running: 'var(--status-running)',
    idle: 'var(--status-idle)',
    breakdown: 'var(--status-breakdown)',
    maintenance: 'var(--status-maintenance)',
    noplan: 'var(--status-noplan)',
  };

  return (
    <div
      className="ops-card p-4 cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
      style={{ borderLeft: `3px solid ${statusBorders[machine.status] || '#d1d5db'}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-0.5 min-w-0">
        <h4 className="text-[14px] font-bold truncate min-w-0" title={machine.id} style={{ color: 'var(--text-primary)' }}>{machine.id}</h4>
        <div className="flex-shrink-0">
          <StatusIndicator status={machine.status} size={8} />
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-wider mb-2 font-semibold truncate" title={machine.stateDetail || machine.status} style={{ color: statusBorders[machine.status] }}>
        {machine.stateDetail || machine.status}
      </div>

      {/* OEE */}
      <div className="flex items-baseline gap-1 mb-2">
        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
          {machine.oee?.toFixed(1) || '—'}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>% OEE</span>
      </div>

      {/* Metrics row */}
      <div className="flex gap-4" style={{ fontSize: 11 }}>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Output: </span>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{machine.production || 0}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Temp: </span>
          <span style={{ fontWeight: 600, color: machine.temperature > 75 ? 'var(--red)' : 'var(--text-secondary)' }}>
            {machine.temperature}°C
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 gap-2 min-w-0" style={{ borderTop: '1px solid var(--border-light)' }}>
        <span className="truncate min-w-0" title={machine.operator ? `Op: ${machine.operator}` : 'No Operator'} style={{ fontSize: 10, color: 'var(--text-muted)' }}>
          {machine.operator ? `Op: ${machine.operator}` : 'No Operator'}
        </span>
        {machine.stability && (
          <span className="flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap" style={{ fontSize: 10, fontWeight: 600, color: machine.stability === 'Stable' ? 'var(--green)' : machine.stability === 'Moderate Instability' ? 'var(--amber)' : 'var(--red)' }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: machine.stability === 'Stable' ? 'var(--green)' : machine.stability === 'Moderate Instability' ? 'var(--amber)' : 'var(--red)' }} />
            {machine.stability}
          </span>
        )}
      </div>
    </div>
  );
};

export default MachineCard;
