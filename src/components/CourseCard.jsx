import { Link } from 'react-router-dom';

export default function CourseCard({ course, progress }) {
  const pct = progress ? progress.pct : course.progress || 0;
  const done = progress ? progress.done : Math.round((pct / 100) * 10);
  const total = progress ? progress.total : 10;

  return (
    <div className="course-card">
      <style>{`
        .course-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .course-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-hover);
        }

        .course-card-head {
          height: 110px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .course-badge-icon-lg {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #ffffff;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .course-card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .course-title-main {
          font-size: 15px;
          font-weight: 800;
          color: #0c2621;
          margin-bottom: 2px;
        }

        .course-subtitle-main {
          font-size: 12px;
          color: #64857e;
          margin-bottom: 10px;
        }

        .course-desc-text {
          font-size: 12.5px;
          color: #557570;
          line-height: 1.4;
          margin-bottom: 14px;
        }
      `}</style>

      <div
        className="course-card-head"
        style={{
          background: course.bgGradient || 'linear-gradient(135deg, #054e46 0%, #0d9488 100%)',
        }}
      >
        <div className="course-badge-icon-lg">
          {course.iconType === 'code' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          )}
          {course.iconType === 'link' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#054e46" strokeWidth="2.2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
          {course.iconType === 'database' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4c1d95" strokeWidth="2.2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          )}
          {course.iconType === 'chip' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#042f2e" strokeWidth="2.2">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
            </svg>
          )}
          {!course.iconType && <span style={{ fontWeight: 800, fontSize: 20 }}>{course.short || 'VS'}</span>}
        </div>
      </div>

      <div className="course-card-content">
        <h3 className="course-title-main">{course.title}</h3>
        <div className="course-subtitle-main">{course.subtitle || course.instructor}</div>
        <p className="course-desc-text">{course.description ? course.description.slice(0, 95) + '…' : ''}</p>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#0c2621' }}>
            <span>Progress ({done}/{total} lessons)</span>
            <span>{pct}%</span>
          </div>

          <div className="vx-progress-track" style={{ marginBottom: 14 }}>
            <div className="vx-progress-fill" style={{ width: `${pct}%`, background: '#054e46' }} />
          </div>

          <Link to={`/courses/${course.id}`} className="vx-btn vx-btn-teal" style={{ width: '100%' }}>
            Open Course & Lessons →
          </Link>
        </div>
      </div>
    </div>
  );
}
