import React from 'react';
import { motion } from 'framer-motion';
import DrilldownBreadcrumb from '../../components/shared/DrilldownBreadcrumb';
import MachineCard from '../../components/shared/MachineCard';
import MachineTimeline from '../../components/shared/MachineTimeline';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import {
  machineCards, productionCounter, machineTimelineData,
} from '../../data/mockData';

const LineStatusDonut = ({ machines }) => {
  const counts = { running: 0, idle: 0, breakdown: 0, maintenance: 0, noplan: 0 };
  machines.forEach(m => counts[m.status] = (counts[m.status] || 0) + 1);
  const total = machines.length;
  
  const radius = 34;
  const cx = 44;
  const cy = 44;
  const size = 88;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  
  const colors = {
    running: 'var(--status-running)',
    idle: 'var(--status-idle)',
    breakdown: 'var(--status-breakdown)',
    maintenance: 'var(--status-maintenance)',
    noplan: 'var(--status-noplan)'
  };

  let previous = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        {['running', 'idle', 'breakdown', 'maintenance', 'noplan'].map(status => {
          if (counts[status] === 0) return null;
          const dasharray = `${(counts[status] / total) * circumference} ${circumference}`;
          const dashoffset = -(previous / total) * circumference;
          previous += counts[status];
          return (
            <circle
              key={status} cx={cx} cy={cy} r={radius} fill="transparent"
              stroke={colors[status]} strokeWidth={strokeWidth}
              strokeDasharray={dasharray} strokeDashoffset={dashoffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{counts.running} / {total}</span>
        <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-muted)', marginTop: -2 }}>Running</span>
      </div>
    </div>
  );
};

const LineHeadDashboard = () => {
  const { drillDown, tick } = useApp();

  const progressPct = Math.min(100, Math.round((productionCounter.totalToday / productionCounter.targetToday) * 100));
  const lineOeeAvg = machineCards.reduce((acc, m) => acc + (m.oee || 0), 0) / machineCards.length;

  return (
    <div className="space-y-6">
      <DrilldownBreadcrumb />

      {/* Header — Line KPI Grid */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="ops-card p-4 flex flex-col items-center justify-center">
            <p className="text-label mb-2 text-[10px] tracking-widest uppercase">Line OEE</p>
            <OEEGauge size={85} oee={lineOeeAvg.toFixed(1)} showLabels={false} />
          </div>
          <div className="ops-card p-4 flex flex-col justify-center items-center">
            <p className="text-label mb-2 text-[10px] tracking-widest uppercase">Line Status</p>
            <LineStatusDonut machines={machineCards} />
          </div>
          <div className="ops-card p-4 flex flex-col justify-center items-center">
            <p className="text-label mb-2 text-[10px] tracking-widest uppercase">Produced</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
              {productionCounter.totalToday} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>/ {productionCounter.targetToday}</span>
            </p>
          </div>
          {[
            { label: 'Availability', value: 94.8, unit: '%', color: 'var(--blue)' },
            { label: 'Performance', value: 93.6, unit: '%', color: 'var(--purple)' },
            { label: 'Quality', value: 98.4, unit: '%', color: 'var(--green)' },
          ].map((m, i) => (
            <div key={i} className="ops-card p-4 flex flex-col justify-center items-center">
              <p className="text-label mb-2 text-[10px] tracking-widest uppercase">{m.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.value}{m.unit}</p>
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: 'var(--text-muted)' }}>{progressPct}% of target</span>
            <span style={{ color: 'var(--text-muted)' }}>{Math.max(0, productionCounter.targetToday - productionCounter.totalToday).toLocaleString()} remaining</span>
          </div>
          <div className="progress-bar" style={{ height: 8 }}>
            <div className="progress-fill" style={{
              width: `${progressPct}%`,
              background: progressPct >= 90 ? 'var(--green)' : progressPct >= 70 ? 'var(--amber)' : 'var(--blue)',
            }} />
          </div>
        </div>
      </motion.div>

      {/* Machine Cards */}
      <div>
        <h2 className="section-title mb-3">Machines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {machineCards.map((machine, i) => (
            <motion.div key={machine.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}>
              <MachineCard
                machine={machine}
                onClick={() => drillDown(machine.id, { machineId: machine.id })}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Machine Timeline */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }} className="ops-card p-5">
        <h3 className="section-title mb-1">Machine Timeline</h3>
        <p className="section-subtitle mb-4">State history across current shift</p>
        <MachineTimeline data={machineTimelineData} shiftHours={8} />
      </motion.div>
    </div>
  );
};

export default LineHeadDashboard;
