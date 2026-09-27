import { Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { quizzes } from '../data/quizzes';
import { useApp } from '../context/AppContext.jsx';
import ChartCard, { BarRow, SimpleBars } from '../components/ChartCard.jsx';
import { averageQuizScore, courseProgress, courseQuizAvg, overallProgress, topicStatus, weakTopics, WEEKLY_ACTIVITY } from '../utils/analytics';

export default function Analytics() {
  const { completedLessons, quizResults } = useApp();
  const avg = averageQuizScore(quizResults);
  const overall = overallProgress(completedLessons);
  const weak = weakTopics(quizResults);

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Performance Analytics</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Live performance calculation based on completed lessons, quiz scores, and study time.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/progress" className="vx-btn vx-btn-white" style={{ fontSize: 12, padding: '7px 14px', border: '1px solid var(--border-color)' }}>
            ← Progress Overview
          </Link>
          <span className="vx-btn vx-btn-teal" style={{ fontSize: 12, padding: '7px 14px' }}>Analytics</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 24 }}>
        <ChartCard title="Overall Quiz Mastery" sub="Average across all attempted quizzes">
          <div style={{ fontSize: 48, fontWeight: 800, color: '#054e46', lineHeight: 1 }}>{avg}%</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
            Average Quiz Score • Overall course completion: <strong>{overall}%</strong>
          </div>
        </ChartCard>

        <ChartCard title="Recent Quiz Scores" sub="Performance per quiz attempt">
          <SimpleBars
            color="#054e46"
            data={quizzes.slice(0, 6).map((q) => ({
              label: q.title.split(' ')[0],
              value: quizResults[q.id]?.pct || 0,
              suffix: '%',
            }))}
          />
        </ChartCard>

        <ChartCard title="Weekly Study Activity" sub="Minutes spent learning this week">
          <SimpleBars
            color="#0d9488"
            data={WEEKLY_ACTIVITY.map((d) => ({
              label: d.day,
              value: d.minutes,
              suffix: 'm',
            }))}
          />
        </ChartCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <ChartCard title="Course Quiz Mastery" sub="Highest quiz score per course">
          {courses.map((c) => (
            <BarRow key={c.id} label={c.title} value={courseQuizAvg(c.id, quizResults) ?? 0} color={c.color || '#054e46'} />
          ))}
        </ChartCard>

        <ChartCard title="Course Completion Rates" sub="Completed lessons vs total modules">
          {courses.map((c) => {
            const p = courseProgress(c.id, completedLessons);
            return <BarRow key={c.id} label={`${c.title} (${p.done}/${p.total})`} value={p.pct} color={c.color || '#0d9488'} />;
          })}
        </ChartCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <ChartCard title="Topic Strengths" sub=">= 80% Strong • 60-79% Average • < 60% Needs Focus">
          <div style={{ display: 'grid', gap: 10 }}>
            {quizzes.map((q) => {
              const r = quizResults[q.id];
              if (!r) return null;
              const s = topicStatus(r.pct);
              return (
                <div
                  key={q.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 13,
                    padding: '8px 12px',
                    background: '#f8faf9',
                    borderRadius: 10,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {q.topic} <span style={{ color: 'var(--text-muted)' }}>({r.pct}%)</span>
                  </span>
                  <span
                    className="vx-badge"
                    style={{
                      background: s === 'Strong' ? '#d1fae5' : s === 'Average' ? '#fef3c7' : '#ffe4e6',
                      color: s === 'Strong' ? '#059669' : s === 'Average' ? '#d97706' : '#e11d48',
                    }}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Topics Needing Review" sub="Scores under 60% marked for revision">
          {weak.length === 0 ? (
            <div style={{ color: '#059669', fontWeight: 600, fontSize: 14 }}>All topics are strong! No weak areas identified 🎉</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {weak.map((w) => (
                <div key={w.quizId} style={{ padding: 12, border: '1px solid var(--border-color)', borderRadius: 12 }}>
                  <strong style={{ fontSize: 14, color: '#0c2621' }}>{w.course}</strong>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 8px' }}>
                    Topic: {w.topic} • Score: {w.score}%
                  </div>
                  <Link to={`/quizzes/${w.quizId}`} className="vx-btn vx-btn-teal" style={{ padding: '4px 12px', fontSize: 12 }}>
                    Review Topic Quiz
                  </Link>
                </div>
              ))}
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
