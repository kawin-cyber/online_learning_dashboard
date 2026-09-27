import { Link } from 'react-router-dom';

export default function QuizCard({ quiz, course, best }) {
  return (
    <div className="vx-card hoverable" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621', marginBottom: 2 }}>{quiz.title}</h3>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {course?.title || 'General'} • {quiz.topic}
          </div>
        </div>
        <span className="vx-badge vx-badge-teal">{quiz.questions ? quiz.questions.length : 5} Qs</span>
      </div>

      <div style={{ fontSize: 13, color: '#3b524d', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span>⏱ {quiz.timeLimit || 15} mins</span>
        <span>
          {best != null ? (
            <span style={{ color: '#059669', fontWeight: 700 }}>Best Score: {best}%</span>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>Not attempted</span>
          )}
        </span>
      </div>

      <Link
        to={`/quizzes/${quiz.id}`}
        className="vx-btn vx-btn-teal"
        style={{ marginTop: 'auto', textAlign: 'center' }}
      >
        {best != null ? 'Retake Quiz →' : 'Attempt Quiz →'}
      </Link>
    </div>
  );
}
