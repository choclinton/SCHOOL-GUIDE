import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blueprints } from '../data/mockData';

// CareerMatches is now replaced by the Blueprint Selection flow
const CareerMatches = () => {
  const navigate = useNavigate();
  const scores = JSON.parse(localStorage.getItem('assessmentScores') || '{}');

  return (
    <div>
      <div className="page-header">
        <h1>Career Match Results</h1>
        <p>Based on your foundation assessment, here are the career tracks available to you. Choose one to explore the full blueprint.</p>
      </div>

      <div className="grid-auto">
        {blueprints.map(bp => (
          <Link
            key={bp.id}
            to={`/blueprint/${bp.id}`}
            className="blueprint-card"
            onClick={() => localStorage.setItem('activeBlueprintId', bp.id)}
          >
            <div className="bp-title">{bp.title}</div>
            <div className="bp-fit">"{bp.fit}"</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge badge-muted">Hardware: {bp.hardware.level}</span>
            </div>
            <span className="btn btn-outline btn-sm" style={{ width: '100%', textAlign: 'center' }}>Explore Blueprint</span>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => {
          localStorage.removeItem('assessmentScores');
          navigate('/assessment');
        }}>
          Retake Assessment
        </button>
      </div>
    </div>
  );
};

export default CareerMatches;
