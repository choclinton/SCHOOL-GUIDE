import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Onboarding = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>IT Pathway CM</div>
        {user ? (
          <Link to="/dashboard" className="btn btn-primary btn-sm">Go to Dashboard</Link>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Create Account</Link>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
            Cameroonian IT Career Guidance Platform
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Understand what to learn.<br />Build the career you want.
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            IT Pathway CM guides students from foundation skills to job-ready specialization with structured blueprints, local mentors, and scholarship opportunities.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            )}
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', gap: '2.5rem', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            {[
              { n: '5', label: 'Career Blueprints' },
              { n: '6+', label: 'Scholarship Grants' },
              { n: '5+', label: 'Mentor Networks' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{stat.n}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
