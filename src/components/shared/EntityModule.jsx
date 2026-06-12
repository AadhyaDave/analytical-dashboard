import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import OEEGauge from './OEEGauge';

export const MachineStatusDonut = ({ data, size = 85, onClick, compact = false }) => {
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

const EntityModule = ({ 
  entity, 
  index, 
  drillDown, 
  onInvestigate, 
  spanClass = '', 
  totalEntities,
  entityName,
  entityLocation,
  topAlert,
  topMetricItem,
  topMetricLabel = 'Top Performing Machine',
  statusData,
  drilldownContextParams
}) => {
  const statusColors = { good: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
  const statusLabels = { good: 'Stable', warning: 'Needs Attention', critical: 'Critical Alert' };
  const statusColor = statusColors[entity.status] || 'var(--text-muted)';

  const isSingle = totalEntities === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + (index % 4) * 0.05 }}
      className={`ops-card flex flex-col overflow-hidden ${spanClass}`}
    >
      {/* ── Module Header ── */}
      <div
        className="px-5 py-3 border-b border-[var(--border-light)] flex justify-between items-center ops-investigation-row bg-[var(--bg-inset)] cursor-pointer"
        onClick={() => drillDown(entityName, drilldownContextParams)}
      >
        <div className="flex items-center gap-3.5">
          <h3 className="text-[20px] font-bold text-[var(--text-primary)] leading-tight">{entityName}</h3>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-light)]">
            {entityLocation}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
            <div className="status-dot flex-shrink-0" style={{ width: 6, height: 6, background: statusColor }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {statusLabels[entity.status]}
            </span>
          </div>
          <ChevronRight size={16} className="text-[var(--text-muted)]" />
        </div>
      </div>

      {/* ── Executive Summary (Fixed View) ── */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-center md:justify-between gap-6 md:gap-4 2xl:gap-8 bg-[var(--bg-card)]">

        {/* KPIs */}
        <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-2 gap-y-4 gap-x-2 md:flex md:flex-row md:items-center md:gap-4 2xl:gap-8 min-w-0 flex-[1.5] w-full md:w-auto">
          <div
            className="col-start-2 row-start-1 row-span-2 md:col-auto md:row-auto flex-shrink-0 flex flex-col items-center justify-center ops-hover-surface p-1 rounded cursor-pointer -m-1"
            onClick={() => drillDown(entityName, drilldownContextParams)}
          >
            <OEEGauge size={85} oee={entity.oee} showLabels={false} />
            <span className="text-[10px] tracking-widest uppercase font-bold mt-2 text-[var(--text-muted)]">OEE</span>
          </div>
          <div className="contents md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-8 md:px-0">
            <div className="col-start-1 row-start-1 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(entityName, { ...drilldownContextParams, context: 'availability' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Avail</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--blue)]">{entity.avail.toFixed(1)}%</div>
            </div>
            <div className="col-start-3 row-start-1 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(entityName, { ...drilldownContextParams, context: 'performance' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Perf</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--purple)]">{entity.perf.toFixed(1)}%</div>
            </div>
            <div className="col-start-1 row-start-2 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(entityName, { ...drilldownContextParams, context: 'quality' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Qual</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--green)]">{entity.qual.toFixed(1)}%</div>
            </div>
            <div className="col-start-3 row-start-2 md:col-auto md:row-auto flex flex-col items-center md:items-start justify-center ops-hover-surface p-2 rounded cursor-pointer -m-2" onClick={() => drillDown(entityName, { ...drilldownContextParams, context: 'downtime' })}>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Down</div>
              <div className="text-[16px] md:text-[16px] font-bold text-[var(--red)]">{entity.downtime}h</div>
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
              {topMetricItem && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-[var(--green)]" />
                    {topMetricLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-[var(--text-primary)]">{topMetricItem.name}</span>
                    <span className="text-[12px] font-semibold text-[var(--text-secondary)]">{topMetricItem.oee}% OEE</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="hidden lg:block w-px h-16 bg-[var(--border-light)]" />

        {/* Status Donut & More Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-2 2xl:gap-6 flex-1 md:justify-end min-w-0 w-full md:w-auto mt-2 md:mt-0">
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
            {statusData && (
              <MachineStatusDonut
                data={statusData}
                size={75}
                compact={true}
                onClick={() => drillDown(entityName, { ...drilldownContextParams, context: 'machine_status' })}
              />
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onInvestigate(index); }}
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 md:py-2 rounded bg-[var(--blue)] text-white cursor-pointer hover:bg-blue-600 transition-colors shadow border-none md:h-[36px] w-full md:w-auto mt-2 md:mt-0"
          >
            <span className="text-[12px] md:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">More Info</span>
            <ChevronRight size={14} className="flex-shrink-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EntityModule;
