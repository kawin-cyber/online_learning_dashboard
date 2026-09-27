import { useState } from 'react';
import { calendarEvents } from '../data/calendarEvents';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarWidget({ selectedDate, onSelectDate }) {
  // Default to September 2026 (or parse from selectedDate if provided)
  const initialDate = selectedDate ? new Date(selectedDate) : new Date(2026, 8, 24); // Sept 24, 2026
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear() || 2026);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth() ?? 8);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Days calculation
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayCells = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    dayCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    dayCells.push(d);
  }

  // Pre-calculate dates with events for dot indicator
  const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const datesWithEvents = new Set(
    calendarEvents
      .filter((e) => e.date.startsWith(monthPrefix))
      .map((e) => parseInt(e.date.split('-')[2], 10))
  );

  const handleDayClick = (day) => {
    if (!day) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (onSelectDate) {
      onSelectDate(dateStr);
    }
  };

  return (
    <div className="calendar-widget">
      <style>{`
        .calendar-widget {
          padding: 6px 0 16px;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 0 4px;
        }

        .calendar-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-main);
          user-select: none;
        }

        .calendar-nav-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--text-main);
          background: #f1f5f3;
          border: 1px solid var(--border-color);
          cursor: pointer;
          font-size: 13px;
          font-weight: bold;
          transition: background 0.15s, transform 0.15s;
        }

        .calendar-nav-btn:hover {
          background: #e2ede9;
          transform: scale(1.05);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          row-gap: 6px;
          column-gap: 2px;
        }

        .calendar-weekday {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          padding-bottom: 6px;
        }

        .calendar-day-cell {
          height: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #3b524d;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          transition: all 0.15s;
          user-select: none;
        }

        .calendar-day-cell:hover:not(.empty) {
          background: #e2ede9;
        }

        .calendar-day-cell.selected {
          background: #054e46 !important;
          color: #ffffff !important;
          box-shadow: 0 2px 8px rgba(5, 78, 70, 0.35);
        }

        .calendar-day-cell.empty {
          cursor: default;
        }

        .event-dot {
          position: absolute;
          bottom: 2px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0d9488;
        }

        .calendar-day-cell.selected .event-dot {
          background: #a7f3d0;
        }
      `}</style>

      {/* Calendar Header with working month/year navigation */}
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={prevMonth}
          aria-label="Previous Month"
        >
          ‹
        </button>
        <span className="calendar-title">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={nextMonth}
          aria-label="Next Month"
        >
          ›
        </button>
      </div>

      {/* Days of Week and Days Grid */}
      <div className="calendar-grid">
        {weekdays.map((w) => (
          <div key={w} className="calendar-weekday">
            {w}
          </div>
        ))}

        {dayCells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="calendar-day-cell empty" />;
          }

          const cellDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === cellDateStr;
          const hasEvent = datesWithEvents.has(day);

          return (
            <div
              key={day}
              className={`calendar-day-cell ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span>{day}</span>
              {hasEvent && <span className="event-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
