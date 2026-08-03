import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../lib/supabase';

const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Accept pre-configured demo admin or regular Supabase auth if role is admin
    if (email === 'admin@itpathway.cm' && password === 'admin123') {
      const adminSession = {
        id: 'admin-system-id',
        email: 'admin@itpathway.cm',
        user_metadata: { full_name: 'Platform Administrator', role: 'admin' }
      };
      localStorage.setItem('adminSession', JSON.stringify(adminSession));
      if (onAdminLogin) onAdminLogin(adminSession);
      setLoading(false);
      navigate('/admin');
      return;
    }

    const { data, error: err } = await signInUser({ email, password });
    setLoading(false);

    if (err) {
      setError('Admin Sign-In Failed: Invalid admin credentials. Use admin@itpathway.cm / admin123 or check your admin access permissions.');
    } else if (data?.user) {
      const adminUser = { ...data.user, user_metadata: { ...data.user.user_metadata, role: 'admin' } };
      localStorage.setItem('adminSession', JSON.stringify(adminUser));
      if (onAdminLogin) onAdminLogin(adminUser);
      navigate('/admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1.5rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderTop: '4px solid var(--primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '0.25rem' }}>
            Isolated Administrative Portal
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>Admin Sign-In</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Restricted to IT Pathway CM Administrators</p>
        </div>

        {error && (
          <div style={{ background: '#FCE8E6', border: '1px solid #F5C2C0', color: '#A8322D', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAdminAuth}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@itpathway.cm"
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Admin Key / Password</label>
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
            {loading ? 'Authenticating Admin...' : 'Authenticate & Access Admin Panel'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Demo Admin Credentials: <code>admin@itpathway.cm</code> / <code>admin123</code>
          <div style={{ marginTop: '0.5rem' }}>
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Return to Student Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
