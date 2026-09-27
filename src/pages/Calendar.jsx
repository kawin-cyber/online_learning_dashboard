import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalendarWidget from '../components/CalendarWidget.jsx';
import { calendarEvents, getEventsForDate } from '../data/calendarEvents.js';

export default function CalendarPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-09-24');
  const [filterByDateOnly, setFilterByDateOnly] = useState(false);

  const displayedEvents = useMemo(() => {
    let list = calendarEvents;

    if (filterByDateOnly && selectedDate) {
      list = list.filter((e) => e.date === selectedDate);
    }

    if (selectedFilter !== 'All') {
      list = list.filter((e) => {
        if (selectedFilter === 'Class') return e.type === 'class';
        if (selectedFilter === 'Assignment') return e.type === 'assignment';
        if (selectedFilter === 'Quiz') return e.type === 'quiz';
        if (selectedFilter === 'Event') return e.type === 'event';
        return true;
      });
    }

    return list;
  }, [selectedFilter, selectedDate, filterByDateOnly]);

  const selectedDateEvents = useMemo(() => {
    return getEventsForDate(selectedDate);
  }, [selectedDate]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Learning Calendar & Schedule</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Track live lecture timings, assignment due dates, quiz milestones, and study circles.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24 }}>
        {/* Left Column: Interactive Calendar Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="vx-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621', margin: 0 }}>
                Academic Calendar
              </h3>
              {filterByDateOnly && (
                <button
                  className="vx-btn vx-btn-white"
                  style={{ fontSize: 11, padding: '3px 8px' }}
                  onClick={() => setFilterByDateOnly(false)}
                >
                  View All Dates
                </button>
              )}
            </div>

            <CalendarWidget
              selectedDate={selectedDate}
              onSelectDate={(newDate) => {
                setSelectedDate(newDate);
                setFilterByDateOnly(true);
              }}
            />

            <div style={{ background: '#f4f9f7', padding: '12px 14px', borderRadius: 12, fontSize: 12, color: '#3b524d', marginTop: 14 }}>
              💡 Selected: <strong>{selectedDate}</strong> ({selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''})
              {filterByDateOnly ? (
                <span
                  onClick={() => setFilterByDateOnly(false)}
                  style={{ color: '#0d9488', fontWeight: 600, cursor: 'pointer', marginLeft: 6 }}
                >
                  (Click to show all events)
                </span>
              ) : (
                <span
                  onClick={() => setFilterByDateOnly(true)}
                  style={{ color: '#0d9488', fontWeight: 600, cursor: 'pointer', marginLeft: 6 }}
                >
                  (Filter to this date only)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Events and Filter */}
        <div className="vx-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0c2621', margin: 0 }}>
                {filterByDateOnly ? `Events on ${selectedDate}` : 'All Semester Events'} ({displayedEvents.length})
              </h3>
              {filterByDateOnly && (
                <button
                  onClick={() => setFilterByDateOnly(false)}
                  style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 2 }}
                >
                  ← Show all upcoming events
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['All', 'Class', 'Assignment', 'Quiz', 'Event'].map((cat) => (
                <button
                  key={cat}
                  className={`vx-btn ${selectedFilter === cat ? 'vx-btn-teal' : 'vx-btn-white'}`}
                  style={{ padding: '5px 12px', fontSize: 12, border: '1px solid var(--border-color)' }}
                  onClick={() => setSelectedFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {displayedEvents.length > 0 ? (
              displayedEvents.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 14,
                    border: '1px solid var(--border-light)',
                    borderRadius: 12,
                    background: ev.date === selectedDate ? '#f0fdf9' : '#fcfdfd',
                    borderColor: ev.date === selectedDate ? '#99f6e4' : 'var(--border-light)',
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: ev.badgeColor || '#e0f2fe',
                      color: ev.iconColor || '#0284c7',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {ev.type === 'class' && '📹'}
                    {ev.type === 'assignment' && '📄'}
                    {ev.type === 'quiz' && '❓'}
                    {ev.type === 'event' && '👥'}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 14, color: '#0c2621' }}>{ev.title}</strong>
                      <span className="vx-badge vx-badge-teal" style={{ fontSize: 11 }}>
                        {ev.category}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      📅 {ev.date} • {ev.time}
                    </div>
                  </div>

                  <Link
                    to={ev.targetUrl}
                    className="vx-btn vx-btn-teal"
                    style={{ padding: '6px 14px', fontSize: 12, whiteSpace: 'nowrap' }}
                  >
                    {ev.type === 'class' ? 'Join Class →' : ev.type === 'quiz' ? 'Take Quiz →' : 'View Details →'}
                  </Link>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: 36, color: 'var(--text-muted)', fontSize: 13 }}>
                No events found matching your criteria.
                <div style={{ marginTop: 8 }}>
                  <button
                    className="vx-btn vx-btn-teal"
                    style={{ fontSize: 12 }}
                    onClick={() => {
                      setSelectedFilter('All');
                      setFilterByDateOnly(false);
                    }}
                  >
                    Show All Events
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
