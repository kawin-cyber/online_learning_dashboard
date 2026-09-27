import { courses } from '../data/courses';
import { lessons } from '../data/lessons';
import { assignments } from '../data/assignments';
import { quizzes } from '../data/quizzes';

export const topicStatus = (score) => {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Average';
  return 'Weak';
};

export function courseProgress(courseId, completedLessons) {
  const norm = courseId === 'java-dsa' ? 'ds' : courseId === 'web-dev' ? 'web' : courseId === 'database-systems' ? 'dbms' : courseId === 'machine-learning' ? 'cn' : courseId;
  const list = lessons.filter((l) => l.courseId === norm);
  const total = list.length || 1;
  const done = list.filter((l) => (completedLessons || []).includes(l.id)).length;
  return { done, total, pct: Math.round((done / total) * 100) };
}

export function overallProgress(completedLessons) {
  if (!lessons.length) return 0;
  return Math.round(((completedLessons || []).length / lessons.length) * 100);
}

export function averageQuizScore(quizResults) {
  const vals = Object.values(quizResults || {});
  if (!vals.length) return 0;
  const sum = vals.reduce((s, r) => s + (r.pct ?? 0), 0);
  return Math.round(sum / vals.length);
}

export function courseQuizAvg(courseId, quizResults) {
  const norm = courseId === 'java-dsa' ? 'ds' : courseId === 'web-dev' ? 'web' : courseId === 'database-systems' ? 'dbms' : courseId === 'machine-learning' ? 'cn' : courseId;
  const list = quizzes.filter((q) => q.courseId === norm);
  const scored = list
    .map((q) => quizResults?.[q.id]?.pct)
    .filter((v) => typeof v === 'number');
  if (!scored.length) return null;
  return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
}


export function pendingAssignments(assignmentStatus) {
  return assignments.filter((a) => (assignmentStatus?.[a.id] || 'Pending') === 'Pending').length;
}

export function weakTopics(quizResults) {
  return quizzes
    .map((q) => {
      const r = quizResults?.[q.id];
      if (!r) return null;
      return {
        quizId: q.id,
        courseId: q.courseId,
        course: courses.find((c) => c.id === q.courseId)?.title || q.courseId,
        topic: q.topic,
        score: r.pct,
        status: topicStatus(r.pct),
      };
    })
    .filter((t) => t && t.status === 'Weak')
    .sort((a, b) => a.score - b.score);
}

export function recommendations({ completedLessons, quizResults, assignmentStatus }) {
  const recs = [];
  weakTopics(quizResults)
    .slice(0, 2)
    .forEach((w) =>
      recs.push({
        id: `rec-weak-${w.quizId}`,
        icon: '🎯',
        title: `Review ${w.topic}`,
        body: `${w.course}: your recent score is ${w.score}%. Revisit the lesson, then retake the quiz.`,
        link: `/quizzes/${w.quizId}`,
        cta: 'Review Topic',
      })
    );
  courses.forEach((c) => {
    const p = courseProgress(c.id, completedLessons);
    if (p.pct > 0 && p.pct < 70 && recs.length < 4) {
      recs.push({
        id: `rec-progress-${c.id}`,
        icon: '📚',
        title: `Continue ${c.title}`,
        body: `You have completed ${p.pct}% of this course. Finish the next module to stay on track.`,
        link: `/courses/${c.id}`,
        cta: 'Continue Learning',
      });
    }
  });
  const dueSoon = assignments.find(
    (a) => (assignmentStatus?.[a.id] || 'Pending') === 'Pending'
  );
  if (dueSoon && recs.length < 5) {
    const course = courses.find((c) => c.id === dueSoon.courseId);
    recs.push({
      id: `rec-assign-${dueSoon.id}`,
      icon: '📝',
      title: `Complete ${dueSoon.title}`,
      body: `${course?.title || ''} • Due ${dueSoon.dueDate}. Submit early to avoid a last-minute rush.`,
      link: '/assignments',
      cta: 'View Assignment',
    });
  }
  return recs.slice(0, 4);
}

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', lessons: 3, quizzes: 1, minutes: 95 },
  { day: 'Tue', lessons: 2, quizzes: 0, minutes: 60 },
  { day: 'Wed', lessons: 4, quizzes: 2, minutes: 130 },
  { day: 'Thu', lessons: 1, quizzes: 1, minutes: 45 },
  { day: 'Fri', lessons: 3, quizzes: 1, minutes: 110 },
  { day: 'Sat', lessons: 5, quizzes: 2, minutes: 160 },
  { day: 'Sun', lessons: 2, quizzes: 0, minutes: 70 },
];
