// Unified Academic Schedule and Calendar Events
// Current semester: September - October 2026

export const calendarEvents = [
  // Today: September 24, 2026
  {
    id: 'ev-1',
    date: '2026-09-24',
    title: 'Web Development: React Hooks & State',
    time: '10:00 AM - 11:30 AM',
    type: 'class',
    category: 'Class / Lecture',
    courseId: 'web',
    targetUrl: '/courses/web',
    badgeColor: '#e0f2fe',
    iconColor: '#0284c7',
    icon: 'camera',
  },
  {
    id: 'ev-2',
    date: '2026-09-24',
    title: 'SQL Queries Lab (DBMS Assignment 2)',
    time: 'Due Today · 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'dbms-a2',
    targetUrl: '/assignments?view=dbms-a2',
    badgeColor: '#fef3c7',
    iconColor: '#d97706',
    icon: 'file-text',
  },

  // Tomorrow: September 25, 2026
  {
    id: 'ev-3',
    date: '2026-09-25',
    title: 'Linked List Implementation (DSA Assignment 2)',
    time: 'Due Tomorrow · 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'ds-a2',
    targetUrl: '/assignments?view=ds-a2',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },
  {
    id: 'ev-4',
    date: '2026-09-25',
    title: 'Database Systems: SQL & Normalization Quiz',
    time: '2:00 PM - 2:30 PM',
    type: 'quiz',
    category: 'Quiz',
    quizId: 'dbms-q1',
    targetUrl: '/quizzes/dbms-q1',
    badgeColor: '#fae8ff',
    iconColor: '#a21caf',
    icon: 'help-circle',
  },

  // September 26, 2026
  {
    id: 'ev-5',
    date: '2026-09-26',
    title: 'Algorithms Sprint Peer Code Review',
    time: '4:00 PM - 5:30 PM',
    type: 'event',
    category: 'Study Group',
    targetUrl: '/community',
    badgeColor: '#d1fae5',
    iconColor: '#059669',
    icon: 'users',
  },

  // September 27, 2026
  {
    id: 'ev-6',
    date: '2026-09-27',
    title: 'JS Todo App (Web Dev Assignment 2)',
    time: 'Due 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'web-a2',
    targetUrl: '/assignments?view=web-a2',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },

  // September 28, 2026
  {
    id: 'ev-7',
    date: '2026-09-28',
    title: 'OOP: Inheritance Hierarchy Assignment',
    time: 'Due 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'oop-a2',
    targetUrl: '/assignments?view=oop-a2',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },
  {
    id: 'ev-8',
    date: '2026-09-28',
    title: 'Java DSA: Trees & Graph Traversals Lecture',
    time: '11:00 AM - 12:30 PM',
    type: 'class',
    category: 'Class / Lecture',
    courseId: 'ds',
    targetUrl: '/courses/ds',
    badgeColor: '#e0f2fe',
    iconColor: '#0284c7',
    icon: 'camera',
  },

  // September 29, 2026
  {
    id: 'ev-9',
    date: '2026-09-29',
    title: 'Sprint Planning Simulation (SE Assignment 2)',
    time: 'Due 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'se-a2',
    targetUrl: '/assignments?view=se-a2',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },

  // October 2, 2026
  {
    id: 'ev-10',
    date: '2026-10-02',
    title: 'Stacks & Queues Lab (DSA Assignment 3)',
    time: 'Due 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'ds-a3',
    targetUrl: '/assignments?view=ds-a3',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },

  // October 5, 2026
  {
    id: 'ev-11',
    date: '2026-10-05',
    title: 'DBMS Normalization Case Study',
    time: 'Due 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'dbms-a3',
    targetUrl: '/assignments?view=dbms-a3',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },

  // October 8, 2026
  {
    id: 'ev-12',
    date: '2026-10-08',
    title: 'React Dashboard UI Capstone Submission',
    time: 'Due 11:59 PM',
    type: 'assignment',
    category: 'Assignment',
    assignmentId: 'web-a3',
    targetUrl: '/assignments?view=web-a3',
    badgeColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: 'file-text',
  },
];

export const getEventsForDate = (dateStr) => {
  return calendarEvents.filter((e) => e.date === dateStr);
};

export const getEventsForMonth = (year, monthIndex) => {
  // monthIndex: 0-11
  const m = String(monthIndex + 1).padStart(2, '0');
  const prefix = `${year}-${m}`;
  return calendarEvents.filter((e) => e.date.startsWith(prefix));
};
