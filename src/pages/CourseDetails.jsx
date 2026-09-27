import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../data/courses';
import { lessonsByCourse } from '../data/lessons';
import { assignmentsByCourse } from '../data/assignments';
import { quizzesByCourse } from '../data/quizzes';
import { useApp } from '../context/AppContext.jsx';

export default function CourseDetails() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { completedLessons, toggleLesson } = useApp();

  const list = useMemo(() => (course ? lessonsByCourse(course.id) : []), [course]);
  const modules = useMemo(() => [...new Set(list.map((l) => l.module))], [list]);

  // Keep track of which modules are expanded (all expanded by default)
  const [collapsedModules, setCollapsedModules] = useState({});

  const toggleModule = (moduleName) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  if (!course) {
    return (
      <div className="vx-card" style={{ textAlign: 'center', padding: 48, maxWidth: 600, margin: '40px auto' }}>
        <h2 style={{ fontSize: 22, color: '#0c2621' }}>Course not found</h2>
        <p style={{ margin: '8px 0 20px', color: 'var(--text-muted)' }}>
          The requested course ID "{courseId}" could not be located in your enrolled catalog.
        </p>
        <Link to="/courses" className="vx-btn vx-btn-teal">
          Browse All Courses →
        </Link>
      </div>
    );
  }

  const done = list.filter((l) => completedLessons.includes(l.id)).length;
  const pct = list.length > 0 ? Math.round((done / list.length) * 100) : 0;
  const nextLesson = list.find((l) => !completedLessons.includes(l.id)) || list[0];
  const courseQuizzes = quizzesByCourse(course.id);
  const courseAssignments = assignmentsByCourse(course.id);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <Link
        to="/courses"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#0d9488',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 16,
          textDecoration: 'none',
        }}
      >
        ← Back to My Courses
      </Link>

      {/* Course Header Banner */}
      <div className="vx-card" style={{ marginBottom: 24, padding: 28, background: '#ffffff' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: course.bgGradient || 'linear-gradient(135deg, #054e46 0%, #0d9488 100%)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: 24,
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
              flexShrink: 0,
            }}
          >
            {course.short || 'VS'}
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0c2621', margin: 0 }}>{course.title}</h1>
            <div style={{ fontSize: 13, color: '#557570', marginTop: 4 }}>
              Instructor: <strong>{course.instructor}</strong> • {course.duration || '8 weeks'} • Rating ⭐ {course.rating || 4.8}
            </div>
          </div>

          {nextLesson && (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="vx-btn vx-btn-teal"
              style={{ padding: '10px 18px', fontSize: 13 }}
            >
              {pct === 100 ? 'Review Lessons →' : `Resume Lesson (${nextLesson.title.slice(0, 18)}…) →`}
            </Link>
          )}
        </div>

        <p style={{ fontSize: 14, color: '#3b524d', lineHeight: 1.6, marginBottom: 18 }}>{course.description}</p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, marginBottom: 20, fontWeight: 600, color: '#0c2621' }}>
          <span className="vx-badge vx-badge-teal">📖 {list.length} Total Lessons</span>
          <Link to="/quizzes" className="vx-badge vx-badge-teal" style={{ textDecoration: 'none' }}>
            ❓ {courseQuizzes.length} Quizzes
          </Link>
          <Link to="/assignments" className="vx-badge vx-badge-teal" style={{ textDecoration: 'none' }}>
            📝 {courseAssignments.length} Assignments
          </Link>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#0c2621' }}>
            <span>Overall Course Progress</span>
            <span>
              {pct}% ({done}/{list.length} lessons completed)
            </span>
          </div>
          <div className="vx-progress-track" style={{ height: 10 }}>
            <div className="vx-progress-fill" style={{ width: `${pct}%`, background: '#054e46' }} />
          </div>
        </div>
      </div>

      {/* Modules List Header */}
      <div className="section-header" style={{ marginBottom: 16 }}>
        <h2 className="section-title">Course Modules & Lessons ({modules.length} Modules)</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {modules.length === 0 ? (
          <div className="vx-card" style={{ padding: 20, color: 'var(--text-muted)' }}>
            No modules detailed for this course.
          </div>
        ) : (
          modules.map((m, i) => {
            const items = list.filter((l) => l.module === m);
            const doneCount = items.filter((l) => completedLessons.includes(l.id)).length;
            const isCompleted = doneCount === items.length && items.length > 0;
            const isInProgress = doneCount > 0 && doneCount < items.length;
            const isOpen = !collapsedModules[m];

            return (
              <div key={m} className="vx-card" style={{ padding: 0, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => toggleModule(m)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 15, color: '#0c2621' }}>
                      Module {i + 1} — {m}
                    </strong>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {items.length} lessons • {doneCount} completed
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      className="vx-badge"
                      style={{
                        background: isCompleted ? '#d1fae5' : isInProgress ? '#fef3c7' : '#f1f5f9',
                        color: isCompleted ? '#059669' : isInProgress ? '#d97706' : '#64748b',
                      }}
                    >
                      {isCompleted ? '✓ Completed' : isInProgress ? '● In Progress' : '○ Not Started'}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 22px 20px', borderTop: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                      {items.map((l) => {
                        const isDone = completedLessons.includes(l.id);
                        return (
                          <div
                            key={l.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 12,
                              padding: '12px 16px',
                              background: isDone ? '#f4faf7' : '#ffffff',
                              border: `1px solid ${isDone ? '#a7f3d0' : 'var(--border-color)'}`,
                              borderRadius: 12,
                            }}
                          >
                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', flex: 1 }}>
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleLesson(l.id)}
                                style={{ width: 18, height: 18, accentColor: '#054e46' }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontSize: 13.5,
                                    fontWeight: 700,
                                    color: isDone ? '#557570' : '#0c2621',
                                    textDecoration: isDone ? 'line-through' : 'none',
                                  }}
                                >
                                  {l.title}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                  {l.duration} • {l.type === 'video' ? '📹 Video Lesson' : l.type === 'practice' ? '💻 Coding Practice' : '📖 Reading'}
                                </div>
                              </div>
                            </label>

                            <Link
                              to={`/lessons/${l.id}`}
                              className="vx-btn vx-btn-teal"
                              style={{ padding: '6px 14px', fontSize: 12 }}
                            >
                              Open Lesson →
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
