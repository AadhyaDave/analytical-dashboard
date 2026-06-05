import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DrilldownBreadcrumb from '../../components/shared/DrilldownBreadcrumb';
import StatusIndicator from '../../components/shared/StatusIndicator';
import MachineTimeline from '../../components/shared/MachineTimeline';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import { machineCards, machineTimelineData, cycleTimeHistory, hourlyProductionData } from '../../data/mockData';

const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p>{label}</p>
      {payload.map((p, i) => p.value != null && (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

/**
 * MachineDetailView — The deepest intelligence layer.
 * Shows complete operational context for a single machine.
 */

// Simulated state transition log for the selected machine
const generateStateLog = (machine) => [
  { time: '06:00', fromState: '—', toState: 'running', duration: '2h 15m', reason: 'Shift start' },
  { time: '08:15', fromState: 'running', toState: 'idle', duration: '20m', reason: 'Operator break' },
  { time: '08:35', fromState: 'idle', toState: 'running', duration: '1h 40m', reason: 'Resumed' },
  { time: '10:15', fromState: 'running', toState: 'breakdown', duration: '45m', reason: machine.alarms?.[0]?.message || 'Bearing overheating' },
  { time: '11:00', fromState: 'breakdown', toState: 'running', duration: '3h', reason: 'Maintenance completed' },
  { time: '14:00', fromState: 'running', toState: 'running', duration: 'ongoing', reason: 'Current state' },
];

const generateAlarmHistory = (machine) => [
  { time: '10:15', type: 'critical', message: machine.alarms?.[0]?.message || 'Bearing temperature exceeded threshold', resolved: true, duration: '45m' },
  { time: '08:02', type: 'warning', message: 'Cycle time deviation +12%', resolved: true, duration: '8m' },
  { time: '06:45', type: 'info', message: 'Preventive maintenance due in 48h', resolved: false, duration: '—' },
];

const MachineDetailView = () => {
  const { drilldownContext, tick } = useApp();

  // Find the machine from context
  const machineId = drilldownContext.machineId;
  const machine = machineCards.find(m => m.id === machineId) || machineCards[0];
  const timelineEntry = machineTimelineData.find(t => t.id === machine.id);
  const stateLog = generateStateLog(machine);
  const alarmHistory = generateAlarmHistory(machine);

  const statusColors = {
    running: { color: 'var(--status-running)', bg: 'rgba(22, 163, 74, 0.1)', border: 'var(--status-running)' },
    idle: { color: 'var(--status-idle)', bg: 'rgba(217, 119, 6, 0.1)', border: 'var(--status-idle)' },
    breakdown: { color: 'var(--status-breakdown)', bg: 'rgba(220, 38, 38, 0.1)', border: 'var(--status-breakdown)' },
    maintenance: { color: 'var(--status-maintenance)', bg: 'rgba(234, 88, 12, 0.1)', border: 'var(--status-maintenance)' },
    noplan: { color: 'var(--status-noplan)', bg: 'rgba(156, 163, 175, 0.1)', border: 'var(--status-noplan)' },
  };

  const sc = statusColors[machine.status] || statusColors.running;

  return (
    <div className="space-y-5">
      <DrilldownBreadcrumb />

      {/* Machine Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="ops-card p-5" style={{ borderLeft: `4px solid ${sc.border}` }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{machine.id}</h1>
              <span className="badge" style={{ background: sc.bg, color: sc.color }}>
                {machine.stateDetail || machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {machine.model || 'CNC Machine'} · Operator: {machine.operator} · Line: Production Line 1
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {machine.stability && (
              <div className="px-3 py-1.5 rounded-[var(--r-md)] bg-[var(--bg-inset)] border border-[var(--border-light)] flex items-center gap-2 mr-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: machine.stability === 'Stable' ? 'var(--green)' : machine.stability === 'Moderate Instability' ? 'var(--amber)' : 'var(--red)' }} />
                <span className="text-[12px] font-semibold text-[var(--text-primary)]">{machine.stability}</span>
              </div>
            )}
            <div className="status-dot animate-pulse-green" style={{
              width: 12, height: 12,
              background: sc.color,
              animation: machine.status === 'running' ? undefined : 'none',
            }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: sc.color }}>Live</span>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Row */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <div className="ops-card p-3 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-2 font-bold">OEE</p>
            <OEEGauge size={85} oee={machine.oee || 0} availability={machine.availability || 0} performance={machine.performance || 0} quality={machine.quality || 0} showLabels={false} />
          </div>
          {[
            { label: 'Availability', value: `${(machine.availability || 90).toFixed(1)}%`, color: 'var(--blue)' },
            { label: 'Performance', value: `${(machine.performance || 88).toFixed(1)}%`, color: 'var(--purple)' },
            { label: 'Quality', value: `${(machine.quality || 97).toFixed(1)}%`, color: 'var(--green)' },
            { label: 'Runtime', value: machine.runtime || '7h 12m', color: 'var(--text-primary)' },
            { label: 'Downtime', value: machine.downtime || '48m', color: 'var(--red)' },
          ].map((m, i) => (
            <div key={i} className="ops-card p-3 text-center flex flex-col justify-center items-center">
              <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-2 font-bold">{m.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Machine Timeline — PRIMARY COMPONENT */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="ops-card p-5">
        <h3 className="section-title mb-1">Machine Timeline</h3>
        <p className="section-subtitle mb-4">Operational state history — current shift</p>
        <MachineTimeline
          data={timelineEntry ? [timelineEntry] : [{ id: machine.id, segments: [{ state: machine.status, duration: 480, reason: 'Current shift' }] }]}
          shiftHours={8}
          expanded={true}
        />
      </motion.div>

      {/* State Transition Log + Alarm History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* State Transitions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} className="ops-card overflow-hidden">
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="section-title">State Transitions</h3>
            <p className="section-subtitle">Chronological state change log</p>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>From</th>
                <th>To</th>
                <th>Duration</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {stateLog.map((entry, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600 }}>{entry.time}</td>
                  <td>{entry.fromState !== '—' ? <StatusIndicator status={entry.fromState} size={6} /> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td><StatusIndicator status={entry.toState} size={6} /></td>
                  <td style={{ fontWeight: 600, fontSize: 12 }}>{entry.duration}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{entry.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Alarm History */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="ops-card overflow-hidden">
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="section-title">Alarm History</h3>
            <p className="section-subtitle">Today's alarm events</p>
          </div>
          <div>
            {alarmHistory.map((alarm, i) => (
              <div key={i} className="alert-item">
                <div className="alert-dot" style={{
                  background: alarm.type === 'critical' ? 'var(--red)' : alarm.type === 'warning' ? 'var(--amber)' : 'var(--blue)'
                }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{alarm.message}</p>
                    <span className={`badge ${alarm.resolved ? 'badge-ok' : 'badge-alert'}`} style={{ fontSize: 10 }}>
                      {alarm.resolved ? 'Resolved' : 'Active'}
                    </span>
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                    {alarm.time} · Duration: {alarm.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Smart Root Cause Suggestions */}
      {machine.rootCauseSuggestions && machine.rootCauseSuggestions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="ops-card p-5">
          <h3 className="section-title mb-1 flex items-center gap-2">
            <span className="text-[var(--blue)]">✦</span>
            Operational Root Cause Guidance
          </h3>
          <p className="section-subtitle mb-4">Intelligent pattern-based anomaly detection</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {machine.rootCauseSuggestions.map((suggestion, i) => (
              <div key={i} className="ops-inset p-3.5 flex items-start gap-3">
                <div className="mt-0.5 text-[14px]" style={{ color: 'var(--amber)' }}>↳</div>
                <p className="text-[13px] font-medium text-[var(--text-primary)] leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Production Details */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }} className="ops-card p-5">
        <h3 className="section-title mb-3">Production Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Produced', value: machine.production || 0, suffix: 'pcs' },
            { label: 'Good Count', value: machine.goodCount || 0, suffix: 'pcs', color: 'var(--green)' },
            { label: 'Reject Count', value: machine.rejectCount || 0, suffix: 'pcs', color: 'var(--red)' },
            { label: 'Target', value: machine.target || 220, suffix: 'pcs' },
            { label: 'Cycle Time (Ideal)', value: machine.idealCycleTime || 3.0, suffix: 'sec' },
            {
              label: 'Cycle Time (Actual)', value: machine.actualCycleTime || 3.2, suffix: 'sec',
              color: (machine.actualCycleTime || 3.2) > (machine.idealCycleTime || 3.0) ? 'var(--amber)' : 'var(--green)'
            },
            {
              label: 'Temperature', value: machine.temperature || 55, suffix: '°C',
              color: (machine.temperature || 55) > 75 ? 'var(--red)' : 'var(--text-primary)'
            },
            { label: 'Energy', value: machine.energyKwh || 0, suffix: 'kWh' },
          ].map((item, i) => (
            <div key={i} className="ops-inset p-3 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-1 font-bold">{item.label}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: item.color || 'var(--text-primary)' }}>
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 3 }}>{item.suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* NEW TRENDS BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Cycle Time Trend */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }} className="ops-card p-5">
          <h3 className="section-title">Cycle Time Trend Analysis</h3>
          <p className="section-subtitle mb-4">Actual vs Ideal (seconds)</p>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <LineChart data={cycleTimeHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={['auto', 'auto']} tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CT />} />
                <Line type="monotone" dataKey={machine.id.toLowerCase().replace('-', '')} name="Actual" stroke="var(--blue)" strokeWidth={2} dot={{ r: 3, fill: 'var(--blue)' }} />
                <Line type="stepAfter" dataKey={() => machine.idealCycleTime || 3.0} name="Ideal" stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Planned vs Actual Production Trend */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }} className="ops-card p-5">
          <h3 className="section-title">Planned vs Actual Production</h3>
          <p className="section-subtitle mb-4">Cumulative Output Deviation</p>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <ComposedChart data={hourlyProductionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CT />} />
                <Bar dataKey="actual" name="Actual" fill="var(--blue)" radius={[2, 2, 0, 0]} barSize={16} />
                <Line type="monotone" dataKey="target" name="Planned" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="3 3" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MachineDetailView;
