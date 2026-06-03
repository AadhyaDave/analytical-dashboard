import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

const INTERNAL_USERNAME = 'opusone';
const INTERNAL_PASSWORD = 'Opus@2026';

const InternalAccessPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a brief network-feel delay
    await new Promise((r) => setTimeout(r, 700));

    if (username === INTERNAL_USERNAME && password === INTERNAL_PASSWORD) {
      localStorage.setItem('internalAccessGranted', 'true');
      window.location.reload();
    } else {
      setError('Invalid credentials. This platform is for internal use only.');
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 600);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050b18',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%), ' +
          'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 420, padding: '0 24px', position: 'relative', zIndex: 1 }}
      >
        {/* Header — branding */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          {/* Shield icon */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 32px rgba(59,130,246,0.15)',
          }}>
            <ShieldCheck size={26} style={{ color: '#60a5fa' }} />
          </div>

          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#3b82f6',
            marginBottom: 10,
          }}>
            Opus One Industries
          </div>

          <h1 style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#f0f6ff',
            lineHeight: 1.25,
            marginBottom: 8,
          }}>
            Operational Intelligence
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Platform
            </span>
          </h1>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            background: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 99,
            marginTop: 4,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#f87171', letterSpacing: '0.05em' }}>
              Internal Access Only
            </span>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          animate={shakeForm ? {
            x: [-8, 8, -6, 6, -4, 4, 0],
            transition: { duration: 0.5 }
          } : {}}
          style={{
            background: 'rgba(15,23,42,0.85)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '32px 28px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Username */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                color: '#8ba0bc',
                marginBottom: 6,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={14}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4a6080',
                  }}
                />
                <input
                  id="internal-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter username"
                  required
                  style={{
                    width: '100%',
                    paddingLeft: 36,
                    paddingRight: 12,
                    paddingTop: 10,
                    paddingBottom: 10,
                    background: 'rgba(5,11,24,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: '#f0f6ff',
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                color: '#8ba0bc',
                marginBottom: 6,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={14}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4a6080',
                  }}
                />
                <input
                  id="internal-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  required
                  style={{
                    width: '100%',
                    paddingLeft: 36,
                    paddingRight: 40,
                    paddingTop: 10,
                    paddingBottom: 10,
                    background: 'rgba(5,11,24,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: '#f0f6ff',
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#4a6080',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '10px 12px',
                    background: 'rgba(220,38,38,0.1)',
                    border: '1px solid rgba(220,38,38,0.2)',
                    borderRadius: 10,
                  }}
                >
                  <AlertCircle size={14} style={{ color: '#f87171', flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: '#f87171', lineHeight: 1.4 }}>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              id="internal-access-submit"
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 10,
                background: loading
                  ? 'rgba(59,130,246,0.4)'
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: 'none',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(59,130,246,0.3)',
                fontFamily: 'Inter, system-ui, sans-serif',
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.45)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="10" />
                  </svg>
                  Verifying access...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: 'center',
            fontSize: 11,
            color: '#2a3a50',
            marginTop: 28,
          }}
        >
          Opus One Industries · Manufacturing Intelligence · v4.0
          <br />
          Unauthorized access is strictly prohibited.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default InternalAccessPage;
