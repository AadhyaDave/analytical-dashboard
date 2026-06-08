import React from 'react';

/**
 * MachineTimeline — Primary visual component of the platform.
 * Visualizes machine state history as a horizontal block timeline.
 */

const STATE_CONFIG = {
  running:     { color: 'var(--status-running)', label: 'Running' },
  idle:        { color: 'var(--status-idle)', label: 'Idle' },
  breakdown:   { color: 'var(--status-breakdown)', label: 'Breakdown' },
  maintenance: { color: 'var(--status-maintenance)', label: 'Maintenance' },
  noplan:      { color: 'var(--status-noplan)', label: 'No Plan' },
};

const MachineTimeline = ({ data, shiftHours = 8, expanded = false }) => {
  if (!data || !data.length) return null;

  const hours = Array.from({ length: shiftHours + 1 }, (_, i) => {
    const h = 6 + i; // Assume shift starts at 06:00
    return `${String(h).padStart(2, '0')}:00`;
  });

  return (
    <div className="space-y-3">
      {data.map((machine, mIdx) => {
        const totalSegments = machine.segments?.length || 0;
        return (
          <div key={mIdx}>
            <div className="flex items-center gap-3">
              {/* Machine label */}
              <div className="truncate min-w-0" style={{ width: 70, flexShrink: 0 }}>
                <p className="truncate min-w-0" title={machine.id} style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{machine.id}</p>
              </div>
              {/* Timeline track */}
              <div className={`timeline-track flex-1 ${expanded ? 'timeline-track-lg' : ''}`}>
                {machine.segments?.map((seg, sIdx) => {
                  const cfg = STATE_CONFIG[seg.state] || STATE_CONFIG.idle;
                  const widthPct = (seg.duration / (shiftHours * 60)) * 100;
                  return (
                    <div
                      key={sIdx}
                      className={`timeline-block ${seg.state}`}
                      style={{ width: `${widthPct}%` }}
                      title={`${cfg.label}: ${seg.duration}min${seg.reason ? ` — ${seg.reason}` : ''}`}
                    >
                      {widthPct > 10 && expanded && (
                        <span className="timeline-label">{cfg.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Hour markers */}
      <div className="flex items-center gap-3">
        <div style={{ width: 70, flexShrink: 0 }} />
        <div className="flex-1 flex justify-between">
          {hours.map(h => (
            <span key={h} style={{ fontSize: 10, color: 'var(--text-muted)' }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <div style={{ width: 70, flexShrink: 0 }} />
        {Object.entries(STATE_CONFIG).filter(([k]) => k !== 'noplan').map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div style={{ width: 10, height: 10, borderRadius: 2, background: cfg.color }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cfg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineTimeline;
