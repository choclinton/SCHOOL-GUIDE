import React, { useState } from 'react';
import { teamRoles } from '../data/mockData';

const TeamFormation = () => {
  const [expandedRole, setExpandedRole] = useState(null);
  const [coveredRoles, setCoveredRoles] = useState({});

  const toggleCover = (id) => setCoveredRoles(prev => ({ ...prev, [id]: !prev[id] }));

  const coveredCount = Object.values(coveredRoles).filter(Boolean).length;
  const missingCount = teamRoles.length - coveredCount;

  return (
    <div>
      <div className="page-header">
        <h1>Team Formation</h1>
        <p>Building a tech company requires more than technical skill. Assess your team's current coverage and identify which roles are missing.</p>
      </div>

      {/* Self-Assessment */}
      <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)' }}>
        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Step 1 — Role Self-Assessment</div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Check the roles that you or your current co-founders can confidently cover.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
          {teamRoles.map(role => (
            <label key={role.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-sm)', background: coveredRoles[role.id] ? 'var(--primary-light)' : 'var(--card-bg-subtle)', border: '1px solid var(--border)', transition: 'all 0.15s' }}>
              <input
                type="checkbox"
                checked={!!coveredRoles[role.id]}
                onChange={() => toggleCover(role.id)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', flexShrink: 0 }}
              />
              <span style={{ fontSize: '0.87rem', fontWeight: coveredRoles[role.id] ? 600 : 400, color: 'var(--text-primary)' }}>{role.name.split('/')[0].trim()}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="badge badge-durable">{coveredCount} role{coveredCount !== 1 ? 's' : ''} covered</span>
          {missingCount > 0 && <span className="badge badge-trending">{missingCount} role{missingCount !== 1 ? 's' : ''} missing</span>}
        </div>
      </div>

      {/* Role Library */}
      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>Step 2 — Role Library</div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Click any role (especially missing ones) to understand why it matters and where to find the right person.</p>

      <div className="flex-col">
        {teamRoles.map(role => {
          const isExpanded = expandedRole === role.id;
          const isCovered = coveredRoles[role.id];

          return (
            <div key={role.id} className="card" style={{ padding: 0, overflow: 'hidden', borderLeft: `3px solid ${isCovered ? '#5A8A52' : '#C9A65A'}` }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', cursor: 'pointer' }}
                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{role.name}</div>
                  <span className={`badge ${isCovered ? 'badge-durable' : 'badge-trending'}`}>
                    {isCovered ? 'Covered' : 'Missing'}
                  </span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '1.1rem' }}>{isExpanded ? '−' : '+'}</span>
              </div>
              {isExpanded && (
                <div style={{ padding: '1rem 1.25rem', background: 'var(--card-bg-subtle)', borderTop: '1px solid var(--border)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                  <p style={{ marginBottom: '0.65rem' }}><strong>Why it matters:</strong> {role.why}</p>
                  <p style={{ marginBottom: '0.65rem', color: '#7A4A30' }}><strong>Common gap:</strong> {role.commonGap}</p>
                  <p><strong>Where to find them:</strong> {role.whereToFind}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamFormation;
