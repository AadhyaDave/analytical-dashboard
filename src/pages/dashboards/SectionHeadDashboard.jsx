import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronRight, AlertCircle, CheckCircle2, X } from 'lucide-react';
import DrilldownBreadcrumb from '../../components/shared/DrilldownBreadcrumb';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import {
  sectionKPIs, productionLines, hourlyProductionData, andonAlerts, machineStatusList, operationalLossContributors
} from '../../data/mockData';

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

const StatusDonut = ({ data, size = 85, onClick, compact = false }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <div
      className={`flex items-center justify-center ${compact ? 'gap-4' : 'gap-5'} w-full ${onClick ? 'ops-hover-surface p-1.5 rounded cursor-pointer -m-1.5' : ''}`}
      onClick={onClick}
    >
      <div style={{ width: size, height: size, position: 'relative' }} className="flex-shrink-0">
        <PieChart width={size} height={size}>
            <Pie data={data} innerRadius="65%" outerRadius="100%" paddingAngle={2} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip" style={{ padding: '4px 8px', fontSize: 11 }}>
                    <span style={{ color: payload[0].payload.color, fontWeight: 700 }}>{payload[0].name}</span>: {payload[0].value}
                  </div>
                );
              }
              return null;
            }} />
          </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[14px] font-bold leading-none text-[var(--text-primary)]">{total}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-center min-w-[90px]">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-[11px] font-semibold gap-3">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span style={{ color: 'var(--text-secondary)' }} className="truncate leading-tight">{item.name}</span>
            </div>
            <span style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const rankStyles = [
  { label: '01', color: '#F59E0B' }, // Gold
  { label: '02', color: '#9CA3AF' }, // Silver
  { label: '03', color: '#B45309' }, // Bronze
];

