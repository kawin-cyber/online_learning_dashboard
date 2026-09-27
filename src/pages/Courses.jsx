import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { lessonsByCourse } from '../data/lessons';
import { assignmentsByCourse } from '../data/assignments';
import { quizzesByCourse } from '../data/quizzes';
import { useApp } from '../context/AppContext.jsx';
import CourseCard from '../components/CourseCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { courseProgress } from '../utils/analytics';
import { filterCoursesByQuery } from '../utils/statusUtils';

export default function Courses() {
  const { completedLessons } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlFilter = searchParams.get('filter') || 'All';
  const urlQuery = searchParams.get('search') || '';

  const [q, setQ] = useState(urlQuery);
  const [filter, setFilter] = useState(urlFilter);
  const [sort, setSort] = useState('Progress');

  useEffect(() => {
    const f = searchParams.get('filter');
    if (f) setFilter(f);
  }, [searchParams]);

  const list = useMemo(() => {
    // 1. Calculate actual progress per course
    let base = courses.map((c) => ({
      c,
      p: courseProgress(c.id, completedLessons),
    }));

    // 2. Filter by search query (case-insensitive across title, category, instructor, etc.)
    if (q.trim()) {
      const matchedCourses = filterCoursesByQuery(courses, q);
      const matchedIds = new Set(matchedCourses.map((c) => c.id));
      base = base.filter(({ c }) => matchedIds.has(c.id));
    }

    // 3. Filter by status
    if (filter === 'In Progress') {
      base = base.filter(({ p }) => p.pct > 0 && p.pct < 100);
    } else if (filter === 'Completed') {
      base = base.filter(({ p }) => p.pct === 100);
    } else if (filter === 'Not Started') {
      base = base.filter(({ p }) => p.pct === 0);
    }

    // 4. Sort
    base.sort((a, b) => {
      if (sort === 'Title') {
        return a.c.title.localeCompare(b.c.title);
      }
      return b.p.pct - a.p.pct;
    });

    return base;
  }, [q, filter, sort, completedLessons]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set('filter', newFilter);
      return p;
    });
  };

  const handleReset = () => {
    setQ('');
    setFilter('All');
    setSearchParams({});
  };

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>My Courses</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Browse enrolled courses, filter by progress status, and continue your learning.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="vx-card" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24, padding: 16 }}>
        <div className="search-input-box" style={{ flex: '2 1 240px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search by title, instructor, category, or module…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search courses"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 700, padding: '0 4px', cursor: 'pointer' }}
            >
              ✕
            </button>
          )}
        </div>

        <select
          className="search-input-box"
          style={{ flex: '1 1 150px', cursor: 'pointer' }}
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          aria-label="Filter courses"
        >
          {['All', 'In Progress', 'Completed', 'Not Started'].map((f) => (
            <option key={f} value={f}>
              Status: {f}
            </option>
          ))}
        </select>

        <select
          className="search-input-box"
          style={{ flex: '1 1 150px', cursor: 'pointer' }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort courses"
        >
          {['Progress', 'Title'].map((s) => (
            <option key={s} value={s}>
              Sort by: {s}
            </option>
          ))}
        </select>
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="No courses found"
          message={`No courses match your filter criteria (${filter}${q ? `, search: "${q}"` : ''}).`}
          action={
            <button className="vx-btn vx-btn-teal" onClick={handleReset}>
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="my-courses-grid">
          {list.map(({ c, p }) => (
            <CourseCard
              key={c.id}
              course={{
                ...c,
                lessons: lessonsByCourse(c.id).length,
                assignments: assignmentsByCourse(c.id).length,
                quizzes: quizzesByCourse(c.id).length,
              }}
              progress={p}
            />
          ))}
        </div>
      )}
    </div>
  );
}
