import { Link } from 'react-router-dom';
import { getStatusStyle } from '../utils/statusUtils.js';

export function toneFor(status) {
  if (status === 'Graded' || status === 'Submitted') return 'success';
  if (status === 'Overdue') return 'danger';
  return 'warning';
}

export default function AssignmentRow({ a, course, status }) {
  const badge = getStatusStyle(status);

  return (
    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
      <td style={{ padding: '14px 16px' }}>
        <strong style={{ color: '#0c2621', fontSize: 14 }}>{a.title}</strong>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{course?.title || 'General'}</div>
      </td>
      <td style={{ padding: '14px 16px', fontSize: 13, color: '#3b524d' }}>{a.dueDate}</td>
      <td style={{ padding: '14px 16px' }}>
        <span
          className="vx-badge"
          style={{
            background: badge.bg,
            color: badge.text,
            border: `1px solid ${badge.border}`,
          }}
        >
          {status}
        </span>
      </td>
      <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600 }}>{a.totalMarks} pts</td>
      <td style={{ padding: '14px 16px' }}>
        <Link
          to={`/assignments?view=${a.id}`}
          className="vx-btn vx-btn-teal"
          style={{ padding: '6px 14px', fontSize: 12 }}
        >
          View Details
        </Link>
      </td>
    </tr>
  );
}
