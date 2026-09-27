import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { lessons } from '../data/lessons';
import { quizzes } from '../data/quizzes';
import { assignments } from '../data/assignments';
import { useApp } from '../context/AppContext.jsx';
import ChartCard, { BarRow } from '../components/ChartCard.jsx';
import { courseProgress } from '../utils/analytics';

export default function Progress() {
  const { completedLessons, quizResults, assignmentStatus } = useApp();
  const doneLessons = completedLessons.length;
  const doneQuizzes = Object.keys(quizResults).length;
  const doneAssign = Object.values(assignmentStatus).filter((s) => s === 'Submitted' || s === 'Graded').length;

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Progress Overview</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Real-time track of completed lessons, submitted assignments, and attempted quizzes.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="vx-btn vx-btn-teal" style={{ fontSize: 12, padding: '7px 14px' }}>Overview</span>
          <Link to="/analytics" className="vx-btn vx-btn-white" style={{ fontSize: 12, padding: '7px 14px', border: '1px solid var(--border-color)' }}>
            Performance Analytics →
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="vx-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Completed Lessons</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#054e46' }}>
            {doneLessons} <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>/ {lessons.length}</span>
          </div>
        </div>

        <div className="vx-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Completed Quizzes</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0d9488' }}>
            {doneQuizzes} <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>/ {quizzes.length}</span>
          </div>
        </div>

        <div className="vx-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Submitted Assignments</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#d97706' }}>
            {doneAssign} <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>/ {assignments.length}</span>
          </div>
        </div>

        <div className="vx-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Remaining Lessons</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#e11d48' }}>
            {lessons.length - doneLessons}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <ChartCard title="Overall Course Progress" sub="Lesson completion per course">
          {courses.map((c) => {
            const p = courseProgress(c.id, completedLessons);
            return <BarRow key={c.id} label={`${c.title} (${p.done}/${p.total} lessons)`} value={p.pct} color={c.color || '#054e46'} />;
          })}
        </ChartCard>
      </div>

      <div className="vx-card" style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621' }}>Keep standard performance high 💪</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
            Open performance analytics to inspect topic strength and recommendations.
          </p>
        </div>
        <Link to="/analytics" className="vx-btn vx-btn-teal">
          Open Analytics →
        </Link>
      </div>
    </div>
  );
}
