import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { assignments, assignmentById } from '../data/assignments';
import { courses } from '../data/courses';
import { useApp } from '../context/AppContext.jsx';
import AssignmentRow from '../components/AssignmentCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Modal from '../components/Modal.jsx';
import { getStatusStyle } from '../utils/statusUtils.js';

export default function Assignments() {
  const { assignmentStatus, setAssignment } = useApp();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const viewing = params.get('view');

  const list = useMemo(() => {
    return assignments.filter((a) => {
      const st = assignmentStatus[a.id] || 'Pending';
      if (filter !== 'All' && st !== filter) return false;
      if (q.trim() && !a.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [filter, q, assignmentStatus]);

  const detail = viewing ? assignmentById(viewing) : null;

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Assignments & Submissions</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Track assignment deadlines, view grades, and submit coursework.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="vx-card" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24, padding: 16 }}>
        <div className="search-input-box" style={{ flex: '2 1 240px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search assignments…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search assignments"
          />
        </div>

        <select
          className="search-input-box"
          style={{ flex: '1 1 160px', cursor: 'pointer' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter assignments"
        >
          {['All', 'Pending', 'Submitted', 'Graded', 'Overdue'].map((s) => (
            <option key={s} value={s}>
              Status: {s}
            </option>
          ))}
        </select>
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="No assignments found"
          message="You're all caught up on assignments for this filter!"
          action={
            <button
              className="vx-btn vx-btn-teal"
              onClick={() => {
                setQ('');
                setFilter('All');
              }}
            >
              Show All Assignments
            </button>
          }
        />
      ) : (
        <div className="vx-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f4f9f7', borderBottom: '1px solid var(--border-color)', fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Assignment Title</th>
                <th style={{ padding: '12px 16px' }}>Due Date</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Total Marks</th>
                <th style={{ padding: '12px 16px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <AssignmentRow
                  key={a.id}
                  a={a}
                  course={courses.find((c) => c.id === a.courseId)}
                  status={assignmentStatus[a.id] || 'Pending'}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assignment Details Modal */}
      {detail && (
        <Modal title={detail.title} onClose={() => setParams({})}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
            Due: <strong>{detail.dueDate}</strong> • Total Marks: <strong>{detail.totalMarks}</strong>
          </div>
          <p style={{ fontSize: 14, color: '#3b524d', lineHeight: 1.5, marginBottom: 16 }}>{detail.brief}</p>

          <div style={{ marginBottom: 16 }}>
            {(() => {
              const currentSt = assignmentStatus[detail.id] || 'Pending';
              const badge = getStatusStyle(currentSt);
              return (
                <span
                  className="vx-badge"
                  style={{
                    background: badge.bg,
                    color: badge.text,
                    border: `1px solid ${badge.border}`,
                    fontSize: 13,
                    padding: '6px 12px',
                  }}
                >
                  Current Status: {currentSt}
                </span>
              );
            })()}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className="vx-btn vx-btn-teal"
              onClick={() => {
                setAssignment(detail.id, 'Submitted');
              }}
            >
              Submit Assignment Now
            </button>
            <button className="vx-btn vx-btn-white" style={{ border: '1px solid var(--border-color)' }} onClick={() => setParams({})}>
              Close Window
            </button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
            Submissions auto-save state to browser local storage.
          </div>
        </Modal>
      )}
    </div>
  );
}
