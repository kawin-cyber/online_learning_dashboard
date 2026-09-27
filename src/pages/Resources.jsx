import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recommendedResources } from '../data/dashboardData.js';
import SafeImage from '../components/SafeImage.jsx';

const ALL_RESOURCES = [
  ...recommendedResources,
  {
    id: 'r5',
    type: 'Cheatsheet',
    title: 'SQL Queries & Joins Reference Guide',
    readTime: 'Quick Ref',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=400&q=80',
    link: '/courses',
  },
  {
    id: 'r6',
    type: 'Guide',
    title: 'React 19 & Next.js Architecture Notes',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    link: '/courses',
  },
  {
    id: 'r7',
    type: 'Book',
    title: 'Grokking Algorithms & Data Structures',
    readTime: 'PDF Book',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80',
    link: '/courses',
  },
  {
    id: 'r8',
    type: 'Video',
    title: 'Machine Learning Fundamentals & Math',
    readTime: '25 min watch',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80',
    link: '/courses',
  },
];

export default function Resources() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');

  const list = ALL_RESOURCES.filter((r) => {
    if (filter !== 'All' && r.type !== filter) return false;
    if (q.trim() && !r.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Learning Resources & Library</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Curated articles, video tutorials, cheat sheets, and downloadable study guides.
          </p>
        </div>
      </div>

      <div className="vx-card" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24, padding: 16 }}>
        <div className="search-input-box" style={{ flex: '2 1 240px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search articles, guides, books..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['All', 'Article', 'Video', 'Cheatsheet', 'Guide', 'Book'].map((type) => (
            <button
              key={type}
              className={`vx-btn ${filter === type ? 'vx-btn-teal' : 'vx-btn-white'}`}
              style={{ padding: '6px 14px', fontSize: 12, border: '1px solid var(--border-color)' }}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
        {list.map((res) => (
          <div key={res.id} className="vx-card hoverable" style={{ padding: 0, overflow: 'hidden' }}>
            <SafeImage src={res.image} alt={res.title} style={{ height: 130, width: '100%', objectFit: 'cover' }} />
            <div style={{ padding: 16 }}>
              <span className="vx-badge vx-badge-teal" style={{ marginBottom: 6 }}>
                {res.type}
              </span>
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#0c2621', margin: '4px 0 6px', lineHeight: 1.3 }}>
                {res.title}
              </h3>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>{res.readTime}</div>
              <Link to={res.link} className="vx-btn vx-btn-teal" style={{ width: '100%', fontSize: 12 }}>
                Open Material →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
