import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { quizById } from '../data/quizzes';
import { getCourse } from '../data/courses';
import { useApp } from '../context/AppContext.jsx';

export default function QuizAttempt() {
  const { quizId } = useParams();
  const quiz = quizById(quizId);
  const { saveQuizResult, quizResults, notify } = useApp();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const result = useMemo(() => {
    if (!submitted || !quiz) return null;
    let correct = 0;
    quiz.questions.forEach((qq, i) => {
      if (answers[i] === qq.answer) correct++;
    });
    return {
      score: correct,
      total: quiz.questions.length,
      pct: Math.round((correct / quiz.questions.length) * 100),
    };
  }, [submitted, quiz, answers]);

  if (!quiz) {
    return (
      <div className="vx-card" style={{ textAlign: 'center', padding: 40 }}>
        <h2>Quiz not found</h2>
        <Link to="/quizzes" className="vx-btn vx-btn-teal" style={{ marginTop: 12 }}>
          Back to Quizzes
        </Link>
      </div>
    );
  }

  const course = getCourse(quiz.courseId);
  const current = quiz.questions[idx];

  const submit = () => {
    let correct = 0;
    quiz.questions.forEach((qq, i) => {
      if (answers[i] === qq.answer) correct++;
    });
    const r = {
      score: correct,
      total: quiz.questions.length,
      pct: Math.round((correct / quiz.questions.length) * 100),
      date: new Date().toISOString().slice(0, 10),
    };
    saveQuizResult(quiz.id, r);
    setSubmitted(true);
    notify(`Quiz submitted — score: ${r.pct}%`);
  };

  if (submitted && result) {
    const msg =
      result.pct >= 80
        ? 'Excellent performance! 🎉'
        : result.pct >= 60
        ? 'Good effort — review the topics below. 💪'
        : 'Needs review — revisit the lesson and retry. 📚';

    return (
      <div className="vx-card" style={{ maxWidth: 680, margin: '20px auto', padding: 32, textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0c2621' }}>
          Quiz Result: {result.score} / {result.total}
        </h1>
        <div style={{ fontSize: 56, fontWeight: 800, color: '#054e46', margin: '10px 0' }}>{result.pct}%</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
          Correct Answers: <strong>{result.score}</strong> • Incorrect: <strong>{result.total - result.score}</strong>
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#3b524d', marginBottom: 24 }}>{msg}</p>

        <div style={{ textAlign: 'left', display: 'grid', gap: 12, marginBottom: 24 }}>
          {quiz.questions.map((qq, i) => {
            const ok = answers[i] === qq.answer;
            return (
              <div
                key={i}
                style={{
                  background: ok ? '#f0fdf4' : '#fff1f2',
                  border: `1px solid ${ok ? '#a7f3d0' : '#fecdd3'}`,
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0c2621', marginBottom: 4 }}>
                  Q{i + 1}. {qq.q}
                </div>
                <div style={{ fontSize: 13, color: ok ? '#059669' : '#e11d48' }}>
                  Your answer: {answers[i] != null ? qq.options[answers[i]] : 'None'} {ok ? '✓ Correct' : '✗ Incorrect'}
                </div>
                {!ok && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    Correct answer: <strong>{qq.options[qq.answer]}</strong> — {qq.explain}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="vx-btn vx-btn-white"
            style={{ border: '1px solid var(--border-color)' }}
            onClick={() => {
              setSubmitted(null);
              setIdx(0);
              setAnswers({});
            }}
          >
            Retake Quiz
          </button>
          <Link to="/analytics" className="vx-btn vx-btn-teal">
            Open Analytics
          </Link>
          <Link to={`/courses/${quiz.courseId}`} className="vx-btn vx-btn-white" style={{ border: '1px solid var(--border-color)' }}>
            Review Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="vx-card" style={{ maxWidth: 720, margin: '20px auto', padding: 32 }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
        {course?.title || 'Course'} • {quiz.title}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0c2621' }}>
          Question {idx + 1} of {quiz.questions.length}
        </h2>
        <span className="vx-badge vx-badge-teal">⏱ Timed Quiz</span>
      </div>

      <div className="vx-progress-track" style={{ marginBottom: 20 }}>
        <div className="vx-progress-fill" style={{ width: `${((idx + 1) / quiz.questions.length) * 100}%`, background: '#054e46' }} />
      </div>

      <p style={{ fontSize: 16, fontWeight: 700, color: '#0c2621', marginBottom: 16 }}>{current.q}</p>

      <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
        {current.options.map((op, i) => (
          <label
            key={i}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              border: `1.5px solid ${answers[idx] === i ? '#054e46' : 'var(--border-color)'}`,
              background: answers[idx] === i ? '#eaf5f2' : '#ffffff',
              borderRadius: 12,
              padding: '12px 16px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 14,
              transition: 'all 0.15s',
            }}
          >
            <input
              type="radio"
              name={`q-${idx}`}
              checked={answers[idx] === i}
              onChange={() => setAnswers({ ...answers, [idx]: i })}
              style={{ accentColor: '#054e46', width: 16, height: 16 }}
            />
            <span>{op}</span>
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="vx-btn vx-btn-white"
          style={{ border: '1px solid var(--border-color)' }}
          disabled={idx === 0}
          onClick={() => setIdx(idx - 1)}
        >
          ← Previous
        </button>

        {idx < quiz.questions.length - 1 ? (
          <button className="vx-btn vx-btn-teal" onClick={() => setIdx(idx + 1)}>
            Next Question →
          </button>
        ) : (
          <button className="vx-btn vx-btn-teal" onClick={submit}>
            Submit Quiz
          </button>
        )}
      </div>

      {quizResults[quiz.id] && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, textAlign: 'center' }}>
          Previous best score: <strong>{quizResults[quiz.id].pct}%</strong>
        </div>
      )}
    </div>
  );
}
