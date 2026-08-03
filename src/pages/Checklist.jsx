import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { foundationAreas, resources } from '../data/mockData';

const Checklist = () => {
  const [scores, setScores] = useState({});
  const [manualChecks, setManualChecks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedScores = localStorage.getItem('assessmentScores');
    if (savedScores) setScores(JSON.parse(savedScores));
    const savedChecks = localStorage.getItem('manualChecks');
    if (savedChecks) setManualChecks(JSON.parse(savedChecks));
  }, []);

  const toggleCheck = (areaId) => {
    const newChecks = { ...manualChecks, [areaId]: !manualChecks[areaId] };
    setManualChecks(newChecks);
    localStorage.setItem('manualChecks', JSON.stringify(newChecks));
  };

  const getStatus = (areaId) => {
    if (scores[areaId] >= 1) return 'Passed';
    if (manualChecks[areaId]) return 'Completed';
    return 'Needs Work';
  };

  const passedCount = foundationAreas.filter(a => getStatus(a.id) !== 'Needs Work').length;
  const allClear = passedCount === foundationAreas.length;
  const pct = Math.round((passedCount / foundationAreas.length) * 100);

  return (
    <div>
      <div className="page-header">
        <h1>Your Foundation Checklist</h1>
        <p>Review your gaps, study the linked resources, and mark each area complete to unlock Career Blueprints.</p>
      </div>

      {/* Progress card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 700 }}>Overall Progress</span>
          <span style={{ fontWeight: 700, color: allClear ? '#5A8A52' : 'var(--primary)', fontSize: '1.1rem' }}>{pct}%</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: `${pct}%`, background: allClear ? '#5A8A52' : 'var(--primary)' }}></div>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
          {passedCount} of {foundationAreas.length} areas cleared
        </div>
      </div>

      {/* Items */}
      <div className="card" style={{ padding: 0 }}>
        {foundationAreas.map((area, idx) => {
          const status = getStatus(area.id);
          const isNeedsWork = status === 'Needs Work';

          return (
            <div
              key={area.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.1rem 1.25rem',
                borderBottom: idx < foundationAreas.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Status Indicator */}
              <div style={{
                width: '24px', height: '24px',
                borderRadius: 'var(--radius-sm)',
                background: isNeedsWork ? 'var(--card-bg-subtle)' : '#E8F0E6',
                border: `1px solid ${isNeedsWork ? 'var(--border)' : '#C5D8C1'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isNeedsWork ? 'var(--text-muted)' : '#5A8A52',
                fontSize: '0.85rem',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '0.1rem'
              }}>
                {isNeedsWork ? '' : '✓'}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{area.title}</div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isNeedsWork ? '#FCE8E6' : '#E8F0E6',
                  color: isNeedsWork ? '#A8322D' : '#5A8A52',
                  border: `1px solid ${isNeedsWork ? '#F5C2C0' : '#C5D8C1'}`,
                }}>
                  {status}
                </span>

                {isNeedsWork && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Recommended free resources:</div>
                    {resources[area.id].map((res, i) => (
                      <a key={i} href={res.url} target="_blank" rel="noreferrer"
                        style={{ display: 'inline-block', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'underline', marginBottom: '0.25rem' }}>
                        {res.title}
                      </a>
                    ))}
                    <div style={{ marginTop: '0.65rem' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => toggleCheck(area.id)}>
                        Mark as Complete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unlock Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          className={`btn btn-lg ${allClear ? 'btn-primary' : 'btn-ghost'}`}
          disabled={!allClear}
          onClick={() => navigate('/blueprint-selection')}
        >
          {allClear ? 'Continue to Blueprints' : 'Complete all areas to unlock Blueprints'}
        </button>
        {allClear && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            All foundation areas cleared. You are ready to choose a career track.
          </p>
        )}
      </div>
    </div>
  );
};

export default Checklist;
