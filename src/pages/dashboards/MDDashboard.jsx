import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronRight, AlertCircle, CheckCircle2, X } from 'lucide-react';
import DrilldownBreadcrumb from '../../components/shared/DrilldownBreadcrumb';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import {
  mdKPIs, plantPerformanceTable, executiveAttentionItems, operationalLossContributors,
  enterpriseMachineStatus, plantMachineStatus, plantOEETrend, topPerformingMachines, shiftProductivityComparison
} from '../../data/mockData';

const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p>{label}</p>
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

const MachineStatusDonut = ({ data, size = 85, onClick, compact = false }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <div
      className={`flex items-center ${compact ? 'gap-3' : 'gap-5'} w-full ${onClick ? 'ops-hover-surface p-1.5 rounded cursor-pointer -m-1.5' : ''}`}
      onClick={onClick}
    >
      <div style={{ width: size, height: size, position: 'relative' }} className="flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[14px] font-bold leading-none text-[var(--text-primary)]">{total}</span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 flex-1 justify-center">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-[11px] font-semibold">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span style={{ color: 'var(--text-secondary)' }} className="truncate leading-tight">{item.name}</span>
            </div>
            <span style={{ color: 'var(--text-primary)', marginLeft: 6, fontVariantNumeric: 'tabular-nums' }}>{item.value}</span>
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

const BestPerformingPlants = ({ drillDown }) => {
  const ranked = [...plantPerformanceTable]
    .sort((a, b) => b.oee - a.oee)
    .slice(0, 3);

  return (
    <div className="flex flex-col justify-center h-full w-full gap-1.5">
      {ranked.map((plant, i) => {
        const plantName = plant.plant.split(' — ')[0];
        const rank = rankStyles[i];
        return (
          <div
            key={i}
            className="flex items-center justify-between ops-investigation-row bg-transparent px-2 py-1.5 rounded w-full"
            onClick={() => drillDown(plantName, { plantIdx: plantPerformanceTable.indexOf(plant) })}
          >
            <div className="flex items-center gap-2.5">
              <span style={{ fontSize: 11, fontWeight: 800, color: rank.color }}>#{i + 1}</span>
              <span className="text-[13px] font-bold text-[var(--text-primary)] truncate">{plantName}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
              {plant.oee.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const PlantModule = ({ plant, index, drillDown, onInvestigate, spanClass = '', totalPlants }) => {
  const statusColors = { good: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
  const statusLabels = { good: 'Stable', warning: 'Needs Attention', critical: 'Critical Alert' };
  const statusColor = statusColors[plant.status] || 'var(--text-muted)';

  const nameParts = plant.plant.split(' — ');
  const plantName = nameParts[0];
  const plantLocation = nameParts[1] || '';

  const isSingle = totalPlants === 1;
  const plantAlerts = executiveAttentionItems.filter(item => item.contextData?.plantIdx === index);
  const topAlert = plantAlerts[0];
  const topMachine = topPerformingMachines[index]?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + (index % 4) * 0.05 }}
      className={`ops-card flex flex-col overflow-hidden ${spanClass}`}
    >
      {/* ── Module Header ── */}
      <div
        className="px-5 py-3 border-b border-[var(--border-light)] flex justify-between items-center ops-investigation-row bg-[var(--bg-inset)]"
        onClick={() => drillDown(plantName, { plantIdx: index })}
      >
        <div className="flex items-center gap-3.5">
          <h3 className="text-[20px] font-bold text-[var(--text-primary)] leading-tight">{plantName}</h3>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-light)]">
            {plantLocation}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
            <div className="status-dot flex-shrink-0" style={{ width: 6, height: 6, background: statusColor }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {statusLabels[plant.status]}
            </span>
          </div>
          <ChevronRight size={16} className="text-[var(--text-muted)]" />
        </div>
      </div>

      {/* ── Executive Summary (Fixed View) ── */}
      <div className="p-6 flex flex-wrap lg:flex-nowrap items-center justify-between gap-8 bg-[var(--bg-card)]">

        {/* KPIs */}
        <div className="flex items-center gap-8 min-w-max">
          <div
            className="flex-shrink-0 flex flex-col items-center ops-hover-surface p-1 rounded cursor-pointer -m-1"
            onClick={() => drillDown(plantName, { plantIdx: index })}
          >
            <OEEGauge size={85} oee={plant.oee} showLabels={false} />
            <span className="text-[10px] tracking-widest uppercase font-bold mt-2 text-[var(--text-muted)]">OEE</span>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(plantName, { plantIdx: index, context: 'availability' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Avail</div>
              <div className="text-[16px] font-bold text-[var(--blue)]">{plant.avail.toFixed(1)}%</div>
            </div>
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(plantName, { plantIdx: index, context: 'performance' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Perf</div>
              <div className="text-[16px] font-bold text-[var(--purple)]">{plant.perf.toFixed(1)}%</div>
            </div>
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(plantName, { plantIdx: index, context: 'quality' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Qual</div>
              <div className="text-[16px] font-bold text-[var(--green)]">{plant.qual.toFixed(1)}%</div>
            </div>
            <div className="ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(plantName, { plantIdx: index, context: 'downtime' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Down</div>
              <div className="text-[16px] font-bold text-[var(--red)]">{plant.downtime}h</div>
            </div>
          </div>
        </div>

        {/* Dynamic Extra Info for Single Plant Mode */}
        {isSingle && (
          <>
            <div className="hidden lg:block w-px h-16 bg-[var(--border-light)]" />
            
            <div className="flex flex-col gap-3 min-w-[200px] flex-1">
              {topAlert && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <AlertCircle size={12} className={topAlert.severity === 'critical' ? 'text-[var(--red)]' : 'text-[var(--amber)]'} />
                    Top Attention Area
                  </span>
                  <span className="text-[12px] font-medium text-[var(--text-primary)] leading-tight line-clamp-2">{topAlert.message}</span>
                </div>
              )}
              {topMachine && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-[var(--green)]" />
                    Top Performing Machine
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-[var(--text-primary)]">{topMachine.name}</span>
                    <span className="text-[12px] font-semibold text-[var(--text-secondary)]">{topMachine.oee}% OEE</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="hidden lg:block w-px h-16 bg-[var(--border-light)]" />

        {/* Donut & CTA */}
        <div className="flex items-center gap-4 flex-1 justify-end min-w-max">
          <div className="w-[180px]">
            <MachineStatusDonut
              data={plantMachineStatus[index]}
              size={85}
              compact={true}
              onClick={() => drillDown(plantName, { plantIdx: index, context: 'machine_status' })}
            />
          </div>

          <button
            onClick={() => onInvestigate(index)}
            className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2 rounded bg-[var(--blue)] text-white cursor-pointer hover:bg-blue-600 transition-colors shadow border-none h-10"
          >
            <span className="text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">More Info</span>
            <ChevronRight size={16} className="flex-shrink-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Premium Investigation Overlay                                         */
/* ------------------------------------------------------------------ */
const InvestigationOverlay = ({ plantIdx, onClose, drillDown }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (plantIdx === null) return null;

  const plant = plantPerformanceTable[plantIdx];
  const nameParts = plant.plant.split(' — ');
  const plantName = nameParts[0];
  const plantLocation = nameParts[1] || '';
  const plantKey = `plant${plantName.split(' ')[1]}`;

  const plantAlerts = executiveAttentionItems.filter(item => item.contextData?.plantIdx === plantIdx);
  const plantLosses = operationalLossContributors.filter(item => item.mostAffectedPlant === plantName);

  const statusColors = { good: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
  const statusLabels = { good: 'Stable', warning: 'Needs Attention', critical: 'Critical Alert' };
  const statusColor = statusColors[plant.status] || 'var(--text-muted)';

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
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl rounded-[var(--r-xl)] pointer-events-auto overflow-hidden"
      >
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-[var(--border-light)] bg-[var(--bg-inset)]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)]">{plantName} Investigation Workspace</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {statusLabels[plant.status]}
                </span>
              </div>
            </div>
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">{plantLocation}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { onClose(); drillDown(plantName, { plantIdx }); }}
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

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={plantIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10"
            >

              <div className="col-span-1 lg:col-span-2">
                <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                  Operational Attention Areas
                  {plantAlerts.length > 0 && (
                    <span className="px-2 py-0.5 rounded bg-[rgba(239,68,68,0.1)] text-[var(--red)] text-[10px] font-bold leading-none">
                      {plantAlerts.length}
                    </span>
                  )}
                </h4>
                <div className="space-y-3">
                  {plantAlerts.map((alert, i) => (
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
                  {plantAlerts.length === 0 && (
                    <div className="p-4 text-center text-[13px] text-[var(--text-muted)] border border-dashed border-[var(--border-light)] rounded">
                      No immediate attention required.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">OEE Trend (Shift)</h4>
                <div
                  className="flex-1 w-full min-h-[160px] mt-2 ops-hover-surface p-2 rounded -m-2 cursor-pointer"
                  onClick={() => { onClose(); drillDown(plantName, { plantIdx, context: 'trend' }); }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={plantOEETrend[plantIdx].filter(d => d.oee != null)}
                      margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                      onClick={(e) => { onClose(); drillDown(plantName, { plantIdx, context: 'trend', point: e?.activeLabel }); }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                      <XAxis dataKey="label" tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
                      <YAxis domain={[60, 100]} tick={{ fill: 'var(--chart-tick)', fontSize: 10 }} axisLine={false} tickLine={false} dx={-5} />
                      <Tooltip content={<CT />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      <Line type="monotone" dataKey="oee" name="OEE" stroke="var(--blue)" strokeWidth={2.5} dot={{ fill: 'var(--bg)', stroke: 'var(--blue)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-span-1 pt-2">
                <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Top Performing Machines</h4>
                <div className="space-y-2.5 mt-1">
                  {topPerformingMachines[plantIdx].map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded bg-[var(--bg-inset)] ops-investigation-row"
                      onClick={() => { onClose(); drillDown(m.name, { plantIdx, machine: m.name }); }}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="text-[var(--green)]" />
                        <span className="text-[13px] font-semibold text-[var(--text-primary)]">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[var(--text-secondary)]">{m.oee}% OEE</span>
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col pt-2">
                <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Shift Performance</h4>
                <div className="space-y-1.5 mt-1">
                  {shiftProductivityComparison.map((shift, i) => {
                    const val = shift[plantKey.toLowerCase()] || shift[plantKey];
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-2 -mx-2 rounded ops-investigation-row bg-transparent"
                        onClick={() => { onClose(); drillDown(plantName, { plantIdx, shift: shift.shift }); }}
                      >
                        <span className="text-[12px] font-semibold text-[var(--text-secondary)] w-12">{shift.shift}</span>
                        <div className="flex-1 h-2 bg-[var(--bg-inset)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${val}%`, background: 'var(--blue)' }} />
                        </div>
                        <span className="text-[12px] font-bold text-[var(--text-primary)] w-10 text-right">{val}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-1 pt-2">
                <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Performance Improvement Opportunities</h4>
                <div className="space-y-3.5">
                  {plantLosses.slice(0, 2).map((loss, i) => (
                    <div
                      key={i}
                      className="p-4 rounded border border-[var(--border-light)] bg-[var(--bg-inset)] ops-investigation-row flex flex-col justify-between"
                      onClick={() => { onClose(); drillDown(plantName, loss.contextData); }}
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
                  {plantLosses.length === 0 && (
                    <div className="p-4 text-center text-[13px] text-[var(--text-muted)] border border-dashed border-[var(--border-light)] rounded flex items-center justify-center h-full">
                      No significant improvement opportunities detected.
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* MD Dashboard                                                          */
/* ------------------------------------------------------------------ */
const MDDashboard = () => {
  const { drillDown } = useApp();
  const [investigatingPlantIdx, setInvestigatingPlantIdx] = useState(null);

  const handleInvestigate = (idx) => {
    setInvestigatingPlantIdx(idx);
  };

  const getColSpanClass = (idx, total) => {
    if (total === 1) return 'xl:col-span-2';
    if (total === 3 && idx === 2) return 'xl:col-span-2';
    return '';
  };

  return (
    <div className="space-y-5 pb-8">
      <DrilldownBreadcrumb />

      {/* ── Global MD Command Strip ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col xl:flex-row items-stretch gap-4">

          {/* 1. All Plants Cumulative OEE */}
          <div
            className="ops-card p-5 flex flex-col items-center justify-center min-w-[140px] ops-hover-surface cursor-pointer"
            onClick={() => drillDown('All Plants', { context: 'global_oee' })}
          >
            <OEEGauge size={95} oee={mdKPIs.plantOEEAvg.value} showLabels={false} />
            <span className="text-[11px] tracking-widest uppercase font-bold mt-4 text-[var(--text-muted)] text-center">Cumulative OEE</span>
          </div>

          {/* 2-5. APQD */}
          <div className="flex flex-1 gap-4">
            {[
              { label: 'Availability', value: mdKPIs.availability.value, unit: '%', color: 'var(--blue)' },
              { label: 'Performance', value: mdKPIs.performance.value, unit: '%', color: 'var(--purple)' },
              { label: 'Quality', value: mdKPIs.quality.value, unit: '%', color: 'var(--green)' },
              { label: 'Total Downtime', value: mdKPIs.totalDowntime.value, unit: 'h', color: 'var(--red)' },
            ].map((m, i) => (
              <div
                key={i}
                className="ops-card p-5 flex flex-col justify-center items-center flex-1 ops-hover-surface cursor-pointer min-w-[120px]"
                onClick={() => drillDown('Enterprise', { context: m.label })}
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

          {/* 6. Best Performing Plants */}
          <div className="ops-card p-5 min-w-[180px] flex flex-col">
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3">Best Performing</span>
            <BestPerformingPlants drillDown={drillDown} />
          </div>

          {/* 7. All Machine Status */}
          <div
            className="ops-card p-5 min-w-[220px] flex flex-col justify-center ops-hover-surface cursor-pointer"
            onClick={() => drillDown('Enterprise', { context: 'global_machine_status' })}
          >
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-4">All Machine Status</span>
            <MachineStatusDonut data={enterpriseMachineStatus} size={85} compact={true} />
          </div>

        </div>
      </motion.div>

      {/* ── Plant Operational Intelligence Modules ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-3 mt-1">
          <h2 className="section-title">Plant Operational Intelligence</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
          {plantPerformanceTable.map((plant, idx) => (
            <PlantModule
              key={idx}
              plant={plant}
              index={idx}
              drillDown={drillDown}
              onInvestigate={handleInvestigate}
              totalPlants={plantPerformanceTable.length}
              spanClass={getColSpanClass(idx, plantPerformanceTable.length)}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Investigation Overlay */}
      <AnimatePresence>
        {investigatingPlantIdx !== null && (
          <InvestigationOverlay
            plantIdx={investigatingPlantIdx}
            onClose={() => setInvestigatingPlantIdx(null)}
            drillDown={drillDown}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MDDashboard;
