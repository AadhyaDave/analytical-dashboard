import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Target, Info } from 'lucide-react';

/**
 * OEEWaterfall — Premium OEE Loss Cascade Visualization (v4.0)
 *
 * Displays the full OEE decomposition as a stepped bar cascade:
 *   Availability (A%) → Performance (P%) → Quality (Q%) → OEE
 */

const SUB_COLORS = {
  Breakdown:        '#ef4444',
  Maintenance:      '#f97316',
  Idle:             '#f59e0b',
  'No Plan':        '#818cf8',
  'Slow Cycle':     '#f97316',
  'Minor Stops':    '#f59e0b',
  'Reduced Speed':  '#a855f7',
  Rejects:          '#ef4444',
  Rework:           '#f97316',
  'Quality Variation': '#f59e0b',
};

const ROW_CONFIG = [
  {
    key: 'availability',
    label: 'Availability',
    sublabel: 'Planned → Runtime',
    fillColor: '#38bdf8',
    lossColor: '#ef4444',
    lossLabel: 'Avail Loss',
    lossSubKey: 'availLossData',
    icon: '⏱️',
  },
  {
    key: 'performance',
    label: 'Performance',
    sublabel: 'Runtime → Net Operating',
    fillColor: '#a855f7',
    lossColor: '#f97316',
    lossLabel: 'Perf Loss',
    lossSubKey: 'perfLossData',
    icon: '⚡',
  },
  {
    key: 'quality',
    label: 'Quality',
    sublabel: 'Net Operating → OEE',
    fillColor: '#10b981',
    lossColor: '#f59e0b',
    lossLabel: 'Qual Loss',
    lossSubKey: 'qualLossData',
    icon: '🔍',
  },
];

