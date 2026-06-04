import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronRight, AlertCircle, CheckCircle2, X } from 'lucide-react';
import DrilldownBreadcrumb from '../../components/shared/DrilldownBreadcrumb';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import {
  plantKPIs, deptOEEComparison, hourlyOEETrend, plantAttentionItems, shiftProductivityComparison, operationalLossContributors
} from '../../data/mockData';

const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p>{label}</p>
      {/* Show OEE explicitly if it's not the primary payload, or if it is */}
      {payload.map((p, i) => p.value != null && (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value}%
        </p>
      ))}
      {payload[0]?.payload?.availability != null && (
        <>
          <p style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 10, marginTop: 4 }}>Avail: {payload[0].payload.availability}%</p>
          <p style={{ color: 'var(--purple)', fontWeight: 600, fontSize: 10 }}>Perf: {payload[0].payload.performance}%</p>
          <p style={{ color: 'var(--green)', fontWeight: 600, fontSize: 10 }}>Qual: {payload[0].payload.quality}%</p>
        </>
      )}
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

const TopPerformingDepartments = ({ drillDown }) => {
  const ranked = [...deptOEEComparison]
    .sort((a, b) => b.oee - a.oee)
    .slice(0, 3);

  return (
    <div className="flex flex-col justify-center h-full w-full gap-2">
      {ranked.map((dept, i) => {
        const rank = rankStyles[i];
        return (
          <div
            key={i}
            className="flex items-center justify-between ops-investigation-row bg-transparent px-2 py-1.5 rounded w-full"
            onClick={() => drillDown(dept.dept, { deptIdx: deptOEEComparison.indexOf(dept) })}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span style={{ fontSize: 11, fontWeight: 800, color: rank.color, flexShrink: 0 }}>#{i + 1}</span>
              <span className="text-[13px] font-bold text-[var(--text-primary)] truncate">{dept.dept}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
              {dept.oee.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const DepartmentModule = ({ dept, index, drillDown, onInvestigate }) => {
  const status = dept.oee >= 82 ? 'good' : dept.oee >= 76 ? 'warning' : 'critical';
  const statusColors = { good: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
  const statusLabels = { good: 'Stable', warning: 'Needs Attention', critical: 'Critical Alert' };
  const statusColor = statusColors[status] || 'var(--text-muted)';

  const deptMachineStatus = [
    { name: 'Running', value: 14, color: 'var(--green)' },
    { name: 'Idle', value: 2, color: 'var(--amber)' },
    { name: 'Breakdown', value: status === 'critical' ? 2 : 0, color: 'var(--red)' },
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
        onClick={() => drillDown(dept.dept, { deptIdx: index })}
      >
        <div className="flex items-center gap-3.5">
          <h3 className="text-[20px] font-bold text-[var(--text-primary)] leading-tight">{dept.dept}</h3>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
            <div className="status-dot flex-shrink-0" style={{ width: 6, height: 6, background: statusColor }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {statusLabels[status]}
            </span>
          </div>
          <ChevronRight size={16} className="text-[var(--text-muted)]" />
        </div>
      </div>

      <div className="p-6 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-8 bg-[var(--bg-card)]">
        
        <div className="flex items-center gap-4 lg:gap-8 min-w-max">
          <div
            className="flex-shrink-0 flex flex-col items-center ops-hover-surface p-1 rounded cursor-pointer -m-1"
            onClick={() => drillDown(dept.dept, { deptIdx: index })}
          >
            <OEEGauge size={85} oee={dept.oee} showLabels={false} />
            <span className="text-[10px] tracking-widest uppercase font-bold mt-2 text-[var(--text-muted)]">OEE</span>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(dept.dept, { deptIdx: index, context: 'availability' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Avail</div>
              <div className="text-[16px] font-bold text-[var(--blue)]">{dept.availability.toFixed(1)}%</div>
            </div>
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(dept.dept, { deptIdx: index, context: 'performance' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Perf</div>
              <div className="text-[16px] font-bold text-[var(--purple)]">{dept.performance.toFixed(1)}%</div>
            </div>
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(dept.dept, { deptIdx: index, context: 'quality' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Qual</div>
              <div className="text-[16px] font-bold text-[var(--green)]">{dept.quality.toFixed(1)}%</div>
            </div>
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(dept.dept, { deptIdx: index, context: 'downtime' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Down</div>
              <div className="text-[16px] font-bold text-[var(--red)]">8h</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-16 bg-[var(--border-light)]" />

        <div className="flex items-center gap-3 lg:gap-6 flex-1 justify-end min-w-0">
          <div className="flex-shrink-0">
            <StatusDonut
              data={deptMachineStatus}
              size={85}
              compact={true}
              onClick={() => drillDown(dept.dept, { deptIdx: index, context: 'machine_status' })}
            />
          </div>
          
          <button
            onClick={() => onInvestigate(index)}
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[var(--blue)] text-white cursor-pointer hover:bg-blue-600 transition-colors shadow border-none h-[36px]"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">More Info</span>
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
const InvestigationOverlay = ({ deptIdx, onClose, drillDown }) => {
  if (deptIdx === null) return null;

  const dept = deptOEEComparison[deptIdx];
  const deptName = dept.dept;

  const deptAlerts = plantAttentionItems.filter(item => item.contextData?.deptIdx === deptIdx); 
  const deptLosses = operationalLossContributors.filter(item => item.affectedDepartment === deptName);

  const status = dept.oee >= 82 ? 'good' : dept.oee >= 76 ? 'warning' : 'critical';
  const statusColors = { good: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
  const statusLabels = { good: 'Stable', warning: 'Needs Attention', critical: 'Critical Alert' };
  const statusColor = statusColors[status] || 'var(--text-muted)';

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
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)]">Investigating: {deptName}</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {statusLabels[status]}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => { drillDown(deptName, { deptIdx }); onClose(); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--blue)] text-white rounded text-[12px] font-bold tracking-wide uppercase hover:bg-blue-600 transition-colors shadow-sm"
            >
              Drill Down <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-full transition-colors"
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
                {deptAlerts.length > 0 && (
                  <span className="px-2 py-0.5 rounded bg-[rgba(239,68,68,0.1)] text-[var(--red)] text-[10px] font-bold leading-none">
                    {deptAlerts.length}
                  </span>
                )}
              </h4>
              <div className="space-y-3">
                {deptAlerts.slice(0, 3).map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded border border-[var(--border-light)] bg-[var(--bg-inset)] ops-investigation-row"
                    onClick={() => { onClose(); drillDown(alert.targetLabel, alert.contextData); }}
                  >
                    <div className="mt-0.5">
                      <AlertCircle size={16} className={alert.severity === 'critical' ? 'text-[var(--red)]' : 'text-[var(--amber)]'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider"
                          style={{ color: alert.severity === 'critical' ? 'var(--red)' : 'var(--amber)' }}
                        >
                          {alert.severity === 'critical' ? 'Critical' : 'Watch'} • {alert.targetLabel}
                        </span>
                      </div>
                      <p className="text-[13px] text-[var(--text-secondary)] font-medium leading-relaxed">{alert.message}</p>
                    </div>
                    <ChevronRight size={16} className="text-[var(--text-muted)] mt-2" />
                  </div>
                ))}
                {deptAlerts.length === 0 && (
                  <div className="p-4 text-center text-[13px] text-[var(--text-muted)] border border-dashed border-[var(--border-light)] rounded">
                    No immediate attention required.
                  </div>
                )}
              </div>
            </div>

            {/* 2. OEE Trend */}
            <div className="flex flex-col">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Department OEE Trend</h4>
              <div
                className="flex-1 w-full h-[160px] mt-2 ops-hover-surface p-2 rounded -m-2 cursor-pointer"
                style={{ position: 'relative' }}
                onClick={() => { onClose(); drillDown(deptName, { deptIdx, context: 'trend' }); }}
              >
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <AreaChart data={hourlyOEETrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                    <XAxis dataKey="time" tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
                    <YAxis domain={[70, 100]} tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} dx={-5} />
                    <Tooltip content={<CT />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area type="monotone" dataKey="oee" name="OEE" stroke="var(--blue)" fill="rgba(59,130,246,0.08)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 4. Top Performing Sections */}
            <div className="col-span-1 pt-2">
              <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Top Performing Sections</h4>
              <div className="space-y-2.5 mt-1">
                {['CNC Section', 'VMC Section', 'Lathe Section'].slice(0, 3).map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded bg-[var(--bg-inset)] ops-investigation-row"
                    onClick={() => { onClose(); drillDown(name, { deptIdx, section: name }); }}
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-[var(--green)]" />
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">{name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[var(--text-secondary)]">{(92 - i * 3.4).toFixed(1)}% OEE</span>
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
                    onClick={() => { onClose(); drillDown(deptName, { deptIdx, shift: shift.shift }); }}
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
                {deptLosses.slice(0, 2).map((loss, i) => (
                  <div
                    key={i}
                    className="p-4 rounded border border-[var(--border-light)] bg-[var(--bg-inset)] ops-investigation-row flex flex-col justify-between"
                    onClick={() => { onClose(); drillDown(deptName, loss.contextData); }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[13px] font-bold text-[var(--text-primary)]">{loss.cause}</span>
                      <span className="text-[13px] font-bold text-[var(--red)]">{loss.hours}h</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" /> {loss.primaryContributor}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--text-secondary)]">{loss.availabilityImpact} Impact</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                      </div>
                    </div>
                  </div>
                ))}
                {deptLosses.length === 0 && (
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
/* Plant Head Dashboard                                               */
/* ------------------------------------------------------------------ */
const PlantHeadDashboard = () => {
  const { drillDown } = useApp();
  const [investigatingDeptIdx, setInvestigatingDeptIdx] = useState(null);

  const deptStatusDonutData = [
    { name: 'Stable', value: deptOEEComparison.filter(d => d.oee >= 82).length, color: 'var(--green)' },
    { name: 'Warning', value: deptOEEComparison.filter(d => d.oee < 82 && d.oee >= 76).length, color: 'var(--amber)' },
    { name: 'Critical', value: deptOEEComparison.filter(d => d.oee < 76).length, color: 'var(--red)' },
  ];

  return (
    <div className="space-y-5 pb-8">
      <DrilldownBreadcrumb />

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col xl:flex-row items-stretch gap-4">
          <div
            className="ops-card p-5 flex flex-col items-center justify-center min-w-[140px] ops-hover-surface cursor-pointer"
            onClick={() => drillDown('Plant A', { context: 'global_oee' })}
          >
            <OEEGauge size={95} oee={plantKPIs.plantOEE.value} showLabels={false} />
            <span className="text-[11px] tracking-widest uppercase font-bold mt-4 text-[var(--text-muted)] text-center">Plant OEE</span>
          </div>

          <div className="flex flex-1 gap-4 min-w-0">
            {[
              { label: 'Availability',    value: plantKPIs.availability.value,  unit: '%', color: 'var(--blue)'   },
              { label: 'Performance',     value: plantKPIs.performance.value,   unit: '%', color: 'var(--purple)' },
              { label: 'Quality',         value: plantKPIs.quality.value,       unit: '%', color: 'var(--green)'  },
              { label: 'Total Downtime',  value: plantKPIs.downtime.value,      unit: 'h', color: 'var(--red)'    },
            ].map((m, i) => (
              <div
                key={i}
                className="ops-card p-5 flex flex-col justify-center items-center flex-1 ops-hover-surface cursor-pointer min-w-0"
                onClick={() => drillDown('Plant A', { context: m.label })}
              >
                <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] text-center mb-2">
                  {m.label}
                </span>
                <span style={{ fontSize: 32, fontWeight: 700, color: m.color, leadingTrim: 'both', textEdge: 'cap' }}>
                  {m.value.toFixed(1)}<span className="text-[16px]">{m.unit}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="ops-card p-5 min-w-[200px] flex flex-col justify-center">
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3 text-center">Top Performing Departments</span>
            <div className="flex-1 flex flex-col justify-center">
              <TopPerformingDepartments drillDown={drillDown} />
            </div>
          </div>

          <div
            className="ops-card p-5 min-w-[220px] flex flex-col justify-center ops-hover-surface cursor-pointer"
            onClick={() => drillDown('Plant A', { context: 'global_machine_status' })}
          >
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3 text-center">Department Status</span>
            <div className="flex-1 flex items-center justify-center">
              <StatusDonut data={deptStatusDonutData} size={85} compact={true} />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-3 mt-1">
          <h2 className="section-title">Department Intelligence</h2>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
          {deptOEEComparison.map((dept, idx) => (
            <DepartmentModule 
              key={idx} 
              dept={dept} 
              index={idx} 
              drillDown={drillDown}
              onInvestigate={setInvestigatingDeptIdx} 
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {investigatingDeptIdx !== null && (
          <InvestigationOverlay
            deptIdx={investigatingDeptIdx}
            onClose={() => setInvestigatingDeptIdx(null)}
            drillDown={drillDown}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default PlantHeadDashboard;
