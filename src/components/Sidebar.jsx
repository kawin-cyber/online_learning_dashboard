import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: 'home' },
  { to: '/courses', label: 'My Courses', icon: 'book' },
  { to: '/assignments', label: 'Assignments', icon: 'file' },
  { to: '/quizzes', label: 'Quizzes', icon: 'quiz' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar' },
  { to: '/progress', label: 'Progress', icon: 'chart' },
  { to: '/analytics', label: 'Analytics', icon: 'analytics' },
  { to: '/resources', label: 'Resources', icon: 'folder' },
  { to: '/community', label: 'Community', icon: 'users' },
];

function renderNavIcon(type) {
  switch (type) {
    case 'home':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'book':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'file':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case 'calendar':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'folder':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'users':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'quiz':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'analytics':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
          <line x1="12" y1="20" x2="12" y2="10" />
          <path d="M4 12l8-8 6 6 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ open, onClose }) {
  const { user } = useApp();

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 90,
          }}
        />
      )}

      <aside className={`vx-sidebar ${open ? 'open' : ''}`}>
        <style>{`
          .vx-sidebar {
            width: 250px;
            background: var(--sidebar-bg);
            padding: 24px 16px 20px;
            display: flex;
            flex-direction: column;
            height: 100vh;
            position: sticky;
            top: 0;
            z-index: 91;
            box-shadow: 2px 0 12px rgba(0,0,0,0.08);
            user-select: none;
          }
          
          .brand-box {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 4px 8px 24px;
          }
          
          .brand-logo {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: #0d9488;
            color: #ffffff;
            display: grid;
            place-items: center;
            box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
          }
          
          .brand-title {
            font-size: 22px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.02em;
            line-height: 1.1;
          }
          
          .brand-tagline {
            font-size: 11px;
            color: #92c0b7;
            font-weight: 500;
            margin-top: 2px;
          }

          .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 11px 16px;
            border-radius: 12px;
            color: #a4c9c1;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.18s ease;
          }

          .nav-item:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.08);
          }

          .nav-item.active {
            background: var(--sidebar-active);
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }

          .sidebar-card {
            background: #074e46;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 16px;
            margin: 16px 0 20px;
            position: relative;
            overflow: hidden;
            display: block;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.18s ease, background 0.18s ease;
          }

          .sidebar-card:hover {
            background: #095950;
            transform: translateY(-1px);
          }

          .sprout-icon {
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.12);
            border-radius: 8px;
            display: grid;
            place-items: center;
            margin-bottom: 10px;
          }

          .sidebar-card-text {
            font-size: 12px;
            color: #e2f2ee;
            line-height: 1.45;
            font-weight: 500;
            margin-bottom: 12px;
          }

          .sidebar-card-arrow {
            display: flex;
            justify-content: flex-end;
          }

          .arrow-circle {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            color: #ffffff;
            display: grid;
            place-items: center;
            font-size: 12px;
            transition: background 0.2s;
          }

          .sidebar-card:hover .arrow-circle {
            background: #0d9488;
          }

          .user-footer {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            transition: background 0.18s ease;
            text-decoration: none;
          }

          .user-footer:hover {
            background: rgba(255, 255, 255, 0.08);
          }

          .user-avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #0d9488;
          }

          .user-info {
            flex: 1;
            min-width: 0;
          }

          .user-name {
            font-size: 13px;
            font-weight: 700;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .user-role {
            font-size: 11px;
            color: #8fb9b0;
          }

          @media (max-width: 992px) {
            .vx-sidebar {
              position: fixed;
              left: 0;
              top: 0;
              transform: translateX(-105%);
              transition: transform 0.25s ease;
            }
            .vx-sidebar.open {
              transform: translateX(0);
            }
          }
        `}</style>

        {/* Brand Header */}
        <div className="brand-box">
          <div className="brand-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <div className="brand-title">Vexsus</div>
            <div className="brand-tagline">Learn · Grow · Achieve</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {renderNavIcon(item.icon)}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Motivation Card */}
        <Link
          to="/progress"
          className="sidebar-card"
          onClick={onClose}
          title="View your learning progress & stats"
        >
          <div className="sprout-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10" />
              <path d="M10 20c0-4.4 3.6-8 8-8v-1c-5.5 0-10 4.5-10 10" />
              <path d="M14 20c0-7.7-6.3-14-14-14v1c7.7 0 14 6.3 14 13" />
            </svg>
          </div>
          <div className="sidebar-card-text">
            Small steps every day lead to big results.
          </div>
          <div className="sidebar-card-arrow">
            <span className="arrow-circle">→</span>
          </div>
        </Link>

        {/* User Footer - Links to /profile */}
        <Link to="/profile" className="user-footer" onClick={onClose} aria-label="Open Profile">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
            alt="User avatar"
            className="user-avatar"
          />
          <div className="user-info">
            <div className="user-name">{user?.name || 'Mass Karthiekyan'}</div>
            <div className="user-role">Student</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8fb9b0" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Link>
      </aside>
    </>
  );
}
