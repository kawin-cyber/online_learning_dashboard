import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DEMO_CREDENTIALS } from '../data/students';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { login } = useApp();
  const nav = useNavigate();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (email.trim() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      login({ name: 'Mass Karthiekyan', email, role: 'Student' });
      nav('/dashboard');
    } else {
      setError('Invalid credentials. Try the demo account below.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.1fr 1fr' }} className="login-wrap">
      <style>{`
        @media(max-width:860px){
          .login-wrap{grid-template-columns:1fr!important}
          .login-side{display:none}
        }
      `}</style>
      <div className="login-side" style={{ background: 'linear-gradient(135deg,#043e38,#0d9488)', color: '#fff', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', fontSize: 24 }}>🎓</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0 }}>Vexsus</h1>
        <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: 16 }}>Learn · Grow · Achieve. Track courses, assignments, schedule, and progress — all in your personalized learning portal.</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
          {['📚 Full course catalog with progress tracking', '📝 Interactive assignment and quiz manager', '📅 Integrated April 2025 learning calendar', '⭐ Personalized learning recommendations'].map((t) => (
            <div key={t} style={{ background: 'rgba(255,255,255,.14)', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 500 }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: 28, background: '#eaf2ef' }}>
        <form onSubmit={submit} className="vx-card" style={{ width: '100%', maxWidth: 420, padding: 32 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800 }}>Welcome back 👋</h2>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-muted)' }}>Sign in to continue to Vexsus.</p>
          {error && <div style={{ background: 'rgba(220,38,38,.1)', color: '#dc2626', padding: 10, borderRadius: 10, fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }} htmlFor="email">Email</label>
          <input id="email" className="search-input-box" style={{ width: '100%', borderRadius: 10, marginBottom: 14 }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="karthiekyan@example.com" />
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }} htmlFor="password">Password</label>
          <input id="password" type="password" className="search-input-box" style={{ width: '100%', borderRadius: 10, marginBottom: 14 }} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, marginTop: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
          </label>
          <button className="vx-btn vx-btn-teal" style={{ width: '100%', marginTop: 20, padding: 12 }} type="submit">Sign In</button>
          <button
            type="button" className="vx-btn vx-btn-white" style={{ width: '100%', marginTop: 10, padding: 12, border: '1px solid var(--border-color)' }}
            onClick={() => { setEmail(DEMO_CREDENTIALS.email); setPassword(DEMO_CREDENTIALS.password); }}
          >Use Demo Credentials</button>
          <div className="vx-card" style={{ marginTop: 16, fontSize: 13, background: 'rgba(13,148,136,.08)', border: '1px solid rgba(13,148,136,.2)', padding: 14 }}>
            Demo account:<br /><strong>{DEMO_CREDENTIALS.email}</strong><br /><strong>{DEMO_CREDENTIALS.password}</strong>
          </div>
          <div style={{ fontSize: 12, marginTop: 14, color: 'var(--text-muted)', textAlign: 'center' }}>
            <Link to="/dashboard" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>Skip straight to dashboard →</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
