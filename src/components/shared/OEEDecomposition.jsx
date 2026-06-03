import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Activity, Settings, ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * OEEDecomposition — Interactive OEE Decomposition Tree (v4.0)
 * 
 * A hierarchical visual tree showing how OEE breaks down into Availability, Performance, and Quality,
 * and further into specific loss categories, with interactive drill-down.
 */

const LOSS_CATEGORIES = {
  availability: {
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
    label: 'Availability Loss',
    icon: <Settings size={14} />,
    subItems: [
      { name: 'Breakdown',   color: '#ef4444' },
      { name: 'Maintenance', color: '#f97316' },
      { name: 'Idle',        color: '#f59e0b' },
      { name: 'No Plan',     color: '#818cf8' },
    ],
  },
  performance: {
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
    label: 'Performance Loss',
    icon: <Activity size={14} />,
    subItems: [
      { name: 'Slow Cycle',    color: '#f97316' },
      { name: 'Minor Stops',   color: '#f59e0b' },
      { name: 'Reduced Speed', color: '#a855f7' },
    ],
  },
  quality: {
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    label: 'Quality Loss',
    icon: <ShieldCheck size={14} />,
    subItems: [
      { name: 'Rejects',          color: '#ef4444' },
      { name: 'Rework',           color: '#f97316' },
      { name: 'Quality Variation',color: '#f59e0b' },
    ],
  },
};

const TreeNode = ({ label, value, type, color, icon, isExpanded, onToggle, isLoss = false, children }) => (
  <div className="relative">
    <motion.div 
      className={`ops-card p-3 flex items-center justify-between cursor-pointer hover-lift relative z-10 ${isExpanded ? 'border-b-0 rounded-b-none' : ''}`}
      onClick={onToggle}
      style={{
        border: `1px solid ${color}40`,
        background: `linear-gradient(135deg, ${color}10 0%, var(--bg-card) 100%)`,
        boxShadow: isExpanded ? `0 4px 20px ${color}20` : 'none',
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-inner" style={{ background: `${color}20`, color: color }}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-black" style={{ color }}>{value}</span>
            <span className="text-xs font-semibold" style={{ color: `${color}80` }}>%</span>
            {isLoss && <span className="text-[9px] uppercase font-bold ml-1 px-1.5 py-0.5 rounded-sm" style={{ background: `${color}20`, color: color }}>Loss</span>}
          </div>
        </div>
      </div>
      
      {children && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center transition-colors" style={{ background: 'var(--bg-inset)', color: 'var(--text-muted)' }}>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      )}
    </motion.div>
    
    <AnimatePresence>
      {isExpanded && children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div 
            className="p-3 pt-4 border-t-0 rounded-b-xl space-y-2 relative z-0" 
            style={{ 
              background: 'var(--bg-surface)', 
              border: `1px solid ${color}40`,
              boxShadow: 'inset 0 2px 10px var(--shadow-sm)',
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const OEEDecomposition = ({
  oee = 84.2,
  availabilityData = [],
  performanceData  = [],
  qualityData      = [],
  compact = false,
}) => {
  const [expandedNodes, setExpandedNodes] = useState({
    availability: false,
    performance: false,
    quality: false,
  });

  const toggleNode = (node) => {
    setExpandedNodes(prev => ({ ...prev, [node]: !prev[node] }));
  };

  const dataMap = {
    availability: availabilityData,
    performance:  performanceData,
    quality:      qualityData,
  };

  return (
    <div className="relative">
      {/* Root Node: OEE */}
      <div className="flex justify-center mb-6">
        <div className="ops-card px-6 py-4 flex flex-col items-center justify-center relative z-20 min-w-[200px]" style={{ border: '1px solid rgba(56,189,248,0.4)', boxShadow: '0 0 40px rgba(56,189,248,0.2)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Overall Equipment Effectiveness</p>
          <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-md">
            {oee}<span className="text-xl opacity-80">%</span>
          </p>
          <div className="absolute -bottom-6 left-1/2 w-px h-6 transform -translate-x-1/2" style={{ background: 'var(--border)' }} />
        </div>
      </div>
      
      {/* Branch lines */}
      <div className="relative h-6 mb-2 hidden md:block">
        <div className="absolute top-0 left-1/6 right-1/6 h-px" style={{ background: 'var(--border)' }} />
        <div className="absolute top-0 left-1/6 w-px h-full" style={{ background: 'var(--border)' }} />
        <div className="absolute top-0 left-1/2 w-px h-full transform -translate-x-1/2" style={{ background: 'var(--border)' }} />
        <div className="absolute top-0 right-1/6 w-px h-full" style={{ background: 'var(--border)' }} />
      </div>

      <div className={`grid ${compact ? 'grid-cols-3' : 'grid-cols-1 md:grid-cols-3'} gap-6 relative z-10`}>
        {Object.entries(LOSS_CATEGORIES).map(([key, cfg], catIdx) => {
          const items = dataMap[key] || [];
          const totalLoss = items.reduce((s, d) => s + d.value, 0);
          
          return (
            <TreeNode
              key={key}
              label={cfg.label}
              value={totalLoss}
              color={cfg.color}
              icon={cfg.icon}
              isLoss={true}
              isExpanded={expandedNodes[key]}
              onToggle={() => toggleNode(key)}
            >
              {items.length > 0 ? (
                items.map((item, i) => {
                  const subCfg = cfg.subItems.find(s => s.name === item.name) || {};
                  const itemColor = subCfg.color || cfg.color;
                  const pct = totalLoss > 0 ? (item.value / totalLoss) * 100 : 0;
                  
                  return (
                    <div key={i} className="flex flex-col gap-1.5 mb-3 last:mb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={10} style={{ color: itemColor }} />
                          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                        </div>
                        <span className="text-xs font-black" style={{ color: itemColor }}>{item.value}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden shadow-inner" style={{ background: 'var(--bg-inset)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.1 + (i * 0.1) }}
                          className="h-full rounded-full"
                          style={{ background: itemColor, boxShadow: `0 0 8px ${itemColor}` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4">
                  <span className="text-xs italic" style={{ color: 'var(--text-dim)' }}>No losses recorded</span>
                </div>
              )}
            </TreeNode>
          );
        })}
      </div>
    </div>
  );
};

export default OEEDecomposition;
