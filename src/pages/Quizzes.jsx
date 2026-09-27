import { useState } from 'react';
import { courses } from '../data/courses';
import { quizzes } from '../data/quizzes';
import { useApp } from '../context/AppContext.jsx';
import QuizCard from '../components/QuizCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Quizzes() {
  const { quizResults } = useApp();
  const [q, setQ] = useState('');
  const list = quizzes.filter(
    (z) => !q.trim() || z.title.toLowerCase().includes(q.toLowerCase()) || z.topic.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Interactive Quizzes</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Test your topic knowledge with timed quizzes — results link directly into performance analytics.
          </p>
        </div>
      </div>

      <div className="vx-card" style={{ marginBottom: 24, padding: 16 }}>
        <div className="search-input-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search quizzes by title or topic..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search quizzes"
          />
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState title="No quizzes found" message="Try searching for another keyword or clear the search input." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {list.map((z) => (
            <QuizCard
              key={z.id}
              quiz={z}
              course={courses.find((c) => c.id === z.courseId)}
              best={quizResults[z.id]?.pct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
