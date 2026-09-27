import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessonById, lessonsByCourse } from '../data/lessons';
import { getCourse } from '../data/courses';
import { useApp } from '../context/AppContext.jsx';

export default function Lesson() {
  const { lessonId } = useParams();
  const lesson = lessonById(lessonId);
  const { completedLessons, markLessonComplete } = useApp();
  const [notes, setNotes] = useState(() => localStorage.getItem(`notes-${lessonId}`) || '');

  if (!lesson) {
    return (
      <div className="vx-card" style={{ textAlign: 'center', padding: 40 }}>
        <h2>Lesson not found</h2>
        <p style={{ margin: '8px 0 16px', color: 'var(--text-muted)' }}>The lesson you are looking for does not exist.</p>
        <Link to="/courses" className="vx-btn vx-btn-teal">
          Back to Courses
        </Link>
      </div>
    );
  }

  const course = getCourse(lesson.courseId);
  const list = lessonsByCourse(lesson.courseId);
  const idx = list.findIndex((l) => l.id === lesson.id);
  const done = completedLessons.includes(lesson.id);
  const prev = list[idx - 1];
  const next = list[idx + 1];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Link
        to={`/courses/${lesson.courseId}`}
        style={{ fontSize: 13, fontWeight: 600, color: '#0d9488', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 12 }}
      >
        ← {course?.title || 'Course'} / {lesson.module}
      </Link>

      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>
            {lesson.title}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {lesson.summary} • {lesson.duration} • {lesson.type || 'Interactive Lesson'}
          </p>
        </div>
        <button className="vx-btn vx-btn-teal" onClick={() => markLessonComplete(lesson.id)} disabled={done}>
          {done ? '✓ Lesson Completed' : 'Mark as Complete'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        {/* Left Column: Player & Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Simulated Player */}
          <div className="vx-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #043e38 0%, #0d5d54 100%)',
                color: '#ffffff',
                aspectRatio: '16/9',
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
                padding: 24,
                position: 'relative',
              }}
            >
              <div>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 12px',
                    fontSize: 24,
                    cursor: 'pointer',
                  }}
                >
                  ▶
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{lesson.title}</h3>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Interactive Vexsus Video Lecture</div>
              </div>
            </div>

            {/* Lesson Navigation Controls */}
            <div
              style={{
                padding: '14px 20px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-light)',
              }}
            >
              <div>
                {prev ? (
                  <Link to={`/lessons/${prev.id}`} className="vx-btn vx-btn-white" style={{ border: '1px solid var(--border-color)', padding: '6px 14px', fontSize: 12 }}>
                    ← Prev: {prev.title.slice(0, 20)}…
                  </Link>
                ) : (
                  <span />
                )}
              </div>

              <div>
                {next ? (
                  <Link to={`/lessons/${next.id}`} className="vx-btn vx-btn-teal" style={{ padding: '6px 14px', fontSize: 12 }}>
                    Next: {next.title.slice(0, 20)}… →
                  </Link>
                ) : (
                  <Link to={`/courses/${lesson.courseId}`} className="vx-btn vx-btn-teal" style={{ padding: '6px 14px', fontSize: 12 }}>
                    Finish Course →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Content Card */}
          <div className="vx-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Lesson Overview & Materials</h3>
            <ul style={{ fontSize: 13.5, color: '#3b524d', lineHeight: 1.7, paddingLeft: 18 }}>
              <li>Comprehensive worked examples and code snippets for {lesson.title}.</li>
              <li>Practice checklist: Read module concepts, try hands-on code exercises, and verify quiz mastery.</li>
              <li>Course slides, downloadable PDFs, and practice repositories.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Personal Notes */}
        <div className="vx-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>My Notes & Doubts</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
            Your notes auto-save to browser storage in real-time as you type.
          </p>

          <textarea
            className="search-input-box"
            rows="14"
            style={{ width: '100%', borderRadius: 12, padding: 14, resize: 'vertical', fontFamily: 'inherit' }}
            value={notes}
            placeholder="Type your notes, takeaways, or key formulas here…"
            onChange={(e) => {
              setNotes(e.target.value);
              localStorage.setItem(`notes-${lessonId}`, e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
