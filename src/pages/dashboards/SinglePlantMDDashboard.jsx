import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { AlertCircle, ArrowUpRight, Clock, Activity, Zap } from 'lucide-react';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import {
  plantMachineStatus,
  oeeTrendData,
  topPerformingMachines,
  operationalLossContributors,
  executiveAttentionItems,
  plantPerformanceTable,
  shiftOEEData
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
    </div>
  );
};

const SinglePlantMDDashboard = () => {
  const { drillDown } = useApp();
  // Force it to use the first plant for the prototype
  const plant = plantPerformanceTable[0];
  const machinesStatus = plantMachineStatus[0];
  
  // Aggregate mock metrics based on single plant
  const runningMachines = machinesStatus.find(s => s.name === 'Running')?.value || 0;
  const idleMachines = machinesStatus.find(s => s.name === 'Idle')?.value || 0;
  const breakdownMachines = machinesStatus.find(s => s.name === 'Breakdown')?.value || 0;
  const totalMachines = runningMachines + idleMachines + breakdownMachines;

  const bestShift = [...shiftOEEData].sort((a, b) => b.oee - a.oee)[0];
  const worstShift = [...shiftOEEData].sort((a, b) => a.oee - b.oee)[0];
  
  // Alerts specific to plant
  const plantAlerts = executiveAttentionItems.filter(item => item.contextData?.plantIdx === 0);
  const criticalAlertsCount = plantAlerts.filter(a => a.severity === 'critical').length;

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden pb-2">
      
      {/* ── ROW 1: Command Strip ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 h-[100px] flex-shrink-0">
        
        {/* Plant OEE */}
        <div 
          className="ops-card px-4 py-2 flex flex-col justify-center items-center min-w-[140px] cursor-pointer ops-hover-surface"
          onClick={() => drillDown(plant.plant.split(' — ')[0], { context: 'oee' })}
        >
          <OEEGauge size={85} oee={plant.oee} showLabels={false} />
          <span className="text-[10px] tracking-widest uppercase font-bold mt-1 text-[var(--text-muted)] text-center">Plant OEE</span>
        </div>

        {/* Core Metrics: APQ + Downtime + Production */}
        <div className="flex flex-1 gap-3">
          {[
            { label: 'Availability', value: plant.avail, unit: '%', color: 'var(--blue)' },
            { label: 'Performance', value: plant.perf, unit: '%', color: 'var(--purple)' },
            { label: 'Quality', value: plant.qual, unit: '%', color: 'var(--green)' },
            { label: 'Total Downtime', value: plant.downtime, unit: 'h', color: 'var(--red)' },
            { label: 'Production', value: plant.production, unit: 'u', color: 'var(--text-primary)' },
          ].map((m, i) => (
            <div key={i} className="ops-card px-4 py-2 flex flex-col justify-center items-center flex-1 cursor-pointer ops-hover-surface">
              <span className="text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-1 text-center">{m.label}</span>
              <span style={{ fontSize: 26, fontWeight: 800, color: m.color, leadingTrim: 'both', textEdge: 'cap' }}>
                {m.value}<span className="text-[14px] ml-0.5">{m.unit}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Machine Status */}
        <div className="ops-card px-4 py-2 flex items-center justify-between min-w-[220px]">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-1">Fleet Status</span>
            <div className="flex justify-between items-end w-full">
               <div className="flex flex-col">
                 <span className="text-[20px] font-bold text-[var(--green)] leading-none">{runningMachines}</span>
                 <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">Run</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[20px] font-bold text-[var(--amber)] leading-none">{idleMachines}</span>
                 <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">Idle</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[20px] font-bold text-[var(--red)] leading-none">{breakdownMachines}</span>
                 <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">Down</span>
               </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── ROW 2: Trend & Shift (60% / 40%) ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-3 flex-1 min-h-0">
        
        {/* OEE Trend (60%) */}
        <div className="ops-card p-4 flex flex-col flex-[6] min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">OEE Trend (24H)</h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[var(--green)] flex items-center"><ArrowUpRight size={14}/> +1.4%</span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase">vs Yesterday</span>
               </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={oeeTrendData.daily} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="oeeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} dy={10} />
                <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} dx={-10} />
                <Tooltip content={<CT />} cursor={{ stroke: 'var(--border-light)', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="oee" stroke="var(--blue)" strokeWidth={3} fillOpacity={1} fill="url(#oeeFill)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shift Intelligence (40%) */}
        <div className="ops-card p-4 flex flex-col flex-[4] min-w-0">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Shift Intelligence</h3>
          
          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[var(--border-light)]">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-1">Best Shift</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[16px] font-bold text-[var(--text-primary)]">{bestShift.shift.split('\n')[0]}</span>
                <span className="text-[12px] font-bold text-[var(--green)]">{bestShift.oee}% OEE</span>
              </div>
            </div>
            <div className="w-px h-8 bg-[var(--border-light)]" />
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-1">Delta</span>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-bold text-[var(--text-primary)]">{(bestShift.oee - worstShift.oee).toFixed(1)}%</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Variance</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftOEEData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-light)" />
                <XAxis type="number" domain={[60, 100]} hide />
                <YAxis dataKey="shift" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-primary)', fontWeight: 600 }} width={60} tickFormatter={(v) => v.split('\n')[0]} />
                <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ backgroundColor: 'var(--bg-popover)', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: 11, fontWeight: 600 }} itemStyle={{ color: 'var(--text-primary)' }} />
                <Bar dataKey="oee" name="OEE" radius={[0, 4, 4, 0]} barSize={16}>
                  {shiftOEEData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.oee >= 85 ? 'var(--green)' : entry.oee >= 75 ? 'var(--amber)' : 'var(--red)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ── ROW 3: Granular Details (4 x 25%) ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 flex-1 min-h-0">
        
        {/* Active Alerts */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Active Alerts</h3>
          <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
            {plantAlerts.map((alert, i) => (
              <div key={i} className="flex gap-2.5 p-2 rounded bg-[var(--bg-inset)] border border-[var(--border-light)] items-start">
                <AlertCircle size={14} className={`mt-0.5 flex-shrink-0 ${alert.severity === 'critical' ? 'text-[var(--red)]' : 'text-[var(--amber)]'}`} />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] truncate">{alert.category}</span>
                  <span className="text-[11px] font-semibold text-[var(--text-primary)] leading-snug">{alert.message}</span>
                </div>
              </div>
            ))}
            {plantAlerts.length === 0 && (
              <div className="h-full flex items-center justify-center text-[11px] text-[var(--text-muted)] italic">No active alerts</div>
            )}
          </div>
        </div>

        {/* Improvement Opportunities */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Top Opportunity</h3>
          <div className="flex flex-col h-full bg-[var(--bg-inset)] border border-[var(--border-light)] rounded p-3 justify-center">
            {operationalLossContributors[0] ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                   <Zap size={16} className="text-[var(--amber)]" />
                   <span className="text-[13px] font-bold text-[var(--text-primary)] truncate">{operationalLossContributors[0].cause}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                   <div className="flex flex-col">
                      <span className="text-[18px] font-bold text-[var(--red)] leading-none">{operationalLossContributors[0].hours}h</span>
                      <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">Lost Time</span>
                   </div>
                   <div className="flex flex-col text-right">
                      <span className="text-[18px] font-bold text-[var(--text-primary)] leading-none">{operationalLossContributors[0].availabilityImpact}</span>
                      <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">OEE Impact</span>
                   </div>
                </div>
                <div className="mt-3 text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-card)] p-1.5 rounded text-center truncate">
                   Primary Source: {operationalLossContributors[0].primaryContributor}
                </div>
              </>
            ) : (
              <div className="text-center text-[11px] text-[var(--text-muted)]">Optimal Operation</div>
            )}
          </div>
        </div>

        {/* Machine Leaderboard */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Top Machines</h3>
          <div className="flex flex-col gap-2 h-full justify-center">
            {topPerformingMachines[0]?.slice(0,3).map((mac, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-1.5 bg-[var(--bg-inset)] rounded border border-[var(--border-light)]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--text-muted)]">0{i+1}</span>
                  <span className="text-[12px] font-bold text-[var(--text-primary)]">{mac.name}</span>
                </div>
                <span className="text-[13px] font-bold text-[var(--green)]">{mac.oee}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Downtime Contributors */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Downtime Causes</h3>
          <div className="flex flex-col gap-2.5 h-full justify-center">
            {operationalLossContributors.slice(0,3).map((loss, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[11px] font-semibold">
                  <span className="text-[var(--text-primary)] truncate">{loss.cause}</span>
                  <span className="text-[var(--red)]">{loss.percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-inset)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--red)] rounded-full" style={{ width: `${loss.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── FOOTER STRIP ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex-shrink-0 h-8 flex items-center justify-between px-4 border-t border-[var(--border)] mt-1">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[var(--green)]" />
             <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Plant Status: Stable</span>
           </div>
           <div className="flex items-center gap-2">
             <Clock size={12} className="text-[var(--text-muted)]" />
             <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Live Data Stream Active</span>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <span className="text-[10px] uppercase font-bold text-[var(--red)] flex items-center gap-1"><AlertCircle size={12}/> {criticalAlertsCount} Critical Alerts</span>
           <span className="text-[10px] uppercase font-bold text-[var(--text-primary)] flex items-center gap-1"><Activity size={12}/> {totalMachines} Machines Monitored</span>
        </div>
      </motion.div>

    </div>
  );
};

export default SinglePlantMDDashboard;
