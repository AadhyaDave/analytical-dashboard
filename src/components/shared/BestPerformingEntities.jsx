import React from 'react';

const rankStyles = [
  { label: '01', color: '#F59E0B' }, // Gold
  { label: '02', color: '#9CA3AF' }, // Silver
  { label: '03', color: '#B45309' }, // Bronze
];

const BestPerformingEntities = ({ entities, drillDown, getEntityName, getContextData }) => {
  const ranked = [...entities]
    .sort((a, b) => b.oee - a.oee)
    .slice(0, 3);

  return (
    <div className="flex flex-col justify-center h-full w-full gap-2">
      {ranked.map((entity, i) => {
        const name = getEntityName ? getEntityName(entity) : entity.name;
        const rank = rankStyles[i];
        return (
          <div
            key={i}
            className="flex items-center justify-between ops-investigation-row bg-transparent px-2 py-1.5 rounded w-full cursor-pointer"
            onClick={() => drillDown(name, getContextData ? getContextData(entity) : {})}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span style={{ fontSize: 11, fontWeight: 800, color: rank.color, flexShrink: 0 }}>#{i + 1}</span>
              <span className="text-[13px] font-bold text-[var(--text-primary)] truncate">{name}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
              {entity.oee.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BestPerformingEntities;
