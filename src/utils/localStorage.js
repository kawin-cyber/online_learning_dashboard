export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export const KEYS = {
  USER: 'studentDashboardUser',
  COMPLETED_LESSONS: 'completedLessons',
  QUIZ_RESULTS: 'quizResults',
  ASSIGNMENT_STATUS: 'assignmentStatus',
  PROFILE: 'profileData',
  THEME: 'theme',
  NOTIFICATIONS_READ: 'notificationsRead',
  SETTINGS: 'appSettings',
};
