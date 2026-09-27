import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const INITIAL_POSTS = [
  {
    id: 'p1',
    author: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    role: 'Student • Java DSA',
    time: '2 hours ago',
    title: 'How do you optimize Dijkstra algorithm using priority queues in Java?',
    body: 'I am struggling with the time complexity of the sparse graph case in problem 4. Any tips on using custom comparator vs Comparable?',
    likes: 14,
    tags: ['Java', 'Algorithms', 'Graphs'],
  },
  {
    id: 'p2',
    author: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    role: 'Student • Web Dev',
    time: '5 hours ago',
    title: 'React 19 Actions vs useEffect for form submissions',
    body: 'Just migrated our course project to React 19 useActionState. It drastically reduced boilerplate and handles pending states cleanly.',
    likes: 29,
    tags: ['React', 'Frontend', 'WebDev'],
  },
  {
    id: 'p3',
    author: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    role: 'Student • Database Systems',
    time: '1 day ago',
    title: 'Study Group: Database Normalization (3NF & BCNF) Quiz Prep',
    body: 'Anyone interested in a weekend study session before the DB Quiz on October 18? Drop a reply and I will share the Google Meet link.',
    likes: 38,
    tags: ['DBMS', 'StudyGroup', 'QuizPrep'],
  },
];

const INITIAL_COMMENTS = {
  p1: [
    {
      id: 'c1',
      author: 'Vikram Seth',
      role: 'Student',
      time: '1 hour ago',
      text: 'Use PriorityQueue with Comparator.comparingInt(node -> node.dist). That guarantees O(E log V) in Java.',
    },
    {
      id: 'c2',
      author: 'Mass Karthiekyan',
      role: 'Student',
      time: '45 mins ago',
      text: 'Also make sure you check if the current distance is already greater than the recorded dist before expanding neighbors.',
    },
  ],
  p2: [
    {
      id: 'c3',
      author: 'Elena Rostova',
      role: 'Student',
      time: '3 hours ago',
      text: 'Agree 100%! Pair it with useOptimistic for instant UI feedback without waiting for server response.',
    },
  ],
  p3: [
    {
      id: 'c4',
      author: 'Karthik Rao',
      role: 'Student',
      time: '18 hours ago',
      text: 'Count me in! What time on Saturday are you planning?',
    },
  ],
};

const STUDY_CIRCLES = [
  { id: 'sc1', name: 'Java Algorithms Sprint', members: '248 students', tag: 'Java' },
  { id: 'sc2', name: 'Full-Stack React Club', members: '412 students', tag: 'React' },
  { id: 'sc3', name: 'Database Systems Group', members: '185 students', tag: 'DBMS' },
  { id: 'sc4', name: 'ML Paper Readers', members: '130 students', tag: 'Algorithms' },
];

