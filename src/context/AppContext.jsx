import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { KEYS, readJSON, writeJSON } from '../utils/localStorage';

function seedIfEmpty() {
  if (!localStorage.getItem(KEYS.COMPLETED_LESSONS)) {
    writeJSON(KEYS.COMPLETED_LESSONS, [
      'ds-l1', 'ds-l2', 'ds-l3',
      'dbms-l1', 'dbms-l2',
      'web-l1', 'web-l2', 'web-l3', 'web-l4', 'web-l5',
      'cn-l1',
      'oop-l1', 'oop-l2', 'oop-l3',
      'se-l1', 'se-l2',
    ]);
  }
  if (!localStorage.getItem(KEYS.QUIZ_RESULTS)) {
    writeJSON(KEYS.QUIZ_RESULTS, {
      'ds-q1': { score: 4, total: 5, pct: 80, date: '2026-09-18' },
      'ds-q2': { score: 2, total: 5, pct: 40, date: '2026-09-19' },
      'dbms-q1': { score: 5, total: 5, pct: 100, date: '2026-09-17' },
      'web-q1': { score: 5, total: 5, pct: 100, date: '2026-09-16' },
      'web-q2': { score: 4, total: 5, pct: 80, date: '2026-09-18' },
      'cn-q1': { score: 2, total: 5, pct: 40, date: '2026-09-15' },
      'oop-q1': { score: 4, total: 5, pct: 80, date: '2026-09-17' },
      'se-q1': { score: 4, total: 5, pct: 80, date: '2026-09-19' },
    });
  }
  if (!localStorage.getItem(KEYS.ASSIGNMENT_STATUS)) {
    writeJSON(KEYS.ASSIGNMENT_STATUS, {
      'ds-a1': 'Graded', 'dbms-a1': 'Graded', 'web-a1': 'Graded',
      'cn-a1': 'Submitted', 'oop-a1': 'Submitted', 'se-a1': 'Submitted',
      'ds-a2': 'Pending', 'dbms-a2': 'Pending', 'web-a2': 'Pending',
      'cn-a2': 'Overdue',
    });
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readJSON(KEYS.USER, { name: 'Mass Karthiekyan', email: 'karthiekyan@example.com', role: 'Student' }));
  const [completedLessons, setCompletedLessons] = useState(() => readJSON(KEYS.COMPLETED_LESSONS, []));
  const [quizResults, setQuizResults] = useState(() => readJSON(KEYS.QUIZ_RESULTS, {}));
  const [assignmentStatus, setAssignmentStatus] = useState(() => readJSON(KEYS.ASSIGNMENT_STATUS, {}));
  const [theme, setTheme] = useState(() => readJSON(KEYS.THEME, 'light'));
  const [readNotifications, setReadNotifications] = useState(() => readJSON(KEYS.NOTIFICATIONS_READ, []));
  const [toasts, setToasts] = useState([]);

  const notify = (message, tone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };

  useEffect(() => {
    seedIfEmpty();
    setCompletedLessons(readJSON(KEYS.COMPLETED_LESSONS, []));
    setQuizResults(readJSON(KEYS.QUIZ_RESULTS, {}));
    setAssignmentStatus(readJSON(KEYS.ASSIGNMENT_STATUS, {}));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeJSON(KEYS.THEME, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      user,
      login: (u) => {
        setUser(u);
        writeJSON(KEYS.USER, u);
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(KEYS.USER);
      },
      completedLessons,
      toggleLesson: (id) =>
        setCompletedLessons((prev) => {
          const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
          writeJSON(KEYS.COMPLETED_LESSONS, next);
          return next;
        }),
      markLessonComplete: (id) => {
        setCompletedLessons((prev) => {
          if (prev.includes(id)) return prev;
          const next = [...prev, id];
          writeJSON(KEYS.COMPLETED_LESSONS, next);
          return next;
        });
        notify('Lesson marked complete — progress updated');
      },
      quizResults,
      saveQuizResult: (quizId, result) =>
        setQuizResults((prev) => {
          const prevBest = prev[quizId]?.pct ?? -1;
          const next = {
            ...prev,
            [quizId]:
              result.pct >= prevBest
                ? { ...result, attempts: (prev[quizId]?.attempts || 0) + 1 }
                : { ...prev[quizId], attempts: (prev[quizId]?.attempts || 0) + 1 },
          };
          writeJSON(KEYS.QUIZ_RESULTS, next);
          return next;
        }),
      assignmentStatus,
      setAssignment: (id, status) => {
        setAssignmentStatus((prev) => {
          const next = { ...prev, [id]: status };
          writeJSON(KEYS.ASSIGNMENT_STATUS, next);
          return next;
        });
        notify(`Assignment marked ${status}`);
      },
      theme,
      notify,
      toasts,
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
      setTheme,
      readNotifications,
      markNotificationRead: (id) =>
        setReadNotifications((prev) => {
          const next = prev.includes(id) ? prev : [...prev, id];
          writeJSON(KEYS.NOTIFICATIONS_READ, next);
          return next;
        }),
      markAllNotificationsRead: (ids) => {
        setReadNotifications(ids);
        writeJSON(KEYS.NOTIFICATIONS_READ, ids);
      },
    }),
    [user, completedLessons, quizResults, assignmentStatus, theme, readNotifications, toasts]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>{t.message}</div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
