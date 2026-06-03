import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import OEEGauge from '../../components/shared/OEEGauge';

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

const MachineStatusDonut = ({ data, size = 85 }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <div className="flex items-center gap-4 w-full">
      <div style={{ width: size, height: size, position: 'relative' }} className="flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius="65%" outerRadius="100%" paddingAngle={2} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[18px] font-bold leading-none text-white">{total}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-[11px] font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
              <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
            </div>
            <span style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MDSinglePlantDashboard = () => {
  const trendData = [
    { label: '06:00', oee: 79.5, availability: 90.1, performance: 89.2, quality: 97.4 },
    { label: '10:00', oee: 80.2, availability: 91.5, performance: 90.4, quality: 97.6 },
    { label: '14:00', oee: 81.0, availability: 91.2, performance: 90.8, quality: 97.8 },
  ];

  const shiftData = [
    { name: 'Shift A', val: 92, color: 'var(--green)', trend: '+1.2%', dir: 'up' },
    { name: 'Shift B', val: 87, color: 'var(--blue)', trend: 'Stable', dir: 'flat' },
    { name: 'Shift C', val: 78, color: 'var(--red)', trend: '-0.6%', dir: 'down' },
  ];

  const alerts = [
    { type: 'critical', msg: 'Bearing failure — spindle overheating', time: '15:42' },
    { type: 'watch', msg: 'Operator on extended break — idle >20m', time: '15:10' },
    { type: 'resolved', msg: 'Resumed after coolant top-up', time: '14:30' },
    { type: 'resolved', msg: 'PM completed — operational', time: '14:00' },
  ];

  const improvements = [
    { name: 'Mechanical Breakdown', oee: '+11% OEE', lost: '42h lost', line: 'Line 4', color: 'var(--orange)' },
    { name: 'Setup & Changeover', oee: '+8% OEE', lost: '28h lost', line: 'Line 2', color: 'var(--amber)' },
    { name: 'Minor Stops', oee: '+5% OEE', lost: '18h lost', line: 'Line 1', color: 'var(--blue)' },
    { name: 'Slow Running', oee: '+4% OEE', lost: '16h lost', line: 'Line 3', color: 'var(--purple)' },
  ];

  const leaderboard = [
    { name: 'CNC Lathe 01', val: 92.1, color: 'var(--blue)', trend: '+0.4%', dir: 'up' },
    { name: 'CNC Machining Centre 01', val: 91.2, color: 'var(--blue)', trend: '+1.1%', dir: 'up' },
    { name: 'Packaging Line A', val: 90.3, color: 'var(--blue)', trend: 'Stable', dir: 'flat' },
    { name: 'CNC Machining Centre 02', val: 88.4, color: 'var(--blue)', trend: '-0.2%', dir: 'down' },
    { name: 'Vertical Milling Centre 01', val: 84.6, color: 'var(--amber)', trend: '-1.5%', dir: 'down' },
  ];

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-100px)] overflow-hidden pb-2 text-white">
      
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between flex-shrink-0 px-1">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight mb-1">Pune Manufacturing Facility</h1>
          <div className="flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase">
            <span className="flex items-center gap-1.5 text-[var(--green)]">
              <span className="w-2 h-2 rounded-full bg-[var(--green)]"></span> ONLINE & STABLE
            </span>
            <span className="text-[var(--text-muted)]">| 03 Jun 2026 - 13:56</span>
          </div>
        </div>
        <div className="px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase"
          style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          SINGLE PLANT CONCEPT
        </div>
      </div>

      {/* ── ROW 1: CORE METRICS ── */}
      <div className="flex gap-4 h-[110px] flex-shrink-0">
        
        {/* Plant OEE */}
        <div className="ops-card px-4 py-2 flex flex-col justify-center items-center min-w-[140px] bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl relative overflow-hidden">
          <OEEGauge size={85} oee={81} showLabels={false} />
          <span className="text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] text-center absolute bottom-3">Plant OEE</span>
        </div>

        {/* APQ & Downtime */}
        {[
          { label: 'Availability', value: '91.2', unit: '%', color: 'var(--blue)' },
          { label: 'Performance', value: '90.8', unit: '%', color: 'var(--purple)' },
          { label: 'Quality', value: '97.8', unit: '%', color: 'var(--green)' },
          { label: 'Total Downtime', value: '38.0', unit: 'h', color: 'var(--red)' },
        ].map((m, i) => (
          <div key={i} className="ops-card px-4 py-2 flex flex-col justify-center items-center flex-1 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-1 text-center">{m.label}</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: m.color, leadingTrim: 'both', textEdge: 'cap' }}>
              {m.value}<span className="text-[14px] ml-0.5">{m.unit}</span>
            </span>
          </div>
        ))}

        {/* Production */}
        <div className="ops-card px-5 py-2 flex flex-col justify-center items-center flex-1 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
          <span className="text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-1">Production</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-bold text-white leading-none">1,401</span>
            <span className="text-[13px] font-bold text-[var(--text-muted)]">/ 1.5k</span>
          </div>
          <span className="text-[10px] font-bold text-[var(--green)] mt-1.5 flex items-center gap-1">↗ 93.4% Target</span>
        </div>

        {/* Machine Status */}
        <div className="ops-card px-5 py-2 flex items-center justify-between min-w-[240px] bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
          <div className="flex flex-col w-full h-full justify-center">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-1">Plant Machine Status</span>
            <MachineStatusDonut data={[
              { name: 'Running', value: 38, color: 'var(--green)' },
              { name: 'Idle', value: 6, color: 'var(--amber)' },
              { name: 'No Plan', value: 2, color: 'var(--text-muted)' },
              { name: 'Breakdown', value: 2, color: 'var(--red)' },
            ]} size={75} />
          </div>
        </div>
      </div>

      {/* ── ROW 2: OEE TREND & SHIFT ── */}
      <div className="flex gap-4 flex-[1.6] min-h-0">
        
        {/* Trend */}
        <div className="ops-card p-4 flex flex-col flex-[6] min-w-0 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">OEE Trend Intelligence (Shift)</h3>
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-white">
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white"/> OEE</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--blue)]"/> Avail</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--purple)]"/> Perf</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--green)]"/> Qual</div>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="oeeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="white" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="white" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} dy={10} />
                <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)', fontWeight: 600 }} dx={-10} />
                <Tooltip content={<CT />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                
                <Area type="monotone" dataKey="quality" stroke="var(--green)" strokeWidth={2} fill="none" isAnimationActive={false} />
                <Area type="monotone" dataKey="availability" stroke="var(--blue)" strokeWidth={2} fill="none" isAnimationActive={false} />
                <Area type="monotone" dataKey="performance" stroke="var(--purple)" strokeWidth={2} fill="none" isAnimationActive={false} />
                <Area type="monotone" dataKey="oee" stroke="white" strokeWidth={3} fillOpacity={1} fill="url(#oeeFill)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shift Intelligence */}
        <div className="ops-card p-5 flex flex-col flex-[4] min-w-0 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6">Shift Intelligence</h3>
          
          <div className="flex flex-col h-full justify-center gap-5">
            {shiftData.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[12px] font-semibold text-[var(--text-secondary)] w-12">{s.name}</span>
                <div className="flex-1 h-3 bg-[var(--bg-inset)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: s.color }} />
                </div>
                <div className="flex items-center gap-3 w-[100px] justify-end">
                  <span className="text-[14px] font-bold text-white">{s.val}%</span>
                  <span className={`text-[11px] font-bold w-12 text-right ${s.dir === 'up' ? 'text-[var(--green)]' : s.dir === 'down' ? 'text-[var(--red)]' : 'text-[var(--text-muted)]'}`}>
                    {s.dir === 'up' ? '▲' : s.dir === 'down' ? '▼' : '►'} {s.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: LISTS ── */}
      <div className="flex gap-4 flex-1 min-h-[220px] max-h-[260px]">
        
        {/* Active Alerts */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl relative">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">Active Alerts</h3>
             <span className="text-[11px] font-bold text-[var(--red)]">4</span>
          </div>
          <div className="flex flex-col gap-0 h-full relative pl-2 pt-1">
            {/* Timeline line */}
            <div className="absolute left-[13px] top-4 bottom-4 w-px bg-[var(--border-light)] z-0" />
            
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3 relative z-10 py-1.5">
                <div className="mt-0.5 bg-[var(--bg-card)] p-0.5">
                  {a.type === 'critical' && <AlertCircle size={14} className="text-[var(--red)]" />}
                  {a.type === 'watch' && <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[var(--text-muted)] flex items-center justify-center"><div className="w-1 h-1 bg-[var(--text-muted)] rounded-full" /></div>}
                  {a.type === 'resolved' && <CheckCircle2 size={14} className="text-[var(--green)]" />}
                </div>
                <div className="flex flex-1 justify-between items-start mt-[1px]">
                  <span className={`text-[12px] ${a.type === 'resolved' ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'} pr-2 leading-tight`}>{a.msg}</span>
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] mt-[1px]">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Targets */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">Improvement Targets</h3>
             <span className="text-[11px] font-bold text-[var(--blue)]"><Zap size={14} className="inline mr-1 mb-0.5"/>4</span>
          </div>
          <div className="flex flex-col gap-2.5 h-full">
            {improvements.map((imp, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-white">{imp.name}</span>
                  <span className="text-[11px] font-bold text-[var(--blue)]">{imp.oee}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[var(--text-muted)] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{background: imp.color}}></span> {imp.line}</span>
                  <span className="text-[var(--red)] font-bold">{imp.lost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Leaderboard */}
        <div className="ops-card p-4 flex flex-col flex-1 min-w-0 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">Machine Leaderboard</h3>
             <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase cursor-pointer hover:text-white flex items-center">View All <ChevronRight size={12}/></span>
          </div>
          <div className="flex flex-col justify-between h-full pb-1">
            {leaderboard.map((mac, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--blue)] w-4">#{i+1}</span>
                  <span className="text-[12px] font-bold text-white">{mac.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-white">{mac.val.toFixed(1)}%</span>
                  <span className={`text-[11px] font-bold w-12 text-right ${mac.dir === 'up' ? 'text-[var(--green)]' : mac.dir === 'down' ? 'text-[var(--red)]' : 'text-[var(--text-muted)]'}`}>
                    {mac.dir === 'up' ? '▲' : mac.dir === 'down' ? '▼' : '►'} {mac.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MDSinglePlantDashboard;
