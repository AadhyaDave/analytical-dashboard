import React from 'react';
import { motion } from 'framer-motion';

/**
 * OEEGauge — Classic segmented needle gauge
 */
const OEEGauge = ({
  oee = 84.2,
  size = 200,
  // The following props are kept for compatibility but not rendered visually in this style
  availability,
  performance,
  quality,
  showLabels,
}) => {
  const cx = size / 2;
  const cy = size * 0.55; 
  const outerR = size * 0.42;
  const innerR = size * 0.32;

  // Helper: polar to cartesian
  const polar = (angleDeg, r) => ({
    x: cx + r * Math.cos((angleDeg * Math.PI) / 180),
    y: cy + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  // SVG Arc generator
  const arcPath = (startDeg, endDeg, r1, r2) => {
    const large = endDeg - startDeg > 180 ? 1 : 0;
    const s1 = polar(startDeg, r1);
    const e1 = polar(endDeg, r1);
    const s2 = polar(endDeg, r2);
    const e2 = polar(startDeg, r2);
    return `M ${s1.x} ${s1.y} A ${r1} ${r1} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${r2} ${r2} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
  };

  const pctToAngle = (pct) => -180 + (pct / 100) * 180;

  // 5 distinct colored segments with small gaps, softer industrial palette
  const segments = [
    { start: -180, end: -146, color: 'var(--red)' },
    { start: -144, end: -110, color: 'var(--orange)' },
    { start: -108, end: -74,  color: 'var(--amber)' },
    { start: -72,  end: -38,  color: '#65a30d' },
    { start: -36,  end: 0,    color: 'var(--green)' },
  ];

  // Map needle rotation
  const needleAngle = pctToAngle(oee) + 90; // +90 because our polygon points UP natively
  const baseR = size * 0.05;
  const length = size * 0.31;

  return (
    <div className="flex flex-col items-center relative">
      <svg width={size} height={size * 0.85} overflow="visible" style={{ display: 'block' }}>
        {/* Draw Segments */}
        {segments.map((seg, i) => (
          <path key={i} d={arcPath(seg.start, seg.end, outerR, innerR)} fill={seg.color} />
        ))}

        {/* Draw Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", bounce: 0.2 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          {/* Needle pointer */}
          <polygon
            points={`${cx - baseR * 0.6},${cy} ${cx},${cy - length} ${cx + baseR * 0.6},${cy}`}
            fill="var(--text-dim)" // semantic variable
          />
          {/* Base circle */}
          <circle cx={cx} cy={cy} r={baseR} fill="var(--text-dim)" />
          {/* Inner cutout hole */}
          <circle cx={cx} cy={cy} r={baseR * 0.4} fill="var(--bg-card)" />
        </motion.g>

        {/* OEE Value text */}
        <text
          x={cx} y={cy + size * 0.22}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--text-primary)"
          fontSize={size * 0.16}
          fontWeight={600}
          fontFamily="Inter, sans-serif"
        >
          {oee}
        </text>
      </svg>
    </div>
  );
};

export default OEEGauge;