const TopPerformingLines = ({ drillDown }) => {
  const ranked = [...productionLines]
    .sort((a, b) => b.oee - a.oee)
    .slice(0, 3);

  return (
    <div className="flex flex-col justify-center h-full w-full gap-2">
      {ranked.map((line, i) => {
        const rank = rankStyles[i];
        return (
          <div
            key={i}
            className="flex items-center justify-between ops-investigation-row bg-transparent px-2 py-1.5 rounded w-full"
            onClick={() => drillDown(line.name, { lineId: line.id })}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span style={{ fontSize: 11, fontWeight: 800, color: rank.color, flexShrink: 0 }}>#{i + 1}</span>
              <span className="text-[13px] font-bold text-[var(--text-primary)] truncate">{line.name}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
              {line.oee.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const LineModule = ({ line, index, drillDown, onInvestigate }) => {
  const statusColors = { good: 'var(--green)', running: 'var(--green)', warning: 'var(--amber)', idle: 'var(--amber)', critical: 'var(--red)', breakdown: 'var(--red)' };
  const statusLabels = { good: 'Stable', running: 'Running', warning: 'Needs Attention', idle: 'Idle', critical: 'Critical Alert', breakdown: 'Breakdown' };
  const statusColor = statusColors[line.status] || 'var(--text-muted)';

  const lineMachineStatus = [
    { name: 'Running', value: line.status === 'running' || line.status === 'good' ? line.machines - 1 : Math.max(1, line.machines - 2), color: 'var(--green)' },
    { name: 'Idle', value: line.status === 'idle' || line.status === 'warning' ? 1 : 0, color: 'var(--amber)' },
    { name: 'Breakdown', value: line.status === 'breakdown' || line.status === 'critical' ? 1 : 0, color: 'var(--red)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="ops-card flex flex-col overflow-hidden"
    >
      <div
        className="px-5 py-3 border-b border-[var(--border-light)] flex justify-between items-center ops-investigation-row bg-[var(--bg-inset)]"
        onClick={() => drillDown(line.name, { lineId: line.id })}
      >
        <div className="flex items-center gap-3.5">
          <h3 className="text-[20px] font-bold text-[var(--text-primary)] leading-tight">{line.name}</h3>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
            <div className="status-dot flex-shrink-0" style={{ width: 6, height: 6, background: statusColor }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {statusLabels[line.status]}
            </span>
          </div>
          <ChevronRight size={16} className="text-[var(--text-muted)]" />
        </div>
      </div>

      <div className="p-4 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-4 2xl:gap-8 bg-[var(--bg-card)]">
        
        <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-2 gap-y-4 gap-x-2 md:flex md:flex-row md:items-center md:gap-4 2xl:gap-8 min-w-0 flex-[1.5] w-full md:w-auto">
          <div
            className="col-start-2 row-start-1 row-span-2 md:col-auto md:row-auto flex-shrink-0 flex flex-col items-center justify-center ops-hover-surface p-1 rounded cursor-pointer -m-1"
            onClick={() => drillDown(line.name, { lineId: line.id })}
          >
            <OEEGauge size={85} oee={line.oee} showLabels={false} />
            <span className="text-[10px] tracking-widest uppercase font-bold mt-2 text-[var(--text-muted)]">OEE</span>
          </div>
          <div className="contents md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-8 md:px-0">
            <div className="col-start-1 row-start-1 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(line.name, { lineId: line.id, context: 'output' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Output</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--blue)]">{line.output}</div>
            </div>
            <div className="col-start-3 row-start-1 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(line.name, { lineId: line.id, context: 'target' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Target</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--purple)]">{line.target}</div>
            </div>
            <div className="col-start-1 row-start-2 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(line.name, { lineId: line.id, context: 'machines' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Machines</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--text-primary)]">{line.machines}</div>
            </div>
            <div className="col-start-3 row-start-2 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(line.name, { lineId: line.id, context: 'downtime' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Down</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--red)]">2h</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-16 bg-[var(--border-light)]" />

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-2 2xl:gap-6 flex-1 md:justify-end min-w-0 w-full md:w-auto mt-2 md:mt-0">
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
            <StatusDonut
              data={lineMachineStatus}
              size={75}
              compact={true}
              onClick={() => drillDown(line.name, { lineId: line.id, context: 'machine_status' })}
            />
          </div>
          
          <button
            onClick={() => onInvestigate(index)}
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 md:py-2 rounded bg-[var(--blue)] text-white cursor-pointer hover:bg-blue-600 transition-colors shadow border-none w-full md:w-auto md:h-[36px] mt-2 md:mt-0"
          >
            <span className="text-[12px] md:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">More Info</span>
            <ChevronRight size={14} className="flex-shrink-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Investigation Overlay (Floating Modal)                               */
/* ------------------------------------------------------------------ */
const InvestigationOverlay = ({ lineIdx, onClose, drillDown }) => {
  if (lineIdx === null) return null;

  const line = productionLines[lineIdx];
  const lineName = line.name;

  const lineAlerts = andonAlerts.filter(item => item.color !== 'green');
  const lineLosses = operationalLossContributors.filter(item => item.primaryContributor.includes('Line'));
  const lineMachines = machineStatusList.slice(0, 3); // Mocked top 3 machines

  const statusColors = { good: 'var(--green)', running: 'var(--green)', warning: 'var(--amber)', idle: 'var(--amber)', critical: 'var(--red)', breakdown: 'var(--red)' };
  const statusLabels = { good: 'Stable', running: 'Running', warning: 'Needs Attention', idle: 'Idle', critical: 'Critical Alert', breakdown: 'Breakdown' };
  const statusColor = statusColors[line.status] || 'var(--text-muted)';

  const shiftComparison = [
    { shift: 'Shift A', val: 92 },
    { shift: 'Shift B', val: 85 },
    { shift: 'Shift C', val: 78 },
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-[rgba(0,0,0,0.6)] pointer-events-auto"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl max-h-full flex flex-col bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl rounded-[var(--r-xl)] overflow-hidden relative pointer-events-auto"
      >
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-[var(--border-light)] bg-[var(--bg-inset)]">
          <div className="flex flex-col min-w-0 pr-4">
            <div className="flex items-center gap-3 mb-1 min-w-0">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)] truncate">Investigating: {lineName}</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--border-light)] bg-[var(--bg-card)] flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  {statusLabels[line.status]}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => { drillDown(lineName, { lineId: line.id }); onClose(); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--blue)] text-white rounded text-[12px] font-bold tracking-wide uppercase hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap"
            >
              Drill Down <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-full transition-colors flex-shrink-0"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            
            {/* 1. Operational Attention Areas */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                Operational Attention Areas
                {lineAlerts.length > 0 && (
                  <span className="px-2 py-0.5 rounded bg-[rgba(239,68,68,0.1)] text-[var(--red)] text-[10px] font-bold leading-none">
                    {lineAlerts.length}
                  </span>
                )}
              </h4>
              <div className="space-y-3">
                {lineAlerts.slice(0, 3).map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded border border-[var(--border-light)] bg-[var(--bg-inset)] ops-investigation-row min-w-0"
                    onClick={() => { onClose(); drillDown(alert.machine, alert); }}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <AlertCircle size={16} className={alert.color === 'red' ? 'text-[var(--red)]' : 'text-[var(--amber)]'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider truncate pr-2"
                          style={{ color: alert.color === 'red' ? 'var(--red)' : 'var(--amber)' }}
                        >
                          {alert.color === 'red' ? 'Critical' : 'Watch'} • {alert.machine}
                        </span>
                      </div>
                      <p className="text-[13px] text-[var(--text-secondary)] font-medium leading-relaxed truncate">{alert.message}</p>
                    </div>
                    <ChevronRight size={16} className="text-[var(--text-muted)] mt-2 flex-shrink-0" />
                  </div>
                ))}
                {lineAlerts.length === 0 && (
                  <div className="p-4 text-center text-[13px] text-[var(--text-muted)] border border-dashed border-[var(--border-light)] rounded">
                    No immediate attention required.
                  </div>
                )}
              </div>
            </div>

            {/* 2. Line Trend (Output vs Target) */}
            <div className="flex flex-col min-w-0">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Line Output Trend</h4>
              <div
                className="flex-1 w-full h-[160px] mt-2 ops-hover-surface p-2 rounded -m-2 cursor-pointer"
                style={{ position: 'relative' }}
                onClick={() => { onClose(); drillDown(lineName, { lineId: line.id, context: 'trend' }); }}
              >
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={hourlyProductionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                    <XAxis dataKey="hour" tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
                    <YAxis tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} dx={-5} />
                    <Tooltip content={<CT />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area type="monotone" dataKey="actual" name="Actual" stroke="var(--blue)" fill="rgba(59,130,246,0.08)" strokeWidth={2.5} />
                    <Area type="step" dataKey="target" name="Target" stroke="var(--text-muted)" fill="transparent" strokeWidth={1.5} strokeDasharray="3 3" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 4. Top Performing Machines */}
            <div className="col-span-1 pt-2">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Top Performing Machines</h4>
              <div className="space-y-2.5 mt-1">
                {lineMachines.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded bg-[var(--bg-inset)] ops-investigation-row"
                    onClick={() => { onClose(); drillDown(m.name, { lineId: line.id, machine: m.id }); }}
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-[var(--green)]" />
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">{m.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[var(--text-secondary)]">{m.oee}% OEE</span>
                      <ChevronRight size={14} className="text-[var(--text-muted)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Shift Comparison */}
            <div className="flex flex-col pt-2">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Shift Performance</h4>
              <div className="space-y-1.5 mt-1">
                {shiftComparison.map((shift, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-2 -mx-2 rounded ops-investigation-row bg-transparent"
                    onClick={() => { onClose(); drillDown(lineName, { lineId: line.id, shift: shift.shift }); }}
                  >
                    <span className="text-[12px] font-semibold text-[var(--text-secondary)] w-12">{shift.shift}</span>
                    <div className="flex-1 h-2 bg-[var(--bg-inset)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${shift.val}%`, background: 'var(--blue)' }} />
                    </div>
                    <span className="text-[12px] font-bold text-[var(--text-primary)] w-10 text-right">{shift.val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Performance Improvement Opportunities */}
            <div className="col-span-1 pt-2">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Operational Loss Contributors</h4>
              <div className="space-y-3.5">
                {lineLosses.slice(0, 2).map((loss, i) => (
                  <div
                    key={i}
                    className="p-4 rounded border border-[var(--border-light)] bg-[var(--bg-inset)] ops-investigation-row flex flex-col justify-between min-w-0"
                    onClick={() => { onClose(); drillDown(lineName, loss.contextData); }}
                  >
                    <div className="flex justify-between items-start mb-3 gap-2 min-w-0">
                      <span className="text-[13px] font-bold text-[var(--text-primary)] truncate">{loss.cause}</span>
                      <span className="text-[13px] font-bold text-[var(--red)] flex-shrink-0">{loss.hours}h</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] gap-2 min-w-0">
                      <span className="text-[var(--text-muted)] flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] flex-shrink-0" /> 
                        <span className="truncate">{loss.primaryContributor}</span>
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-semibold text-[var(--text-secondary)] whitespace-nowrap">{loss.availabilityImpact} Impact</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                      </div>
                    </div>
                  </div>
                ))}
                {lineLosses.length === 0 && (
                  <div className="p-4 text-center text-[13px] text-[var(--text-muted)] border border-dashed border-[var(--border-light)] rounded flex items-center justify-center h-full">
                    No significant improvement opportunities detected.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section Head Dashboard                                             */
/* ------------------------------------------------------------------ */
const SectionHeadDashboard = () => {
  const { drillDown } = useApp();
  const [investigatingLineIdx, setInvestigatingLineIdx] = useState(null);

  const runningCount = productionLines.filter(l => l.status === 'running' || l.status === 'good').length;
  const idleCount = productionLines.filter(l => l.status === 'idle' || l.status === 'warning').length;
  const downCount = productionLines.filter(l => l.status === 'breakdown' || l.status === 'critical').length;
  
  const lineStatusDonutData = [
    { name: 'Running', value: runningCount, color: 'var(--green)' },
    { name: 'Idle', value: idleCount, color: 'var(--amber)' },
    { name: 'Breakdown', value: downCount, color: 'var(--red)' },
  ];

  return (
    <div className="space-y-5 pb-8">
      <DrilldownBreadcrumb />

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col xl:flex-row items-stretch gap-4">
          
          <div
            className="ops-card p-5 flex flex-col items-center justify-center min-w-[140px] ops-hover-surface cursor-pointer"
            onClick={() => drillDown('CNC Section', { context: 'section_oee' })}
          >
            <OEEGauge size={95} oee={sectionKPIs.sectionOEE.value} showLabels={false} />
            <span className="text-[11px] tracking-widest uppercase font-bold mt-4 text-[var(--text-muted)] text-center">Section OEE</span>
          </div>

          <div className="grid grid-cols-2 lg:flex lg:flex-1 gap-4 min-w-0">
            {[
              { label: 'Running', value: runningCount, unit: '', color: 'var(--green)' },
              { label: 'Idle', value: idleCount, unit: '', color: 'var(--amber)' },
              { label: 'Breakdown', value: downCount, unit: '', color: 'var(--red)' },
              { label: 'Total Downtime', value: 8.4, unit: 'h', color: 'var(--red)' },
            ].map((m, i) => (
              <div
                key={i}
                className="ops-card p-5 flex flex-col justify-center items-center flex-1 ops-hover-surface cursor-pointer min-w-0"
                onClick={() => drillDown('CNC Section', { context: m.label })}
              >
                <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] text-center mb-2 truncate w-full px-1">
                  {m.label}
                </span>
                <span style={{ fontSize: 32, fontWeight: 700, color: m.color, leadingTrim: 'both', textEdge: 'cap' }}>
                  {m.value}<span className="text-[16px]">{m.unit}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="ops-card p-5 min-w-0 md:min-w-[200px] flex flex-col justify-center">
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3 text-center">Top Performing Lines</span>
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <TopPerformingLines drillDown={drillDown} />
            </div>
          </div>

          <div
            className="ops-card p-5 min-w-0 md:min-w-[220px] flex flex-col justify-center ops-hover-surface cursor-pointer"
            onClick={() => drillDown('CNC Section', { context: 'section_line_status' })}
          >
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3 text-center">Line Status</span>
            <div className="flex-1 flex items-center justify-center">
              <StatusDonut data={lineStatusDonutData} size={85} compact={true} />
            </div>
          </div>

        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-3 mt-1">
          <h2 className="section-title">Production Line Intelligence</h2>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
          {productionLines.map((line, idx) => (
            <LineModule 
              key={idx} 
              line={line} 
              index={idx} 
              drillDown={drillDown}
              onInvestigate={setInvestigatingLineIdx} 
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {investigatingLineIdx !== null && (
          <InvestigationOverlay
            lineIdx={investigatingLineIdx}
            onClose={() => setInvestigatingLineIdx(null)}
            drillDown={drillDown}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default SectionHeadDashboard;