const OEEWaterfall = ({
  oee = 84.2,
  availability = 91.2,
  performance = 90.8,
  quality = 97.8,
  availLossData = [],
  perfLossData = [],
  qualLossData = [],
  target = 87,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const values = { availability, performance, quality };
  const lossValues = {
    availability: parseFloat((100 - availability).toFixed(1)),
    performance:  parseFloat((100 - performance).toFixed(1)),
    quality:      parseFloat((100 - quality).toFixed(1)),
  };
  const lossDataMap = {
    availLossData,
    perfLossData,
    qualLossData,
  };

  const oeeColor = oee >= 87 ? '#10b981' : oee >= 80 ? '#38bdf8' : oee >= 70 ? '#f59e0b' : '#ef4444';
  const oeeGapSign = oee >= target ? '+' : '-';
  const oeeGap = Math.abs(oee - target).toFixed(1);

  return (
    <div className="space-y-1">
      {/* Formula header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-3 p-2 px-4 rounded-xl shadow-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          {[
            { label: 'Availability', value: availability, color: '#38bdf8' },
            { label: 'Performance',  value: performance,  color: '#a855f7' },
            { label: 'Quality',      value: quality,      color: '#10b981' },
          ].map((m, i) => (
            <React.Fragment key={i}>
              <div className="text-center">
                <p className="text-base font-black" style={{ color: m.color }}>{m.value}<span className="text-xs opacity-70">%</span></p>
                <p style={{ color: 'var(--text-muted)', fontSize: 9, fontWeight: 700, letterSpacing: '0.05em' }}>{m.label.toUpperCase()}</p>
              </div>
              {i < 2 && <span className="text-lg font-black text-white/20">×</span>}
            </React.Fragment>
          ))}
          <span className="text-lg font-black" style={{ color: 'var(--text-dim)' }}>=</span>
          <div className="text-center ml-1 px-3 py-1 rounded-lg" style={{ background: 'var(--bg-inset)', border: '1px solid var(--border)' }}>
            <p className="text-xl font-black gradient-text">{oee}<span className="text-sm opacity-70">%</span></p>
            <p style={{ color: 'var(--text-muted)', fontSize: 9, fontWeight: 700, letterSpacing: '0.05em' }}>OEE</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <Target size={14} style={{ color: 'var(--text-muted)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Target {target}%</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full shadow-inner"
            style={{ background: oee >= target ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: oee >= target ? '#10b981' : '#ef4444' }}>
            {oeeGapSign}{oeeGap}%
          </span>
        </div>
      </div>

      {/* Planned Time baseline */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-bold flex-shrink-0 text-right uppercase tracking-wider" style={{ color: 'var(--text-secondary)', width: 95 }}>Planned Time</span>
        <div className="flex-1 h-5 rounded-md flex items-center px-3" style={{ background: 'var(--bg-inset)', border: '1px solid var(--border-light)' }}>
          <span className="text-xs font-black" style={{ color: 'var(--text-muted)' }}>100%</span>
        </div>
        <span className="text-xs text-right font-medium" style={{ color: 'var(--text-secondary)', width: 105 }}>Baseline</span>
      </div>

      {/* Cascade rows */}
      {ROW_CONFIG.map((row, rowIdx) => {
        const val = values[row.key];
        const loss = lossValues[row.key];
        const subData = lossDataMap[row.lossSubKey] || [];
        const totalSubPct = subData.reduce((s, d) => s + d.value, 0);
        const isOverTarget = loss <= (rowIdx === 0 ? 7 : rowIdx === 1 ? 6 : 1.5);
        const isHovered = hoveredRow === row.key;

        return (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rowIdx * 0.12, duration: 0.5 }}
            className="space-y-1 relative"
            onMouseEnter={() => setHoveredRow(row.key)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Arrow connector */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0" style={{ width: 95 }} />
              <ArrowDown size={12} style={{ color: 'rgba(255,255,255,0.1)', marginLeft: 4 }} />
            </div>

            {/* Main bar row */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 text-right" style={{ width: 95 }}>
                <p className="text-xs font-black tracking-wide" style={{ color: row.fillColor }}>{row.icon} {row.label}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 9, fontWeight: 500 }}>{row.sublabel}</p>
              </div>

              {/* Progress bar */}
              <div className="flex-1 relative h-8 rounded-lg overflow-visible group cursor-pointer" style={{ background: 'var(--bg-inset)', border: '1px solid var(--border)' }}>
                {/* Good portion */}
                <motion.div
                  className="absolute left-0 top-0 h-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ duration: 1.2, delay: rowIdx * 0.15, ease: 'easeOut' }}
                  style={{
                    background: `linear-gradient(90deg, ${row.fillColor}40, ${row.fillColor})`,
                    borderRight: `2px solid rgba(255,255,255,0.5)`,
                    borderRadius: loss > 0 ? '8px 0 0 8px' : '8px',
                  }}
                />
                
                {/* Loss portion (striped) */}
                {loss > 0 && (
                  <motion.div
                    className="absolute top-0 h-full group-hover:opacity-100 opacity-80 transition-opacity"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: `${loss}%`, opacity: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.8, delay: rowIdx * 0.15 + 0.5 }}
                    style={{
                      left: `${val}%`,
                      background: `repeating-linear-gradient(135deg, ${row.lossColor}50, ${row.lossColor}50 4px, ${row.lossColor}20 4px, ${row.lossColor}20 8px)`,
                      borderRadius: '0 8px 8px 0',
                    }}
                  />
                )}
                
                {/* Value label */}
                <div className="absolute inset-0 flex items-center px-3 pointer-events-none z-10">
                  <span className="text-xs font-black drop-shadow-md" style={{ color: '#fff' }}>{val}%</span>
                </div>
              </div>

              {/* Loss badge */}
              <div className="flex-shrink-0 text-right" style={{ width: 105 }}>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${isHovered ? 'border' : 'border border-transparent'}`} style={{ borderColor: isHovered ? 'var(--border)' : 'transparent', background: isHovered ? 'var(--bg-surface)' : 'transparent' }}>
                  <span className="text-xs font-black drop-shadow-sm" style={{ color: isOverTarget ? '#10b981' : row.lossColor }}>
                    -{loss}%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Loss
                  </span>
                  {isOverTarget && <span className="text-xs ml-0.5" style={{ color: '#10b981' }}>✓</span>}
                </div>
              </div>
            </div>

            {/* Sub-loss micro bars and interactive breakdown */}
            <AnimatePresence>
              {subData.length > 0 && loss > 0 && (
                <motion.div 
                  initial={{ height: 18, opacity: 0.8 }}
                  animate={{ height: isHovered ? 'auto' : 18, opacity: isHovered ? 1 : 0.8 }}
                  className="flex items-start gap-3 overflow-hidden"
                >
                  <div className="flex-shrink-0" style={{ width: 95 }} />
                  <div className="flex-1">
                    <div className="flex gap-px items-center mt-1" style={{ height: 6 }}>
                      {subData.map((sub, j) => {
                        const subWidth = totalSubPct > 0 ? (sub.value / totalSubPct) * loss : 0;
                        const subColor = SUB_COLORS[sub.name] || row.lossColor;
                        return (
                          <div
                            key={j}
                            className="transition-all duration-300 hover:brightness-125"
                            style={{
                              flex: `0 0 ${subWidth}%`,
                              background: subColor,
                              height: '100%',
                              borderRadius: j === 0 ? '3px 0 0 3px' : j === subData.length - 1 ? '0 3px 3px 0' : '0',
                              minWidth: 4,
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Expanded details on hover */}
                    {isHovered ? (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="flex items-center gap-3 mt-2 flex-wrap p-2 rounded-lg shadow-inner"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                      >
                        <Info size={12} style={{ color: 'var(--text-dim)' }} />
                        {subData.map((sub, j) => (
                          <div key={j} className="flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: 'var(--bg-inset)', border: '1px solid var(--border)' }}>
                            <span className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ background: SUB_COLORS[sub.name] || row.lossColor }} />
                            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{sub.name}</span>
                            <span className="text-xs font-black" style={{ color: SUB_COLORS[sub.name] || row.lossColor }}>{sub.value}%</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap px-1">
                        {subData.map((sub, j) => (
                          <span key={j} className="flex items-center gap-1 opacity-70">
                            <span className="w-1 h-1 rounded-full" style={{ background: SUB_COLORS[sub.name] || row.lossColor }} />
                            <span style={{ color: 'var(--text-muted)', fontSize: 9, fontWeight: 600 }}>{sub.name}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ width: 105 }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* OEE Result bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-1 mt-3 pt-2"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0" style={{ width: 95 }} />
          <ArrowDown size={14} style={{ color: oeeColor, opacity: 0.5, marginLeft: 3 }} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 text-right" style={{ width: 95 }}>
            <p className="text-sm font-black gradient-text">FINAL OEE</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 9, fontWeight: 600, textTransform: 'uppercase' }}>Fully Productive</p>
          </div>
          <div className="flex-1 relative h-10 rounded-xl overflow-hidden shadow-2xl" style={{ background: 'var(--bg-inset)', border: `1px solid ${oeeColor}50` }}>
            <motion.div
              className="absolute left-0 top-0 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${oee}%` }}
              transition={{ duration: 1.5, delay: 0.55, ease: 'easeOut' }}
              style={{ 
                background: `linear-gradient(90deg, ${oeeColor}40, ${oeeColor})`, 
                boxShadow: `0 0 30px ${oeeColor}50`,
                borderRight: `2px solid #fff`,
              }}
            />
            {/* Target marker */}
            <div
              className="absolute top-0 bottom-0 w-px z-10 flex flex-col justify-between items-center"
              style={{ left: `${target}%`, background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            >
              <div className="w-2 h-1 bg-white/80 rounded-b-sm" />
              <div className="w-2 h-1 bg-white/80 rounded-t-sm" />
            </div>
            
            <div className="absolute inset-0 flex items-center px-4 z-20 pointer-events-none">
              <span className="text-base font-black tracking-wide" style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{oee}%</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-right" style={{ width: 105 }}>
            <div className="inline-flex flex-col items-end">
              <span className="text-sm font-black" style={{ color: oeeColor, textShadow: `0 0 10px ${oeeColor}40` }}>RESULT</span>
              <span className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>Efficiency</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OEEWaterfall;
