import React, { useState } from 'react';

const CITIES = ['Yaoundé', 'Douala', 'Buea', 'Bamenda', 'Bafoussam', 'Ngaoundéré', 'Garoua', 'Maroua', 'Bertoua', 'Ebolowa'];
const TRACKS = ['Web Development', 'Mobile App Development', 'Cybersecurity', 'Data / AI', 'DevOps & Cloud'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const MOCK_PARTNERS = [
  { id: 1, initials: 'AK', name: 'Armand Kengne', city: 'Yaoundé', track: 'Web Development', level: 'Beginner', note: 'Looking for a study partner for HTML/CSS basics. Available evenings.' },
  { id: 2, initials: 'SN', name: 'Sandra Ngo', city: 'Douala', track: 'Data / AI', level: 'Intermediate', note: 'Working through Python for Data Science. Need weekly accountability.' },
  { id: 3, initials: 'JT', name: 'Junior Tchamba', city: 'Buea', track: 'Mobile App Development', level: 'Beginner', note: 'Starting Flutter from scratch. Anyone in Buea want to meet at ActivSpaces?' },
  { id: 4, initials: 'GF', name: 'Grace Fouda', city: 'Yaoundé', track: 'Cybersecurity', level: 'Advanced', note: 'Preparing for CompTIA Security+. Looking for a study group for practice exams.' },
  { id: 5, initials: 'PM', name: 'Patrick Mbah', city: 'Bamenda', track: 'DevOps & Cloud', level: 'Intermediate', note: 'Learning Docker and AWS. Looking for anyone with cloud experience.' },
  { id: 6, initials: 'CB', name: 'Carole Bella', city: 'Douala', track: 'Web Development', level: 'Intermediate', note: 'Building with React. Happy to pair-program via Google Meet.' },
];

const StudyPartners = () => {
  const [cityFilter, setCityFilter] = useState('All');
  const [trackFilter, setTrackFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', city: '', track: '', level: 'Beginner', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [partners, setPartners] = useState(MOCK_PARTNERS);

  const filtered = partners.filter(p =>
    (cityFilter === 'All' || p.city === cityFilter) &&
    (trackFilter === 'All' || p.track === trackFilter)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = formData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    setPartners(prev => [...prev, { ...formData, id: Date.now(), initials }]);
    setSubmitted(true);
    setShowForm(false);
    setFormData({ name: '', city: '', track: '', level: 'Beginner', note: '' });
  };

  const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', outline: 'none', background: 'white' };

  return (
    <div>
      <div className="page-header">
        <h1>Study Partner Finder</h1>
        <p>Connect with IT students in your city who are on the same learning path as you.</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>City</label>
            <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
              <option>All</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Career Track</label>
            <select value={trackFilter} onChange={e => setTrackFilter(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
              <option>All</option>
              {TRACKS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : '+ Add My Profile'}
          </button>
        </div>
      </div>

      {/* Add Profile Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)' }}>
          <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Add Your Study Partner Profile</div>
          <form onSubmit={handleSubmit}>
            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} placeholder="Your name" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>City</label>
                <select required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={inputStyle}>
                  <option value="">Select city...</option>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Career Track</label>
                <select required value={formData.track} onChange={e => setFormData({...formData, track: e.target.value})} style={inputStyle}>
                  <option value="">Select track...</option>
                  {TRACKS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Level</label>
                <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} style={inputStyle}>
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>What are you looking for?</label>
              <textarea required value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} rows={2}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder="e.g. Looking for a Python study buddy, available evenings..." />
            </div>
            <button type="submit" className="btn btn-primary">Submit Profile</button>
          </form>
        </div>
      )}

      {submitted && (
        <div style={{ background: '#E8F0E6', border: '1px solid #C5D8C1', color: '#5A8A52', padding: '0.85rem 1.1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontWeight: 600, fontSize: '0.88rem' }}>
          Your profile has been added. Other students can now find and connect with you.
        </div>
      )}

      {/* Partner Cards */}
      <div className="flex-col">
        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
            No partners found for these filters. Try broadening your search or add your profile.
          </div>
        ) : filtered.map(p => (
          <div key={p.id} className="partner-card">
            <div className="partner-avatar">{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700 }}>{p.name}</span>
                <span className="badge badge-muted">{p.level}</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                {p.city} &middot; {p.track}
              </div>
              <div style={{ fontSize: '0.88rem' }}>{p.note}</div>
            </div>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hi ${p.name}! I found you on IT Pathway CM. I'm also studying ${p.track} and would love to connect as study partners!`)}`}
              target="_blank" rel="noreferrer"
              className="btn btn-outline btn-sm"
              style={{ flexShrink: 0 }}
            >
              Connect
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPartners;
