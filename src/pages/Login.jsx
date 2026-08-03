import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser, isSupabaseConfigured } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: err } = await signInUser({ email, password });
    setLoading(false);

    if (err) {
      const msg = err.message.toLowerCase();
      if (msg.includes('invalid login credentials') || msg.includes('invalid_grant')) {
        setError("Invalid email or password. If you haven't created an account yet, please click 'Create Account' below.");
      } else if (msg.includes('email not confirmed')) {
        setError('Email not confirmed. Please check your inbox for the confirmation link, or disable email confirmation in your Supabase Auth settings.');
      } else {
        setError(err.message);
      }
    } else if (data?.user) {
      localStorage.setItem('userSession', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1.5rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>IT Pathway CM</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Sign in to your account</p>
        </div>

        {!isSupabaseConfigured && (
          <div style={{ background: 'var(--card-bg-subtle)', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Connected in offline mode.
          </div>
        )}

        {error && (
          <div style={{ background: '#FCE8E6', border: '1px solid #F5C2C0', color: '#A8322D', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account yet? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
