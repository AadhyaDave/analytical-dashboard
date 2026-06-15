import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, AlertCircle, CheckCircle2, X } from 'lucide-react';
import DrilldownBreadcrumb from '../../components/shared/DrilldownBreadcrumb';
import OEEGauge from '../../components/shared/OEEGauge';
import { useApp } from '../../context/AppContext';
import {
  superAdminKPIs, companyPerformanceTable, groupCompanyStatus, topPerformingCompanies, companyMachineStatus,
  executiveSummaries, performanceDrivers, activeSituations, impactRankings, executiveDecisions,
  superAdminAttentionItems
} from '../../data/mockData';
import EntityModule, { MachineStatusDonut } from '../../components/shared/EntityModule';
import BestPerformingEntities from '../../components/shared/BestPerformingEntities';

const CompanyInvestigationOverlay = ({ companyIdx, onClose, drillDown }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (companyIdx === null) return null;

  const company = companyPerformanceTable[companyIdx];
  const companyName = company.company;
  const companyLocation = company.location || '';
  
  const execSummary = executiveSummaries[companyIdx];
  const drivers = performanceDrivers[companyIdx];
  const situations = activeSituations[companyIdx];
  const plantsRanking = impactRankings[companyIdx];

  const generateStrategicPriorities = (comp) => {
    if (comp.status === 'critical') {
      return [
        { title: 'Performance Recovery Program', level: 'High Priority', impact: 'OEE below target for 7 consecutive days', focus: 'Review maintenance and reliability strategy' },
        { title: 'Supply Chain Intervention', level: 'High Priority', impact: 'Material shortages causing cascading downtime', focus: 'Escalate supplier performance review and secure alternative logistics' },
        { title: 'Leadership Task Force Deployment', level: 'Medium Priority', impact: 'Prolonged operational instability', focus: 'Deploy corporate turnaround team to stabilize operations' }
      ];
    } else if (comp.status === 'warning') {
      return [
        { title: 'Predictive Maintenance Audit', level: 'Medium Priority', impact: 'Downtime increasing week-over-week', focus: 'Audit predictive maintenance compliance and escalate gaps' },
        { title: 'Quality Control Review', level: 'Medium Priority', impact: 'Minor increase in defect rates detected', focus: 'Initiate continuous improvement initiatives on primary assembly lines' },
        { title: 'Resource Reallocation', level: 'Low Priority', impact: 'Suboptimal shift efficiency', focus: 'Monitor shift-by-shift productivity trends for future reallocation' }
      ];
    } else {
      return [
        { title: 'Best Practice Replication', level: 'Opportunity', impact: 'Highest OEE in the group', focus: 'Replicate operating model across other companies' },
        { title: 'Capacity Expansion Readiness', level: 'Opportunity', impact: 'Sustained peak performance unlocking excess capacity', focus: 'Evaluate facility for next-quarter production volume increase' },
        { title: 'Automation Pilot Program', level: 'Opportunity', impact: 'Stable processes prime for automation', focus: 'Review capital expenditure proposal for robotic assembly integration' }
      ];
    }
  };

  const strategicPriorities = generateStrategicPriorities(company);

  const statusColors = { good: 'var(--green)', warning: 'var(--amber)', critical: 'var(--red)' };
  const statusLabels = { good: 'Stable', warning: 'Needs Attention', critical: 'Critical Alert' };
  const statusColor = statusColors[company.status] || 'var(--text-muted)';
  
  const isHealthy = company.status === 'good';

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
        {/* Header Brief */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-[var(--border-light)] bg-[var(--bg-inset)]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)]">{companyName} Intelligence Brief</h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--border-light)] bg-[var(--bg-card)]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {statusLabels[company.status]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[13px] font-bold text-[var(--text-secondary)]">OEE: <span style={{ color: 'var(--text-primary)' }}>{company.oee}%</span></span>
              <span className="text-[13px] font-bold" style={{ color: execSummary.trend.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>
                {execSummary.trend.startsWith('+') ? '↑' : '↓'} {execSummary.trend}% vs Yesterday
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { onClose(); drillDown(companyName, { companyIdx }); }}
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

        <div className="flex-1 overflow-y-auto bg-[var(--bg-app)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={companyIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-8 flex flex-col gap-8"
            >
              {/* Executive Summary Banner */}
              {!isHealthy ? (
                <div className="p-5 rounded-lg border" style={{ borderColor: 'var(--red)', background: 'rgba(239, 68, 68, 0.05)' }}>
                  <h3 className="text-[14px] font-bold text-[var(--red)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <AlertCircle size={18} /> {statusLabels[company.status]}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-[11px] font-bold text-[var(--red)] uppercase opacity-80 mb-1">Root Cause</p>
                      <p className="text-[14px] font-bold text-[var(--text-primary)]">{execSummary.rootCause}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--red)] uppercase opacity-80 mb-1">Business Impact</p>
                      <p className="text-[14px] font-bold text-[var(--text-primary)]">{execSummary.trend}% OEE</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--red)] uppercase opacity-80 mb-1">Worst Performing Plant</p>
                      <p className="text-[14px] font-bold text-[var(--text-primary)]">{execSummary.worstPlant}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[var(--red)] uppercase opacity-80 mb-1">Recommended Action</p>
                      <p className="text-[14px] font-bold text-[var(--text-primary)]">{execSummary.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-lg border border-[var(--border-light)] bg-[var(--bg-card)]">
                  <h3 className="text-[14px] font-bold text-[var(--green)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Company Status: Stable
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-4">{execSummary.statusText}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase mb-2">Performance Trend</p>
                      <p className="text-[18px] font-bold text-[var(--green)]">{execSummary.trend}% vs Yesterday</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase mb-2">Top Contributors</p>
                      <div className="flex gap-4">
                        {drivers.map((d, i) => (
                          <div key={i} className="px-3 py-1.5 rounded bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
                            <span className="text-[12px] font-bold text-[var(--text-primary)]">{i + 1}. {d.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                {/* SECTION 1: WHAT IS DRIVING PERFORMANCE */}
                <div>
                  <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">What Is Driving Performance</h4>
                  <div className="space-y-2">
                    {drivers.map((driver, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded bg-[var(--bg-card)] border border-[var(--border-light)]">
                        <span className="text-[13px] font-bold text-[var(--text-primary)]">{i + 1}. {driver.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[13px] font-bold ${driver.type === 'positive' ? 'text-[var(--green)]' : 'text-[var(--red)]'}`}>
                            {driver.impact} OEE Impact
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 2: ACTIVE SITUATIONS */}
                <div>
                  <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Active Situations</h4>
                  {situations.length > 0 ? (
                    <div className="space-y-2">
                      {situations.map((sit, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded bg-[var(--bg-card)] border border-[var(--border-light)]">
                          <div className="flex items-center gap-3">
                            <div className="mt-0.5">
                              {sit.severity === 'critical' ? <AlertCircle size={16} className="text-[var(--red)]" /> : <AlertCircle size={16} className="text-[var(--amber)]" />}
                            </div>
                            <span className="text-[13px] font-bold text-[var(--text-primary)]">{sit.type}</span>
                          </div>
                          <span className="text-[12px] font-bold text-[var(--text-muted)]">{sit.count} Active</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-[13px] text-[var(--text-muted)] border border-dashed border-[var(--border-light)] rounded">
                      No active situations.
                    </div>
                  )}
                </div>

                {/* SECTION 3: PLANTS RANKED BY IMPACT */}
                <div>
                  <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Plants Ranked By Impact</h4>
                  <div className="space-y-2">
                    {plantsRanking.map((p, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded bg-[var(--bg-card)] border border-[var(--border-light)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors" onClick={() => { onClose(); drillDown(p.plant, { companyIdx, plant: p.plant }); }}>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-[var(--text-primary)]">{i + 1}. {p.plant}</span>
                          <span className="text-[11px] text-[var(--text-muted)] font-medium">OEE {p.oee}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[13px] font-bold ${p.impact.startsWith('+') ? 'text-[var(--green)]' : 'text-[var(--red)]'}`}>
                            Impact {p.impact}
                          </span>
                          <ChevronRight size={14} className="text-[var(--text-muted)]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 4: STRATEGIC PRIORITIES */}
                <div>
                  <h4 className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Strategic Priorities</h4>
                  <div className="space-y-3">
                    {strategicPriorities.map((sp, i) => (
                      <div key={i} className="p-4 rounded bg-[var(--bg-card)] border border-[var(--border-light)] shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[13px] font-bold text-[var(--text-primary)]">{sp.title}</span>
                          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                            sp.level.includes('High') ? 'text-[var(--red)] bg-[rgba(239,68,68,0.1)]' : 
                            sp.level.includes('Opportunity') ? 'text-[var(--green)] bg-[rgba(34,197,94,0.1)]' : 
                            'text-[var(--amber)] bg-[rgba(245,158,11,0.1)]'
                          }`}>
                            {sp.level}
                          </span>
                        </div>
                        <p className="text-[12px] text-[var(--text-secondary)] mb-1">
                          <span className="font-semibold text-[var(--text-primary)]">{companyName}</span>
                        </p>
                        <p className="text-[12px] text-[var(--text-secondary)] mb-2">
                          <span className="text-[var(--text-muted)]">Business Impact:</span> {sp.impact}
                        </p>
                        <div className="pt-2 border-t border-[var(--border-light)] mt-2">
                          <p className="text-[12px] text-[var(--text-secondary)]">
                            <span className="text-[var(--text-muted)]">Leadership Focus:</span> <span className="font-medium text-[var(--text-primary)]">{sp.focus}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  const { drillDown } = useApp();
  const [investigatingCompanyIdx, setInvestigatingCompanyIdx] = useState(null);

  const getColSpanClass = (idx, total) => {
    if (total === 1) return 'xl:col-span-2';
    if (total === 3 && idx === 2) return 'xl:col-span-2';
    return '';
  };

  const handleInvestigate = (idx) => {
    setInvestigatingCompanyIdx(idx);
  };

  return (
    <div className="space-y-5 pb-8">
      <DrilldownBreadcrumb />

      {/* ── Global Super Admin Command Strip ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col xl:flex-row items-stretch gap-4">

          {/* 1. All Companies Cumulative OEE */}
          <div
            className="ops-card p-5 flex flex-col items-center justify-center min-w-[140px] ops-hover-surface cursor-pointer"
            onClick={() => drillDown('Global Group', { context: 'global_oee' })}
          >
            <OEEGauge size={95} oee={superAdminKPIs.groupOEEAvg.value} showLabels={false} />
            <span className="text-[11px] tracking-widest uppercase font-bold mt-4 text-[var(--text-muted)] text-center">Group OEE</span>
          </div>

          {/* 2-5. APQD */}
          <div className="flex flex-1 gap-4 min-w-0">
            {[
              { label: 'Availability', value: superAdminKPIs.availability.value, unit: '%', color: 'var(--blue)' },
              { label: 'Performance', value: superAdminKPIs.performance.value, unit: '%', color: 'var(--purple)' },
              { label: 'Quality', value: superAdminKPIs.quality.value, unit: '%', color: 'var(--green)' },
              { label: 'Total Downtime', value: superAdminKPIs.totalDowntime.value, unit: 'h', color: 'var(--red)' },
            ].map((m, i) => (
              <div
                key={i}
                className="ops-card p-5 flex flex-col justify-center items-center flex-1 ops-hover-surface cursor-pointer min-w-0"
                onClick={() => drillDown('Global', { context: m.label })}
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

          {/* 6. Best Performing Companies */}
          <div className="ops-card p-5 min-w-[200px] flex flex-col justify-center">
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3 text-center">Top Companies</span>
            <div className="flex-1 flex flex-col justify-center">
              <BestPerformingEntities 
                entities={companyPerformanceTable} 
                drillDown={drillDown} 
                getEntityName={(c) => c.company}
                getContextData={(c) => ({ companyIdx: companyPerformanceTable.indexOf(c) })}
              />
            </div>
          </div>

          {/* 7. Company Status */}
          <div
            className="ops-card p-5 min-w-[220px] flex flex-col justify-center ops-hover-surface cursor-pointer"
            onClick={() => drillDown('Global', { context: 'company_status' })}
          >
            <span className="text-[11px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-3 text-center">Company Status</span>
            <div className="flex-1 flex items-center justify-center">
              <MachineStatusDonut data={groupCompanyStatus} size={85} compact={true} />
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── Company Operational Intelligence Modules ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-3 mt-1">
          <h2 className="section-title">Company Intelligence</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
          {companyPerformanceTable.map((company, idx) => {
            const companyAlerts = superAdminAttentionItems.filter(item => item.contextData?.companyIdx === idx);
            const topAlert = companyAlerts[0];
            const topPlant = topPerformingCompanies[idx]?.[0];
            
            return (
              <EntityModule
                key={idx}
                entity={company}
                index={idx}
                drillDown={drillDown}
                onInvestigate={handleInvestigate}
                totalEntities={companyPerformanceTable.length}
                spanClass={getColSpanClass(idx, companyPerformanceTable.length)}
                entityName={company.company}
                entityLocation={company.location}
                topAlert={topAlert}
                topMetricItem={topPlant}
                topMetricLabel="Top Performing Plant"
                statusData={companyMachineStatus[idx]}
                drilldownContextParams={{ companyIdx: idx }}
              />
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {investigatingCompanyIdx !== null && (
          <CompanyInvestigationOverlay
            companyIdx={investigatingCompanyIdx}
            onClose={() => setInvestigatingCompanyIdx(null)}
            drillDown={drillDown}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminDashboard;
