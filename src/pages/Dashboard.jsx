import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { courses } from '../data/courses.js';
import { lessonsByCourse } from '../data/lessons.js';
import { calendarEvents, getEventsForDate } from '../data/calendarEvents.js';
import { todoList, recommendedResources } from '../data/dashboardData.js';
import { courseProgress, overallProgress } from '../utils/analytics.js';
import CalendarWidget from '../components/CalendarWidget.jsx';
import SafeImage from '../components/SafeImage.jsx';

export default function Dashboard() {
  const { user, completedLessons } = useApp();
  const [todos, setTodos] = useState(todoList);
  const [selectedDate, setSelectedDate] = useState('2026-09-24');

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Synchronized statistics derived from courses & completedLessons
  const stats = useMemo(() => {
    const enrolled = courses.length;
    let completed = 0;
    let inProgress = 0;

    courses.forEach((c) => {
      const p = courseProgress(c.id, completedLessons);
      if (p.pct === 100) {
        completed++;
      } else if (p.pct > 0) {
        inProgress++;
      }
    });

    const overall = overallProgress(completedLessons);
    return { enrolled, completed, inProgress, overall };
  }, [completedLessons]);

  // Determine active in-progress course for Continue Learning banner
  const activeCourse = useMemo(() => {
    // Look for first course with progress > 0 and < 100, or fallback to first course
    const inProg = courses.find((c) => {
      const p = courseProgress(c.id, completedLessons);
      return p.pct > 0 && p.pct < 100;
    });
    const c = inProg || courses[0];
    const cLessons = lessonsByCourse(c.id);
    const nextL = cLessons.find((l) => !completedLessons.includes(l.id)) || cLessons[0];
    const p = courseProgress(c.id, completedLessons);
    return { course: c, nextLesson: nextL, progress: p };
  }, [completedLessons]);

  // Selected date events from calendarEvents
  const dayEvents = useMemo(() => {
    const list = getEventsForDate(selectedDate);
    // If no events on chosen date, provide upcoming events for context
    return list;
  }, [selectedDate]);

  return (
    <div className="dashboard-page">
      <style>{`
        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, #d3eee7 0%, #eef7f5 60%, #f4fbf9 100%);
          border: 1px solid #c9e4dd;
          border-radius: 20px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .welcome-info {
          max-width: 520px;
          z-index: 2;
        }

        .welcome-sub-small {
          font-size: 13px;
          color: #054e46;
          font-weight: 600;
        }

        .welcome-title {
          font-size: 26px;
          font-weight: 800;
          color: #0c2621;
          margin: 2px 0 6px;
          letter-spacing: -0.02em;
        }

        .welcome-desc {
          font-size: 13.5px;
          color: #557570;
          margin-bottom: 20px;
        }

        .stats-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .stat-pill-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          padding: 8px 14px;
          box-shadow: 0 2px 6px rgba(12, 38, 33, 0.04);
          transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
          cursor: pointer;
        }

        .stat-pill-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(12, 38, 33, 0.1);
          background: #ffffff;
        }

        .stat-pill-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          font-size: 13px;
        }

        .stat-pill-val {
          font-weight: 800;
          font-size: 15px;
          color: #0c2621;
          line-height: 1;
        }

        .stat-pill-label {
          font-size: 11px;
          color: #557570;
          font-weight: 600;
        }

        .welcome-graphic {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 260px;
        }

        .banner-img-mock {
          width: 240px;
          height: 140px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }

        .banner-script-overlay {
          position: absolute;
          right: 20px;
          top: 15px;
          font-family: 'Georgia', cursive, serif;
          font-style: italic;
          font-size: 18px;
          color: #075a51;
          font-weight: 700;
          line-height: 1.2;
          text-align: right;
          pointer-events: none;
          text-shadow: 0 1px 2px rgba(255,255,255,0.8);
        }

        /* Course Cards Grid */
        .my-courses-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 26px;
        }

        @media (max-width: 1100px) {
          .my-courses-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 580px) {
          .my-courses-grid {
            grid-template-columns: 1fr;
          }
        }

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

        .course-banner-img {
          height: 100px;
          position: relative;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .course-badge-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #ffffff;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .course-card-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .course-card-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c2621;
          margin-bottom: 2px;
        }

        .course-card-sub {
          font-size: 11px;
          color: #64857e;
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .course-progress-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          color: #0c2621;
          margin-bottom: 6px;
        }

        .course-btn-link {
          font-size: 12px;
          font-weight: 600;
          color: #0b6b5f;
          margin-top: auto;
          padding-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
        }

        .course-btn-link:hover {
          color: #054e46;
          text-decoration: underline;
        }

        /* Continue Learning Banner */
        .continue-card-banner {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 18px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          margin-bottom: 26px;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 768px) {
          .continue-card-banner {
            grid-template-columns: 1fr;
          }
        }

        .continue-left-panel {
          background: #054e46;
          color: #ffffff;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .continue-badge {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.15);
          color: #d1fae5;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 12px;
          width: fit-content;
          margin-bottom: 10px;
        }

        .continue-title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .continue-sub {
          font-size: 12.5px;
          color: #a3d9d0;
          margin-bottom: 16px;
        }

        .continue-right-panel {
          position: relative;
          background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80') center/cover no-repeat;
          min-height: 180px;
          display: flex;
          align-items: flex-end;
          padding: 18px 20px;
          text-decoration: none;
        }

        .continue-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5, 78, 70, 0.8) 0%, rgba(5, 78, 70, 0.15) 70%);
          transition: background 0.2s;
        }

        .continue-right-panel:hover .continue-right-overlay {
          background: linear-gradient(to top, rgba(5, 78, 70, 0.88) 0%, rgba(5, 78, 70, 0.25) 70%);
        }

        .last-viewed-pill {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
        }

        .play-btn-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          display: grid;
          place-items: center;
          color: #ffffff;
          font-size: 16px;
          transition: transform 0.2s, background 0.2s;
        }

        .continue-right-panel:hover .play-btn-circle {
          transform: scale(1.1);
          background: rgba(13, 148, 136, 0.8);
        }

        /* Recommended Resources Grid */
        .recs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        @media (max-width: 1100px) {
          .recs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .rec-card-link {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }

        .rec-card-link:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .rec-card-img {
          height: 85px;
          width: 100%;
          object-fit: cover;
        }

        .rec-card-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .rec-type-badge {
          font-size: 10px;
          font-weight: 700;
          color: #054e46;
          margin-bottom: 2px;
          text-transform: uppercase;
        }

        .rec-card-title {
          font-size: 13px;
          font-weight: 700;
          color: #0c2621;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .rec-card-meta {
          font-size: 11px;
          color: #64857e;
          margin-top: auto;
        }

        /* Right Panel Widgets */
        .right-panel-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .schedule-event-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px dashed var(--border-light);
          text-decoration: none;
          transition: background 0.15s;
        }

        .schedule-event-item:hover {
          background: #f8faf9;
        }

        .schedule-event-item:last-child {
          border-bottom: none;
        }

        .schedule-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          font-size: 14px;
        }

        .schedule-event-title {
          font-size: 12.5px;
          font-weight: 700;
          color: #0c2621;
          line-height: 1.25;
        }

        .schedule-event-time {
          font-size: 11px;
          color: #64857e;
          margin-top: 2px;
        }

        /* To Do Checklist */
        .todo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-light);
          cursor: pointer;
        }

        .todo-item:last-child {
          border-bottom: none;
        }

        .todo-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #0d9488;
          display: grid;
          place-items: center;
          color: #ffffff;
          background: transparent;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .todo-checkbox.checked {
          background: #0d9488;
        }

        .todo-text {
          font-size: 12.5px;
          font-weight: 600;
          color: #0c2621;
          line-height: 1.2;
        }

        .todo-text.done {
          text-decoration: line-through;
          color: #8aa39e;
        }

        .todo-due {
          font-size: 11px;
          color: #64857e;
          margin-top: 1px;
        }

        /* Quote Banner Card */
        .quote-banner-card {
          background: linear-gradient(135deg, rgba(5, 78, 70, 0.85), rgba(5, 78, 70, 0.96)),
                      url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80') center/cover;
          border-radius: 16px;
          padding: 24px;
          color: #ffffff;
          box-shadow: var(--shadow-sm);
        }

        .quote-text {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
          margin-bottom: 12px;
          font-style: italic;
        }

        .quote-author {
          font-size: 11.5px;
          color: #a3d9d0;
          font-weight: 500;
        }
      `}</style>

      <div className="dashboard-grid">
        {/* LEFT COLUMN (70%) */}
        <div className="dashboard-left">
          {/* Welcome Back Banner */}
          <div className="welcome-banner">
            <div className="welcome-info">
              <div className="welcome-sub-small">Welcome back,</div>
              <h1 className="welcome-title">
                {user?.name || 'Mass Karthiekyan'}! 👋
              </h1>
              <p className="welcome-desc">
                Keep going! You're doing great in your learning journey.
              </p>

              {/* 4 Synchronized Stat Pills - Interactive Links */}
              <div className="stats-pills-row">
                <Link to="/courses?filter=All" className="stat-pill-link" title="Click to view all enrolled courses">
                  <div className="stat-pill-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                    📖
                  </div>
                  <div>
                    <div className="stat-pill-val">{stats.enrolled}</div>
                    <div className="stat-pill-label">Enrolled Courses</div>
                  </div>
                </Link>

                <Link to="/courses?filter=Completed" className="stat-pill-link" title="Click to view completed courses">
                  <div className="stat-pill-icon" style={{ background: '#d1fae5', color: '#059669' }}>
                    ✔️
                  </div>
                  <div>
                    <div className="stat-pill-val">{stats.completed}</div>
                    <div className="stat-pill-label">Completed</div>
                  </div>
                </Link>

                <Link to="/courses?filter=In Progress" className="stat-pill-link" title="Click to view in-progress courses">
                  <div className="stat-pill-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                    🕒
                  </div>
                  <div>
                    <div className="stat-pill-val">{stats.inProgress}</div>
                    <div className="stat-pill-label">In Progress</div>
                  </div>
                </Link>

                <Link to="/progress" className="stat-pill-link" title="Click to open full Progress Overview">
                  <div className="stat-pill-icon" style={{ background: '#fae8ff', color: '#a21caf' }}>
                    ⭐
                  </div>
                  <div>
                    <div className="stat-pill-val">{stats.overall}%</div>
                    <div className="stat-pill-label">Overall Progress</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Graphic Section */}
            <div className="welcome-graphic">
              <SafeImage
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80"
                alt="Learning desk"
                className="banner-img-mock"
              />
              <div className="banner-script-overlay">
                Better<br />Learning<br />Brighter<br />Future
              </div>
            </div>
          </div>

          {/* My Courses Section */}
          <div style={{ marginBottom: 24 }}>
            <div className="section-header">
              <h2 className="section-title">My Courses</h2>
              <Link to="/courses" className="view-all-link">
                View All Courses →
              </Link>
            </div>

            <div className="my-courses-grid">
              {courses.slice(0, 4).map((course) => {
                const p = courseProgress(course.id, completedLessons);
                return (
                  <div key={course.id} className="course-card">
                    <div
                      className="course-banner-img"
                      style={{ background: course.bgGradient }}
                    >
                      <div className="course-badge-icon">
                        {course.iconType === 'code' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                        )}
                        {course.iconType === 'link' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#054e46" strokeWidth="2.2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                        )}
                        {course.iconType === 'database' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4c1d95" strokeWidth="2.2">
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                          </svg>
                        )}
                        {course.iconType === 'chip' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#042f2e" strokeWidth="2.2">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                            <rect x="9" y="9" width="6" height="6" />
                            <line x1="9" y1="1" x2="9" y2="4" />
                            <line x1="15" y1="1" x2="15" y2="4" />
                            <line x1="9" y1="20" x2="9" y2="23" />
                            <line x1="15" y1="20" x2="15" y2="23" />
                            <line x1="20" y1="9" x2="23" y2="9" />
                            <line x1="20" y1="15" x2="23" y2="15" />
                          </svg>
                        )}
                    </div>
                  </div>

                  <div className="course-card-body">
                    <h3 className="course-card-title">{course.title}</h3>
                    <div className="course-card-sub">{course.subtitle}</div>

                    <div className="course-progress-row">
                      <div className="vx-progress-track" style={{ flex: 1, marginRight: 8 }}>
                        <div
                          className="vx-progress-fill"
                          style={{
                            width: `${p.pct}%`,
                            background: course.color || '#054e46',
                          }}
                        />
                      </div>
                      <span>{p.pct}%</span>
                    </div>

                    <Link to={`/courses/${course.id}`} className="course-btn-link">
                      Continue Learning →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Learning Feature Banner - Connected to real incomplete lesson */}
        <div style={{ marginBottom: 24 }}>
          <div className="section-header">
            <h2 className="section-title">Continue Learning</h2>
          </div>

          <div className="continue-card-banner">
            <div className="continue-left-panel">
              <span className="continue-badge">In Progress</span>
              <h3 className="continue-title">{activeCourse.course.title}</h3>
              <p className="continue-sub">
                Module: {activeCourse.nextLesson?.module || 'Current'} • Next: {activeCourse.nextLesson?.title}
              </p>

              <div className="vx-progress-track" style={{ height: 8, background: 'rgba(255,255,255,0.2)', marginBottom: 18 }}>
                <div className="vx-progress-fill" style={{ width: `${activeCourse.progress.pct}%`, background: '#6ee7b7' }} />
              </div>

              <Link
                to={`/lessons/${activeCourse.nextLesson?.id || 'ds-l1'}`}
                className="vx-btn vx-btn-white"
                style={{ width: 'fit-content' }}
              >
                Resume Course →
              </Link>
            </div>

            {/* Clickable video area that opens lesson */}
            <Link
              to={`/lessons/${activeCourse.nextLesson?.id || 'ds-l1'}`}
              className="continue-right-panel"
              title="Click to play current lesson"
            >
              <div className="continue-right-overlay" />
              <div className="last-viewed-pill">
                <div className="play-btn-circle">▶</div>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.9 }}>Last viewed lesson</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{activeCourse.nextLesson?.title || 'Arrays & Stacks'}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>({activeCourse.nextLesson?.duration || '15 min'})</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recommended for You Section - Working Clickable Cards */}
        <div>
          <div className="section-header">
            <h2 className="section-title">Recommended for You</h2>
            <Link to="/resources" className="view-all-link">
              View All Library →
            </Link>
          </div>

          <div className="recs-grid">
            {recommendedResources.map((res) => (
              <Link
                key={res.id}
                to={res.link || '/resources'}
                className="rec-card-link"
                title={`Open ${res.title}`}
              >
                <SafeImage src={res.image} alt={res.title} className="rec-card-img" />
                <div className="rec-card-body">
                  <div className="rec-type-badge">{res.type}</div>
                  <h4 className="rec-card-title">{res.title}</h4>
                  <div className="rec-card-meta">{res.readTime} • Click to open →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN (30%) */}
      <div className="right-panel-stack">
        {/* Upcoming Schedule Card with Dynamic Calendar & Day Filter */}
        <div className="vx-card">
          <div className="section-header" style={{ marginBottom: 8 }}>
            <h3 className="section-title" style={{ fontSize: 16 }}>Upcoming Schedule</h3>
            <Link to="/calendar" className="view-all-link">
              View Calendar →
            </Link>
          </div>

          {/* Interactive Calendar with Month/Year Navigation */}
          <CalendarWidget
            selectedDate={selectedDate}
            onSelectDate={(newDate) => setSelectedDate(newDate)}
          />

          {/* Events List Filtered by Selected Date */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
              Events for: {selectedDate}
            </div>

            {dayEvents.length > 0 ? (
              dayEvents.map((ev) => (
                <Link
                  key={ev.id}
                  to={ev.targetUrl}
                  className="schedule-event-item"
                  title={`Open ${ev.category}`}
                >
                  <div
                    className="schedule-icon-badge"
                    style={{ background: ev.badgeColor || '#e0f2fe', color: ev.iconColor || '#0284c7' }}
                  >
                    {ev.type === 'class' && '📹'}
                    {ev.type === 'assignment' && '📄'}
                    {ev.type === 'quiz' && '❓'}
                    {ev.type === 'event' && '👥'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="schedule-event-title">{ev.title}</div>
                    <div className="schedule-event-time">
                      <span className="vx-badge" style={{ fontSize: 10, padding: '1px 6px', marginRight: 4, background: '#f1f5f3' }}>
                        {ev.category}
                      </span>
                      {ev.time}
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--primary-teal)', fontWeight: 700 }}>→</span>
                </Link>
              ))
            ) : (
              <div style={{ padding: '14px 10px', textAlign: 'center', background: '#f8faf9', borderRadius: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                No events scheduled for this day.
                <div style={{ marginTop: 6 }}>
                  <Link to="/calendar" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>
                    Browse Full Schedule →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* To Do Card */}
        <div className="vx-card">
          <div className="section-header" style={{ marginBottom: 10 }}>
            <h3 className="section-title" style={{ fontSize: 16 }}>To Do</h3>
            <Link to="/assignments" className="view-all-link">
              View All →
            </Link>
          </div>

          <div>
            {todos.map((t) => (
              <div key={t.id} className="todo-item" onClick={() => toggleTodo(t.id)}>
                <div className={`todo-checkbox ${t.completed ? 'checked' : ''}`}>
                  {t.completed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className={`todo-text ${t.completed ? 'done' : ''}`}>{t.title}</div>
                  <div className="todo-due">{t.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote Card */}
        <div className="quote-banner-card">
          <div className="quote-text">
            "The expert in anything was once a beginner."
          </div>
          <div className="quote-author">— Helen Hayes</div>
        </div>
      </div>
    </div>
  </div>
);
}