export default function Community() {
  const { user, notify } = useApp();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [commentsMap, setCommentsMap] = useState(INITIAL_COMMENTS);
  const [openComments, setOpenComments] = useState({ p1: true });
  const [commentInputs, setCommentInputs] = useState({});
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const [joinedCircles, setJoinedCircles] = useState({ sc1: true });

  const toggleLike = (id) => {
    const isLiked = !!likedPosts[id];
    setLikedPosts((prev) => ({ ...prev, [id]: !isLiked }));
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: Math.max(0, p.likes + (isLiked ? -1 : 1)) } : p))
    );
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newId = `p-${Date.now()}`;
    const newEntry = {
      id: newId,
      author: user?.name || 'Mass Karthiekyan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      role: 'Student',
      time: 'Just now',
      title: newTitle,
      body: newBody,
      likes: 0,
      tags: ['Discussion'],
    };

    setPosts([newEntry, ...posts]);
    setCommentsMap((prev) => ({ ...prev, [newId]: [] }));
    setNewTitle('');
    setNewBody('');
    notify('Discussion post published to community!');
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: user?.name || 'Mass Karthiekyan',
      role: 'Student',
      time: 'Just now',
      text,
    };

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    notify('Comment added to discussion!');
  };

  const toggleJoinCircle = (circle) => {
    const isJoined = !!joinedCircles[circle.id];
    setJoinedCircles((prev) => ({ ...prev, [circle.id]: !isJoined }));
    notify(isJoined ? `Left ${circle.name}` : `Joined ${circle.name}!`);
  };

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()))
    : posts;

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto' }}>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Student Community & Forums</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Ask questions, collaborate on coursework, form study groups, and learn together.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 330px', gap: 24 }}>
        {/* Left Column: Posts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Active Tag Filter Banner */}
          {selectedTag && (
            <div
              className="vx-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: '#e6f4f1',
                border: '1px solid #bce3db',
              }}
            >
              <div style={{ fontSize: 13, color: '#042f2e', fontWeight: 600 }}>
                Filtering posts for: <span className="vx-badge vx-badge-teal">#{selectedTag}</span>
              </div>
              <button
                className="vx-btn vx-btn-white"
                style={{ fontSize: 12, padding: '4px 10px' }}
                onClick={() => setSelectedTag(null)}
              >
                Clear Filter ✕
              </button>
            </div>
          )}

          {/* Create Post Card */}
          <div className="vx-card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Start a New Discussion</h3>
            <form onSubmit={handlePost}>
              <input
                className="search-input-box"
                style={{ width: '100%', borderRadius: 10, marginBottom: 10 }}
                placeholder="Topic or question title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="search-input-box"
                rows="3"
                style={{ width: '100%', borderRadius: 10, marginBottom: 12, resize: 'vertical' }}
                placeholder="Share details, code snippets, or describe your problem..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
              <button className="vx-btn vx-btn-teal" type="submit" disabled={!newTitle.trim() || !newBody.trim()}>
                Publish Post
              </button>
            </form>
          </div>

          {/* Posts Feed */}
          {filteredPosts.map((p) => {
            const hasLiked = !!likedPosts[p.id];
            const pComments = commentsMap[p.id] || [];
            const isOpen = !!openComments[p.id];

            return (
              <div key={p.id} className="vx-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <img
                    src={p.avatar}
                    alt={p.author}
                    style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: 14, color: '#0c2621' }}>{p.author}</strong>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {p.role} • {p.time}
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0c2621', marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: '#3b524d', lineHeight: 1.5, marginBottom: 14 }}>{p.body}</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {p.tags.map((t) => (
                    <button
                      key={t}
                      className="vx-badge vx-badge-teal"
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={() => setSelectedTag(t === selectedTag ? null : t)}
                      title={`Filter posts by #${t}`}
                    >
                      #{t}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 16, borderTop: '1px solid var(--border-light)', paddingTop: 12, alignItems: 'center' }}>
                  <button
                    onClick={() => toggleLike(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color: hasLiked ? '#0d9488' : 'var(--text-muted)',
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    <span>{hasLiked ? '❤️' : '🤍'}</span>
                    <span>{p.likes} Likes</span>
                  </button>

                  <button
                    onClick={() => toggleComments(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color: isOpen ? '#054e46' : 'var(--text-muted)',
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    <span>💬</span>
                    <span>{pComments.length} Comments {isOpen ? '▲' : '▼'}</span>
                  </button>
                </div>

                {/* Expandable Comments Thread */}
                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--border-light)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                      {pComments.length > 0 ? (
                        pComments.map((c) => (
                          <div
                            key={c.id}
                            style={{
                              background: '#f8faf9',
                              padding: '10px 12px',
                              borderRadius: 10,
                              fontSize: 13,
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                              <strong style={{ fontSize: 12, color: '#0c2621' }}>{c.author}</strong>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.time}</span>
                            </div>
                            <div style={{ color: '#3b524d', lineHeight: 1.4 }}>{c.text}</div>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          No comments yet. Be the first to reply!
                        </div>
                      )}
                    </div>

                    {/* Add Comment Input */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        className="search-input-box"
                        style={{ flex: 1, borderRadius: 8, fontSize: 12.5 }}
                        placeholder="Write a constructive reply..."
                        value={commentInputs[p.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [p.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddComment(p.id);
                          }
                        }}
                      />
                      <button
                        className="vx-btn vx-btn-teal"
                        style={{ fontSize: 12, padding: '6px 14px' }}
                        onClick={() => handleAddComment(p.id)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Trending Topics & Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="vx-card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0c2621', marginBottom: 12 }}>
              Active Study Circles
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {STUDY_CIRCLES.map((g) => {
                const joined = !!joinedCircles[g.id];
                const isActive = selectedTag?.toLowerCase() === g.tag.toLowerCase();

                return (
                  <div
                    key={g.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: isActive ? '#e6f4f1' : '#f8faf9',
                      border: `1px solid ${isActive ? '#0d9488' : 'var(--border-light)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div
                      style={{ cursor: 'pointer', flex: 1 }}
                      onClick={() => setSelectedTag(isActive ? null : g.tag)}
                      title={`Filter posts by #${g.tag}`}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0c2621' }}>{g.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {g.members} • #{g.tag}
                      </div>
                    </div>
                    <button
                      className={`vx-btn ${joined ? 'vx-btn-white' : 'vx-btn-teal'}`}
                      style={{ fontSize: 11, padding: '4px 10px', marginLeft: 8 }}
                      onClick={() => toggleJoinCircle(g)}
                    >
                      {joined ? 'Joined ✓' : 'Join'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="vx-card" style={{ padding: 20, background: '#f4f9f7' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#054e46', marginBottom: 6 }}>Community Guidelines</h3>
            <p style={{ fontSize: 12, color: '#557570', lineHeight: 1.45 }}>
              Be respectful, support fellow learners, avoid sharing direct exam answers, and format code clearly with backticks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
