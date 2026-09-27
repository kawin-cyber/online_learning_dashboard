import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KEYS, readJSON, writeJSON } from '../utils/localStorage';
import { useApp } from '../context/AppContext.jsx';

export default function Settings() {
  const { theme, setTheme, notify } = useApp();
  const [prefs, setPrefs] = useState(() =>
    readJSON(KEYS.SETTINGS, { assignmentReminders: true, quizReminders: true, courseUpdates: false })
  );
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState('');

  const toggle = (key) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    writeJSON(KEYS.SETTINGS, next);
    notify('Preferences updated');
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (!pwd.next || pwd.next !== pwd.confirm) {
      setMsg('New passwords do not match.');
      return;
    }
    setMsg('Password updated successfully! ✓');
    notify('Password changed (simulated)');
    setPwd({ current: '', next: '', confirm: '' });
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>System Settings</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Theme options, notification preferences, and password security.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Appearance & Notifications Card */}
        <div className="vx-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621', marginBottom: 14 }}>Appearance Theme</h3>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <button
              className={`vx-btn ${theme === 'light' ? 'vx-btn-teal' : 'vx-btn-white'}`}
              style={{ flex: 1, border: '1px solid var(--border-color)', padding: 10 }}
              onClick={() => setTheme('light')}
            >
              ☀️ Light Mode
            </button>
            <button
              className={`vx-btn ${theme === 'dark' ? 'vx-btn-teal' : 'vx-btn-white'}`}
              style={{ flex: 1, border: '1px solid var(--border-color)', padding: 10 }}
              onClick={() => setTheme('dark')}
            >
              🌙 Dark Mode
            </button>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621', marginBottom: 14 }}>Notification Preferences</h3>

          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['assignmentReminders', 'Assignment Due Date Reminders'],
              ['quizReminders', 'Quiz Deadline Alerts'],
              ['courseUpdates', 'New Lesson & Content Releases'],
            ].map(([k, label]) => (
              <label
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: '#f8faf9',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={!!prefs[k]}
                  onChange={() => toggle(k)}
                  style={{ width: 18, height: 18, accentColor: '#054e46' }}
                />
              </label>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <Link to="/profile" className="vx-btn vx-btn-teal" style={{ width: '100%' }}>
              Edit Student Profile Details →
            </Link>
          </div>
        </div>

        {/* Security / Password Card */}
        <div className="vx-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621', marginBottom: 14 }}>Change Password</h3>

          <form onSubmit={changePassword} style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Current Password</label>
              <input
                type="password"
                className="search-input-box"
                style={{ width: '100%', borderRadius: 10 }}
                value={pwd.current}
                onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>New Password</label>
              <input
                type="password"
                className="search-input-box"
                style={{ width: '100%', borderRadius: 10 }}
                value={pwd.next}
                onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Confirm New Password</label>
              <input
                type="password"
                className="search-input-box"
                style={{ width: '100%', borderRadius: 10 }}
                value={pwd.confirm}
                onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            {msg && (
              <div style={{ fontSize: 13, fontWeight: 600, color: msg.includes('✓') ? '#059669' : '#dc2626' }}>
                {msg}
              </div>
            )}

            <button className="vx-btn vx-btn-teal" style={{ marginTop: 8, padding: 12 }} type="submit">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
