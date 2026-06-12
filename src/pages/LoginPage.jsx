import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { users } from '../data/mockData';

const ROLE_LABELS = {
  SUPER_ADMIN: 'Global Administrator',
  MD: 'Managing Director',
  PLANT_HEAD: 'Plant Head',
  DEPT_HEAD: 'Department Head',
  SECTION_HEAD: 'Section Head',
  LINE_HEAD: 'Line Head',
};

const LoginPage = () => {
  const { login } = useApp();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('r.mehta@opusone.in');
  const [password, setPassword] = useState('OpusOne@2026');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const found = users.find(u => u.email === email);
    if (found && password === 'OpusOne@2026') {
      login(found);
    } else {
      setError('Invalid credentials. Use any listed email with password: OpusOne@2026');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-app)' }}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative"
        style={{ background: 'var(--bg-sidebar)' }}>

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2">
          <img 
            src={isDark ? '/logo-dark.png' : '/logo-light.png'} 
            alt="Opus One"
            className="h-10 w-auto max-w-none"
            style={{ 
              objectFit: 'contain', 
              objectPosition: 'left center'
            }} 
          />
          <p style={{ fontSize: 11, color: 'var(--sidebar-text)', fontWeight: 600, letterSpacing: '0.02em', marginTop: 4 }}>Operational Intelligence Platform</p>
        </motion.div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} className="space-y-5">
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, color: 'var(--sidebar-text-hi)' }}>
            Operational<br />
            <span style={{ color: 'var(--blue)' }}>Drill-Down</span><br />
            Intelligence
          </h1>
          <p style={{ fontSize: 14, color: 'var(--sidebar-text)', maxWidth: 380, lineHeight: 1.7 }}>
            Navigate from company-level OEE to individual machine root-cause analysis.
            Progressive drill-down across every operational layer.
          </p>

          {/* Hierarchy flow */}
          <div className="flex items-center gap-2 flex-wrap" style={{ marginTop: 24 }}>
            {['Company', 'Plant', 'Department', 'Section', 'Line', 'Machine'].map((level, i) => (
              <React.Fragment key={level}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: i === 0 ? 'var(--blue)' : '#64748b',
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: i === 0 ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.04)',
                }}>
                  {level}
                </span>
                {i < 5 && <span style={{ color: 'var(--sidebar-text)', fontSize: 10 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <p style={{ fontSize: 11, color: 'var(--sidebar-text)' }}>
            Opus One Industries · Manufacturing Intelligence · v4.0
          </p>
        </motion.div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: 400 }}>
          
          <div className="mb-12 flex justify-start lg:hidden">
            <img 
              src={isDark ? '/logo-dark.png' : '/logo-light.png'} 
              alt="Opus One"
              className="h-12 w-auto max-w-none"
              style={{ 
                objectFit: 'contain', 
                objectPosition: 'left center'
              }} 
            />
          </div>
          <div className="mb-12 hidden lg:flex justify-start">
            <img 
              src={isDark ? '/logo-dark.png' : '/logo-light.png'} 
              alt="Opus One"
              className="h-16 w-auto max-w-none"
              style={{ 
                objectFit: 'contain', 
                objectPosition: 'left center'
              }} 
            />
          </div>

          <div className="mb-8">
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Sign in</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              Access your operational intelligence dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 40,
                    paddingRight: 12,
                    height: 48,
                    boxSizing: 'border-box',
                  }}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  id="login-password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 40,
                    paddingRight: 40,
                    height: 48,
                    boxSizing: 'border-box',
                  }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: 12, color: 'var(--red)', padding: '8px 12px', background: 'rgba(220, 38, 38, 0.1)', borderRadius: 8 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all"
              style={{
                background: loading ? '#93c5fd' : 'var(--blue)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          {/* Quick login */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Quick Access
              </p>
            </div>
            <div className="space-y-2">
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => { setEmail(u.email); login(u); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--blue)', color: 'white' }}>
                      {u.avatar}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</p>
                      <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{ROLE_LABELS[u.role]}</p>
                    </div>
                  </div>
                  <ArrowRight size={13} style={{ color: 'var(--text-dim)' }} />
                </button>
              ))}
              
              {/* Prototype Access */}
              <button
                onClick={() => window.location.href = '/demo/md-executive'}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors"
                style={{ 
                  border: '1px solid var(--blue)', 
                  background: 'rgba(59,130,246,0.05)',
                  marginTop: '12px'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.05)'}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'transparent', border: '1px dashed var(--blue)', color: 'var(--blue)' }}>
                    <Zap size={14} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>Executive Prototype</p>
                    <p style={{ fontSize: 10, color: 'var(--blue)', opacity: 0.8 }}>Preview Command Center</p>
                  </div>
                </div>
                <ArrowRight size={13} style={{ color: 'var(--blue)' }} />
              </button>

              <button
                onClick={() => window.location.href = '/demo/md-single-plant'}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors"
                style={{ 
                  border: '1px solid var(--purple)', 
                  background: 'rgba(168,85,247,0.05)',
                  marginTop: '8px'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(168,85,247,0.05)'}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'transparent', border: '1px dashed var(--purple)', color: 'var(--purple)' }}>
                    <Zap size={14} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)' }}>Single Plant Prototype</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>Single Plant Command Center</p>
                  </div>
                </div>
                <ArrowRight size={13} style={{ color: 'var(--purple)' }} />
              </button>
            </div>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 12 }}>
              Password: OpusOne@2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
