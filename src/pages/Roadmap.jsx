import React from 'react';
import { Link } from 'react-router-dom';
import { blueprints } from '../data/mockData';

// Roadmap now redirects to Blueprint View — it's the same concept.
const Roadmap = () => {
  return (
    <div>
      <div className="page-header">
        <h1>Career Roadmaps</h1>
        <p>Select a career track below to view your detailed skill roadmap with lessons and sandboxes.</p>
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
              <span className="badge badge-muted">{bp.lessons.length} Lessons</span>
            </div>
            <span className="btn btn-outline btn-sm" style={{ width: '100%', textAlign: 'center' }}>View Roadmap</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
