import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const KPICard = ({
  label,
  value,
  unit = '',
  trend,
  icon: Icon,
  color = 'blue',
  prefix = '',
  decimals = 0,
  delay = 0,
  subtitle,
  progress,
}) => {
  const colorMap = {
    blue: { bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)', text: '#38bdf8', glow: 'rgba(56,189,248,0.15)' },
    cyan: { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)', text: '#22d3ee', glow: 'rgba(34,211,238,0.15)' },
    green: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#10b981', glow: 'rgba(16,185,129,0.15)' },
    red: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', text: '#ef4444', glow: 'rgba(239,68,68,0.15)' },
    orange: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', text: '#f97316', glow: 'rgba(249,115,22,0.15)' },
    purple: { bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)', text: '#a855f7', glow: 'rgba(168,85,247,0.15)' },
  };

  const c = colorMap[color] || colorMap.blue;
  const trendPositive = trend > 0;
  const trendNeutral = trend === 0 || trend === undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="ops-card p-5 relative overflow-hidden group cursor-default hover:shadow-md"
      style={{ borderColor: c.border }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 70% 30%, ${c.glow}, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          {Icon && <Icon size={18} style={{ color: c.text }} />}
        </div>

        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg`}
            style={{
              background: trendNeutral ? 'var(--badge-noplan-bg)' : trendPositive ? 'var(--badge-running-bg)' : 'var(--badge-breakdown-bg)',
              color: trendNeutral ? 'var(--badge-noplan-text)' : trendPositive ? 'var(--badge-running-text)' : 'var(--badge-breakdown-text)',
            }}
          >
            {trendNeutral ? <Minus size={10} /> : trendPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-1">
        <span
          className="text-3xl font-bold tracking-tight"
          style={{ color: c.text }}
        >
          <AnimatedCounter value={value} decimals={decimals} prefix={prefix} />
        </span>
        {unit && (
          <span className="text-sm font-medium ml-1" style={{ color: 'var(--text-muted)' }}>
            {unit}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>

      {subtitle && (
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-3 progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
            style={{ background: `linear-gradient(90deg, ${c.text}88, ${c.text})` }}
          />
        </div>
      )}

      {/* Corner accent */}
      <div
        className="absolute bottom-0 left-0 w-16 h-1 rounded-full opacity-60"
        style={{ background: `linear-gradient(90deg, ${c.text}, transparent)` }}
      />
    </motion.div>
  );
};

export default KPICard;
