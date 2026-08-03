import React, { useState, useEffect } from 'react';
import { scholarships as defaultScholarships, mentors } from '../data/mockData';

const FIELDS = ['All', 'General', 'Web Development', 'Mobile App Development', 'Cybersecurity', 'Data / AI', 'DevOps & Cloud'];

const Directory = () => {
  const [activeTab, setActiveTab] = useState('scholarships');
  const [filterField, setFilterField] = useState('All');
  const [scholarshipList, setScholarshipList] = useState([]);

  useEffect(() => {
    const savedAdminItems = localStorage.getItem('admin_scholarships');
    if (savedAdminItems) {
      setScholarshipList(JSON.parse(savedAdminItems));
    } else {
      setScholarshipList(defaultScholarships);
    }
  }, []);

  const filteredScholarships = scholarshipList.filter(s =>
    filterField === 'All' || s.field === filterField || s.field === 'General'
  );

  const filteredMentors = mentors.filter(m =>
    filterField === 'All' || m.focus.toLowerCase().includes(filterField.split(' ')[0].toLowerCase()) || m.focus.includes('General')
  );

  return (
    <div>
      <div className="page-header">
        <h1>Opportunities Directory</h1>
        <p>Verified scholarship links, hardware grants, cloud credit access, and local Cameroonian mentor networks.</p>
      </div>

      <div className="segment-control">
        <button className={`segment-btn${activeTab === 'scholarships' ? ' active' : ''}`} onClick={() => setActiveTab('scholarships')}>
          Scholarships &amp; Grants ({filteredScholarships.length})
        </button>
        <button className={`segment-btn${activeTab === 'mentors' ? ' active' : ''}`} onClick={() => setActiveTab('mentors')}>
          Mentors &amp; Hubs ({filteredMentors.length})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter by specialization:</label>
          <select
            value={filterField}
            onChange={e => setFilterField(e.target.value)}
            style={{ padding: '0.45rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
          >
            {FIELDS.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* Scholarships Tab */}
      {activeTab === 'scholarships' && (
        <div className="flex-col">
          {filteredScholarships.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
              No scholarships match this filter. Try selecting "All".
            </div>
          ) : filteredScholarships.map(s => (
            <div key={s.id} className="directory-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>{s.name}</div>
                <span className="badge badge-muted">{s.status}</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                {s.type} &middot; {s.region} &middot; Track: {s.field}
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                {s.description}
              </p>

              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  Apply on Official Portal &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mentors Tab */}
      {activeTab === 'mentors' && (
        <div className="flex-col">
          {filteredMentors.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
              No mentor networks match this filter.
            </div>
          ) : filteredMentors.map(m => (
            <div key={m.id} className="directory-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>{m.name}</div>
                <span className="badge badge-muted">{m.region}</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Category: {m.type}
              </div>

              <div style={{ fontSize: '0.88rem', marginBottom: '0.85rem' }}>
                <strong>Focus:</strong> {m.focus}
              </div>

              {m.url && (
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  Visit Community Website &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
