import React, { useState, useEffect } from 'react';

const REGIONS = ['Centre', 'Littoral', 'Southwest', 'Northwest', 'West', 'Far North', 'North', 'Adamawa', 'East', 'South'];
const TRACKS = ['Web Development', 'Mobile App Development', 'Cybersecurity', 'Data / AI', 'DevOps & Cloud'];

const UserProfile = ({ user, onUpdateUser }) => {
  const [fullName, setFullName] = useState('');
  const [school, setSchool] = useState('');
  const [region, setRegion] = useState('Centre');
  const [targetTrack, setTargetTrack] = useState('Web Development');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setFullName(meta.full_name || user.email?.split('@')[0] || '');
      setSchool(meta.school || '');
      setRegion(meta.region || 'Centre');
      setTargetTrack(meta.target_track || 'Web Development');
      setBio(meta.bio || 'IT student in Cameroon passionate about technology.');
      setAvatar(meta.avatar || localStorage.getItem(`user_avatar_${user.id}`) || '');
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setAvatar(base64Image);
      if (user?.id) {
        localStorage.setItem(`user_avatar_${user.id}`, base64Image);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      user_metadata: {
        ...user?.user_metadata,
        full_name: fullName,
        school,
        region,
        target_track: targetTrack,
        bio,
        avatar
      }
    };

    localStorage.setItem('userSession', JSON.stringify(updatedUser));
    if (onUpdateUser) onUpdateUser(updatedUser);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Student Profile</h1>
        <p>Manage your account details, school info, regional location, and profile picture.</p>
      </div>

      {savedSuccess && (
        <div style={{ background: '#E8F0E6', border: '1px solid #C5D8C1', color: '#2D5028', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
          Profile updated successfully.
        </div>
      )}

      <div className="grid-2" style={{ gap: '1.5rem' }}>
        {/* Profile Card Preview */}
        <div className="card" style={{ textAlign: 'center', height: 'fit-content' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border)', background: 'var(--card-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {avatar ? (
              <img src={avatar} alt="Profile Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                {fullName ? fullName[0].toUpperCase() : 'S'}
              </span>
            )}
          </div>

          <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary)' }}>{fullName || 'Student Name'}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>{user?.email}</div>
          <span className="badge badge-muted" style={{ marginTop: '0.5rem' }}>{region} &middot; {school || 'University'}</span>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic', lineHeight: 1.6 }}>
            "{bio}"
          </p>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Change Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '0.8rem' }} />
          </div>
        </div>

        {/* Edit Form */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>
            Edit Personal Details
          </div>

          <form onSubmit={handleSaveProfile}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>School / University</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. FET Buea, ICT-U"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none', background: 'white' }}
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Target Career Track</label>
              <select
                value={targetTrack}
                onChange={(e) => setTargetTrack(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none', background: 'white' }}
              >
                {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Personal Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Profile Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
