import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { notifications } from '../data/notifications';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar({ onMenu }) {
  const { user, readNotifications } = useApp();
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const unread = notifications ? notifications.filter((n) => !readNotifications.includes(n.id)).length : 1;

  const hasQuery = q.trim().length >= 1;
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return courses
      .filter((c) => {
        const titleMatch = (c.title || '').toLowerCase().includes(s);
        const subMatch = (c.subtitle || '').toLowerCase().includes(s);
        const catMatch = (c.category || '').toLowerCase().includes(s);
        const instMatch = (c.instructor || '').toLowerCase().includes(s);
        const shortMatch = (c.short || '').toLowerCase().includes(s);
        const modMatch = (c.modules || []).some((m) => m.toLowerCase().includes(s));
        return titleMatch || subMatch || catMatch || instMatch || shortMatch || modMatch;
      })
      .slice(0, 6)
      .map((c) => ({ label: c.title, sub: `${c.subtitle || c.category} • ${c.instructor}`, to: `/courses/${c.id}` }));
  }, [q]);

  return (
    <header className="vx-header">
      <style>{`
        .vx-header {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(234, 242, 239, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-light);
          padding: 14px 28px;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .mobile-menu-btn {
          display: none;
          padding: 8px;
          border-radius: 8px;
          color: var(--text-main);
          font-size: 20px;
        }

        @media (max-width: 992px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
          }
        }

        .search-wrap {
          position: relative;
          flex: 1;
          max-width: 480px;
        }

        .search-input-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 30px;
          padding: 9px 18px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.03);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-input-box:focus-within {
          border-color: #0d9488;
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.12);
        }

        .search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .search-input {
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          font-size: 13.5px;
          color: var(--text-main);
          font-family: inherit;
        }

        .search-input::placeholder {
          color: #8da8a2;
        }

        .search-results-dropdown {
          position: absolute;
          top: 48px;
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          padding: 8px;
          z-index: 50;
        }

        .search-result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: 8px;
          transition: background 0.15s;
        }

        .search-result-item:hover {
          background: #f0f7f5;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--text-main);
          position: relative;
          background: #ffffff;
          border: 1px solid var(--border-color);
          transition: background 0.18s, transform 0.15s;
        }

        .icon-btn:hover {
          background: #f4f9f7;
          transform: translateY(-1px);
        }

        .notification-badge-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #ffffff;
        }

        .nav-profile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 20px;
          transition: background 0.18s;
        }

        .nav-profile-link:hover {
          background: rgba(13, 148, 136, 0.1);
        }

        .nav-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0d9488;
        }

        .nav-user-meta {
          display: flex;
          flex-direction: column;
        }

        .nav-user-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }

        .nav-user-role {
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>

      <div className="header-container">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={onMenu} aria-label="Toggle Navigation">
          ☰
        </button>

        {/* Search Bar */}
        <div className="search-wrap">
          <div className="search-input-box">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search for courses, topics, or anything..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results[0]) {
                  nav(results[0].to);
                  setQ('');
                }
              }}
            />
          </div>

          {/* Search Dropdown */}
          {hasQuery && (
            <div className="search-results-dropdown">
              {results.length > 0 ? (
                results.map((r, i) => (
                  <Link
                    key={i}
                    to={r.to}
                    className="search-result-item"
                    onClick={() => setQ('')}
                  >
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 13, display: 'block' }}>{r.label}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.sub}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--primary-teal)', fontWeight: 600 }}>Open →</span>
                  </Link>
                ))
              ) : (
                <div style={{ padding: '16px 14px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0c2621', marginBottom: 4 }}>No courses found</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
                    No matching courses for "{q.trim()}". Try searching by topic, instructor, or code.
                  </div>
                  <Link
                    to="/courses"
                    className="vx-btn vx-btn-teal"
                    style={{ fontSize: 12, padding: '5px 12px' }}
                    onClick={() => setQ('')}
                  >
                    Browse All Courses
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions & User Profile */}
        <div className="header-actions">
          <Link to="/notifications" className="icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unread > 0 && <span className="notification-badge-dot" />}
          </Link>

          {/* Profile link */}
          <Link to="/profile" className="nav-profile-link" aria-label="Open Profile">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
              alt="Mass Karthiekyan avatar"
              className="nav-avatar"
            />
            <div className="nav-user-meta">
              <span className="nav-user-name">{user?.name || 'Mass Karthiekyan'}</span>
              <span className="nav-user-role">Student</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
