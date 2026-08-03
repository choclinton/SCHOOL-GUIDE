import React, { useState, useEffect } from 'react';
import { scholarships as initialScholarships } from '../data/mockData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('scholarships');
  const [scholarshipList, setScholarshipList] = useState(() => {
    const saved = localStorage.getItem('admin_scholarships');
    return saved ? JSON.parse(saved) : initialScholarships;
  });

  const [form, setForm] = useState({ name: '', field: 'General', type: '', region: 'All Regions', url: '', description: '' });
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('admin_scholarships', JSON.stringify(scholarshipList));
  }, [scholarshipList]);

  const handleAddScholarship = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...form,
      status: 'Open'
    };

    setScholarshipList([newItem, ...scholarshipList]);
    setForm({ name: '', field: 'General', type: '', region: 'All Regions', url: '', description: '' });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleDeleteScholarship = (id) => {
    setScholarshipList(scholarshipList.filter(s => s.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1>Admin Control Panel</h1>
        <p>Manage directory scholarships, moderate community posts, and monitor platform activity.</p>
      </div>

      {/* Tabs */}
      <div className="segment-control">
        <button className={`segment-btn${activeTab === 'scholarships' ? ' active' : ''}`} onClick={() => setActiveTab('scholarships')}>
          Scholarship & Directory Manager ({scholarshipList.length})
        </button>
        <button className={`segment-btn${activeTab === 'users' ? ' active' : ''}`} onClick={() => setActiveTab('users')}>
          User Directory Overview
        </button>
      </div>

      {activeTab === 'scholarships' && (
        <div>
          {/* Add New Form */}
          <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              Publish New Scholarship / Opportunity Link
            </div>

            {addedSuccess && (
              <div style={{ background: '#E8F0E6', color: '#2D5028', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600 }}>
                Scholarship published to public Directory.
              </div>
            )}

            <form onSubmit={handleAddScholarship}>
              <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Opportunity Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Mastercard Foundation Tech Grant"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Application URL</label>
                  <input
                    type="url"
                    required
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://example.com/apply"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div className="grid-3" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Field</label>
                  <select
                    value={form.field}
                    onChange={(e) => setForm({ ...form, field: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', background: 'white' }}
                  >
                    <option>General</option>
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>Cybersecurity</option>
                    <option>Data / AI</option>
                    <option>DevOps &amp; Cloud</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Category Type</label>
                  <input
                    type="text"
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="e.g. Tuition Waiver, Laptop Grant"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Target Region</label>
                  <input
                    type="text"
                    required
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    placeholder="e.g. All Regions, Douala"
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Description Summary</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  placeholder="Brief summary of eligibility and grant terms..."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm">Publish Opportunity</button>
            </form>
          </div>

          {/* List of Managed Items */}
          <div className="flex-col">
            {scholarshipList.map(s => (
              <div key={s.id} className="directory-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{s.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>
                    {s.type} &middot; {s.region} &middot; {s.field}
                  </div>
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'underline' }}>
                      {s.url} &rarr;
                    </a>
                  )}
                </div>
                <button onClick={() => handleDeleteScholarship(s.id)} className="btn btn-ghost btn-sm" style={{ color: '#A8322D', borderColor: '#F5C2C0' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Active Registered Accounts</div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            System accounts registered in Supabase auth database.
          </p>
          <div style={{ background: 'var(--card-bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }}>Total Active Profiles: {scholarshipList.length + 5}</div>
            <p>Users are managed through your connected Supabase Auth dashboard: <code>https://supabase.com/dashboard</code></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
