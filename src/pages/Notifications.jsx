import { Link } from 'react-router-dom';
import { notifications } from '../data/notifications';
import { useApp } from '../context/AppContext.jsx';

const ICONS = { assignment: '📝', quiz: '❓', course: '📚', warning: '⚠️', achievement: '🏆' };

export default function Notifications() {
  const { readNotifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const unread = notifications ? notifications.filter((n) => !readNotifications.includes(n.id)) : [];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Notifications</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {unread.length > 0 ? `${unread.length} unread notification${unread.length > 1 ? 's' : ''}` : 'You are all caught up!'}
          </p>
        </div>
        {unread.length > 0 && (
          <button
            className="vx-btn vx-btn-white"
            style={{ border: '1px solid var(--border-color)' }}
            onClick={() => markAllNotificationsRead(notifications.map((n) => n.id))}
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {notifications.map((n) => {
          const read = readNotifications.includes(n.id);
          return (
            <div
              key={n.id}
              className="vx-card"
              style={{
                display: 'flex',
                gap: 16,
                padding: 18,
                background: read ? '#ffffff' : '#f0f7f5',
                borderColor: read ? 'var(--border-color)' : '#99f6e4',
                opacity: read ? 0.8 : 1,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: read ? '#f4f9f7' : '#d1fae5',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {ICONS[n.type] || '🔔'}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <strong style={{ fontSize: 14, color: '#0c2621' }}>{n.title}</strong>
                    {!read && <span className="vx-badge vx-badge-teal">New</span>}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.time}</span>
                </div>

                <p style={{ fontSize: 13, color: '#557570', marginBottom: 12, lineHeight: 1.4 }}>{n.body}</p>

                <div style={{ display: 'flex', gap: 10 }}>
                  <Link
                    to={n.link}
                    className="vx-btn vx-btn-teal"
                    style={{ padding: '5px 14px', fontSize: 12 }}
                    onClick={() => markNotificationRead(n.id)}
                  >
                    {n.type === 'assignment'
                      ? 'View Assignment →'
                      : n.type === 'quiz'
                      ? 'Open Quiz →'
                      : n.type === 'course'
                      ? 'Go to Course →'
                      : n.type === 'achievement'
                      ? 'View Streak →'
                      : 'View Details →'}
                  </Link>

                  {!read && (
                    <button
                      className="vx-btn vx-btn-white"
                      style={{ border: '1px solid var(--border-color)', padding: '5px 14px', fontSize: 12 }}
                      onClick={() => markNotificationRead(n.id)}
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
