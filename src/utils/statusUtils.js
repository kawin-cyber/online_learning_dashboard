// Centralized Status Badge Styles
export function getStatusStyle(status) {
  const norm = (status || '').toLowerCase();
  switch (norm) {
    case 'pending':
      return {
        bg: '#fef3c7',
        text: '#d97706',
        border: '#fde68a',
        label: 'Pending',
      };
    case 'submitted':
      return {
        bg: '#d1fae5',
        text: '#059669',
        border: '#a7f3d0',
        label: 'Submitted',
      };
    case 'graded':
      return {
        bg: '#dcfce7',
        text: '#16a34a',
        border: '#86efac',
        label: 'Graded',
      };
    case 'overdue':
      return {
        bg: '#ffe4e6',
        text: '#e11d48',
        border: '#fecdd3',
        label: 'Overdue',
      };
    case 'completed':
      return {
        bg: '#d1fae5',
        text: '#059669',
        border: '#a7f3d0',
        label: 'Completed',
      };
    case 'in progress':
    case 'in_progress':
      return {
        bg: '#e0f2fe',
        text: '#0284c7',
        border: '#bae6fd',
        label: 'In Progress',
      };
    case 'not started':
    case 'not_started':
      return {
        bg: '#f1f5f9',
        text: '#64748b',
        border: '#e2e8f0',
        label: 'Not Started',
      };
    default:
      return {
        bg: '#f1f5f9',
        text: '#64748b',
        border: '#e2e8f0',
        label: status || 'Unknown',
      };
  }
}

// Reusable course search logic
export function filterCoursesByQuery(coursesList, query) {
  if (!query || !query.trim()) return coursesList;
  const q = query.trim().toLowerCase();
  return coursesList.filter((c) => {
    const titleMatch = (c.title || '').toLowerCase().includes(q);
    const subtitleMatch = (c.subtitle || '').toLowerCase().includes(q);
    const descMatch = (c.description || '').toLowerCase().includes(q);
    const instructorMatch = (c.instructor || '').toLowerCase().includes(q);
    const categoryMatch = (c.category || '').toLowerCase().includes(q);
    const shortMatch = (c.short || '').toLowerCase().includes(q);
    const modulesMatch = (c.modules || []).some((m) => m.toLowerCase().includes(q));
    return titleMatch || subtitleMatch || descMatch || instructorMatch || categoryMatch || shortMatch || modulesMatch;
  });
}
