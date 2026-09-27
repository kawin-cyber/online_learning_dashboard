import { useState } from 'react';
import { demoStudent } from '../data/students';
import { KEYS, readJSON, writeJSON } from '../utils/localStorage';
import { useApp } from '../context/AppContext.jsx';

export default function Profile() {
  const { user, login, notify } = useApp();
  const [profile, setProfile] = useState(() => ({
    ...demoStudent,
    name: user?.name || demoStudent.name,
    ...readJSON(KEYS.PROFILE, {}),
  }));
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    writeJSON(KEYS.PROFILE, profile);
    login({ ...user, name: profile.name, email: profile.email });
    setEditing(false);
    setSaved(true);
    notify('Profile updated successfully');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 24 }}>Student Profile</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Manage your personal details, academic progress, and account settings.</p>
        </div>
        {!editing ? (
          <button className="vx-btn vx-btn-teal" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="vx-btn vx-btn-teal" onClick={save}>
              Save Changes
            </button>
            <button className="vx-btn vx-btn-white" style={{ border: '1px solid var(--border-color)' }} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '12px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, marginBottom: 20 }}>
          ✓ Profile saved to local storage!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
        {/* Left Column: Avatar & Overview */}
        <div className="vx-card" style={{ textAlign: 'center', padding: 28 }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #0d9488', margin: '0 auto 16px' }}
          />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0c2621', marginBottom: 2 }}>{profile.name}</h2>
          <div style={{ fontSize: 13, color: '#557570', marginBottom: 16 }}>{profile.email}</div>

          <span className="vx-badge vx-badge-teal" style={{ fontSize: 12, padding: '4px 12px', marginBottom: 20 }}>
            {profile.department} • {profile.semester}
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left', background: '#f4f9f7', padding: 16, borderRadius: 14, fontSize: 12, marginTop: 12 }}>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Student ID</div>
              <strong style={{ color: '#0c2621' }}>{profile.studentId}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Joined</div>
              <strong style={{ color: '#0c2621' }}>{profile.joined}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>College</div>
              <strong style={{ color: '#0c2621' }}>{profile.college}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Status</div>
              <strong style={{ color: '#059669' }}>Active Student</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Details Form */}
        <div className="vx-card" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Account Information</h3>

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Full Name</label>
              <input
                className="search-input-box"
                style={{ width: '100%', borderRadius: 10 }}
                disabled={!editing}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email Address</label>
                <input
                  className="search-input-box"
                  style={{ width: '100%', borderRadius: 10 }}
                  disabled={!editing}
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Phone Number</label>
                <input
                  className="search-input-box"
                  style={{ width: '100%', borderRadius: 10 }}
                  disabled={!editing}
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Department</label>
                <input
                  className="search-input-box"
                  style={{ width: '100%', borderRadius: 10 }}
                  disabled={!editing}
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Semester</label>
                <input
                  className="search-input-box"
                  style={{ width: '100%', borderRadius: 10 }}
                  disabled={!editing}
                  value={profile.semester}
                  onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Bio / Learning Goal</label>
              <textarea
                rows="3"
                className="search-input-box"
                style={{ width: '100%', borderRadius: 10, resize: 'vertical' }}
                disabled={!editing}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
