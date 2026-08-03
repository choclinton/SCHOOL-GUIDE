import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../lib/supabase';

const REGIONS = ['Centre', 'Littoral', 'Southwest', 'Northwest', 'West', 'Far North', 'North', 'Adamawa', 'East', 'South'];

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [region, setRegion] = useState('Centre');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { data, error: err } = await signUpUser({ email, password, fullName, school, region });
    setLoading(false);

    if (err) {
      const msg = err.message ? err.message.toLowerCase() : '';
      if (err.status === 429 || msg.includes('rate limit') || msg.includes('too many requests')) {
        setError('Supabase Signup Rate Limit Exceeded (Too Many Requests). Supabase limits rapid signups to prevent spam. Please wait a minute, or click below for instant Demo mode.');
      } else {
        setError(err.message);
      }
    } else if (data?.session) {
      localStorage.setItem('userSession', JSON.stringify(data.user));
      window.location.href = '/orientation-quiz';
    } else if (data?.user) {
      setMessage('Account created successfully! Please check your inbox to confirm your email address before signing in, or proceed to the orientation quiz below.');
    }
  };

  const handleDemoLogin = () => {
    const mockUser = { id: 'demo-student-id', email: email || 'demo@student.cm', user_metadata: { full_name: fullName || 'Demo Student', school, region } };
    localStorage.setItem('userSession', JSON.stringify(mockUser));
    window.location.href = '/orientation-quiz';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1.5rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '460px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>IT Pathway CM</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Create your student account</p>
        </div>

        {error && (
          <div style={{ background: '#FCE8E6', border: '1px solid #F5C2C0', color: '#A8322D', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {error}
            <div style={{ marginTop: '0.75rem' }}>
              <button type="button" onClick={handleDemoLogin} className="btn btn-outline btn-sm" style={{ borderColor: '#A8322D', color: '#A8322D', width: '100%' }}>
                Start Instant Student Orientation Quiz
              </button>
            </div>
          </div>
        )}

        {message && (
          <div style={{ background: '#E8F0E6', border: '1px solid #C5D8C1', color: '#2D5028', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {message}
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              <Link to="/orientation-quiz" className="btn btn-primary btn-sm">Take Orientation Quiz Now</Link>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
            </div>
          </div>
        )}

        {!message && (
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Marie-Claire N."
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.cm"
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>School/University</label>
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                minLength={6}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account & Start Quiz'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
