import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blueprints } from '../data/mockData';

const BlueprintSelection = () => {
  return (
    <div>
      <div className="page-header">
        <h1>Career Blueprints</h1>
        <p>Select the track that fits your interests and goals. Each blueprint defines the exact skills, tools, scholarships, and proof of work required to become job-ready.</p>
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
            <span className="btn btn-outline btn-sm" style={{ textAlign: 'center', width: '100%' }}>
              View Blueprint
            </span>
          </Link>
        ))}
      </div>

      <div className="card card-subtle" style={{ marginTop: '1.5rem' }}>
        <div style={{ fontWeight: 600, marginBottom: '0.35rem' }}>How blueprints work</div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Each blueprint is split into four layers: <strong>Foundation</strong> (durable skills that will never go out of date), <strong>Platform Tools</strong> (current industry-standard tools with review dates), <strong>Supporting Skills</strong> (cross-cutting knowledge), and a <strong>Proof of Work</strong> requirement. Click each skill to mark it complete and track your readiness percentage.
        </p>
      </div>
    </div>
  );
};

export default BlueprintSelection;
