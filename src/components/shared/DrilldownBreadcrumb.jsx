import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DrilldownBreadcrumb = () => {
  const { drilldownPath, drillUp } = useApp();

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {drilldownPath.map((label, idx) => {
        const isLast = idx === drilldownPath.length - 1;
        return (
          <React.Fragment key={idx}>
            <button
              onClick={() => !isLast && drillUp(idx)}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              style={isLast ? { cursor: 'default' } : {}}
            >
              {label}
            </button>
            {!isLast && <ChevronRight size={11} className="breadcrumb-sep" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DrilldownBreadcrumb;
