import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Assessment from './pages/Assessment';
import Checklist from './pages/Checklist';
import BlueprintSelection from './pages/BlueprintSelection';
import BlueprintView from './pages/BlueprintView';
import Directory from './pages/Directory';
import TeamFormation from './pages/TeamFormation';
import Dashboard from './pages/Dashboard';
import StudyPartners from './pages/StudyPartners';
import CommunityForum from './pages/CommunityForum';
import GroupGuide from './pages/GroupGuide';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import CareerQuiz from './pages/CareerQuiz';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { getCurrentSession, signOutUser } from './lib/supabase';

// Regular Student Navigation Items
const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', badge: 'D' },
  { path: '/orientation-quiz', label: 'Career Quiz', badge: 'Q' },
  { path: '/blueprint-selection', label: 'Blueprints', badge: 'B' },
  { path: '/forum', label: 'Community Forum', badge: 'F' },
  { path: '/collaboration-guide', label: 'Group Guide', badge: 'G' },
  { path: '/directory', label: 'Directory', badge: 'R' },
  { path: '/team', label: 'Team Formation', badge: 'T' },
  { path: '/partners', label: 'Study Partners', badge: 'S' },
  { path: '/profile', label: 'My Profile', badge: 'P' },
];

const Sidebar = ({ user, onLogout, isCollapsed, onToggleCollapse }) => {
  const avatar = user?.user_metadata?.avatar || localStorage.getItem(`user_avatar_${user?.id}`);
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';

  return (
    <aside className={`sidebar${isCollapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-brand">
        {!isCollapsed && (
          <div>
            <div className="sidebar-brand-name">IT Pathway CM</div>
            <div className="sidebar-brand-sub">Career Guidance Platform</div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="sidebar-toggle-btn"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!isCollapsed && <div className="sidebar-section-label">Student Menu</div>}
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="sidebar-link-badge">{item.badge}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user && !isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--sidebar-active)', border: '1px solid var(--sidebar-text)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF7F2', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
              {avatar ? (
                <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                userName[0].toUpperCase()
              )}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#FAF7F2', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {userName}
              </div>
              <div style={{ color: 'var(--sidebar-text)', fontSize: '0.7rem' }}>Student Account</div>
            </div>
          </div>
        )}
        <button onClick={onLogout} className="btn btn-ghost btn-sm" style={{ width: '100%', color: 'var(--sidebar-text)', borderColor: 'var(--sidebar-active)', padding: isCollapsed ? '0.4rem 0' : '0.4rem 0.85rem' }}>
          {isCollapsed ? '✕' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
};

const MobileTabBar = () => (
  <nav className="mobile-tabbar">
    <div className="mobile-tabbar-inner">
      {NAV_ITEMS.slice(0, 5).map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `mobile-tab${isActive ? ' active' : ''}`}
        >
          {item.label.split(' ')[0]}
        </NavLink>
      ))}
    </div>
  </nav>
);

const ProtectedLayout = ({ children, user, onLogout, isCollapsed, onToggleCollapse }) => {
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout">
      <Sidebar user={user} onLogout={onLogout} isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
      <main className={`main-content${isCollapsed ? ' sidebar-collapsed' : ''}`}>
        {children}
      </main>
      <MobileTabBar />
    </div>
  );
};

import LessonView from './pages/LessonView';

function App() {

  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  useEffect(() => {
    const cachedSession = localStorage.getItem('userSession');
    if (cachedSession) setUser(JSON.parse(cachedSession));

    const cachedAdmin = localStorage.getItem('adminSession');
    if (cachedAdmin) setAdminUser(JSON.parse(cachedAdmin));

    getCurrentSession().then(userData => {
      if (userData) {
        setUser(userData);
        localStorage.setItem('userSession', JSON.stringify(userData));
      }
      setLoading(false);
    });
  }, []);

  const handleToggleSidebar = () => {
    const nextState = !isSidebarCollapsed;
    setIsSidebarCollapsed(nextState);
    localStorage.setItem('sidebar_collapsed', String(nextState));
  };

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
    localStorage.removeItem('userSession');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminSession');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>Loading platform...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/orientation-quiz" replace /> : <Signup />} />
        
        {/* Dedicated Isolated Admin Routes */}
        <Route path="/admin-login" element={adminUser ? <Navigate to="/admin" replace /> : <AdminLogin onAdminLogin={(u) => setAdminUser(u)} />} />
        <Route path="/admin" element={
          adminUser ? (
            <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>
                  IT Pathway CM — Isolated Admin Portal
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Logged in as: <strong>{adminUser.email}</strong></span>
                  <button onClick={handleAdminLogout} className="btn btn-ghost btn-sm">Exit Admin</button>
                </div>
              </div>
              <AdminDashboard />
            </div>
          ) : (
            <Navigate to="/admin-login" replace />
          )
        } />

        {/* Regular Protected Student Routes */}
        <Route path="/orientation-quiz" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><CareerQuiz /></ProtectedLayout>} />
        <Route path="/assessment" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><Assessment /></ProtectedLayout>} />
        <Route path="/checklist" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><Checklist /></ProtectedLayout>} />
        <Route path="/dashboard" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><Dashboard /></ProtectedLayout>} />
        <Route path="/blueprint-selection" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><BlueprintSelection /></ProtectedLayout>} />
        <Route path="/blueprint/:id" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><BlueprintView /></ProtectedLayout>} />
        <Route path="/lesson/:trackId/:lessonId" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><LessonView /></ProtectedLayout>} />
        <Route path="/directory" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><Directory /></ProtectedLayout>} />
        <Route path="/team" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><TeamFormation /></ProtectedLayout>} />
        <Route path="/partners" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><StudyPartners /></ProtectedLayout>} />
        <Route path="/forum" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><CommunityForum currentUser={user} /></ProtectedLayout>} />
        <Route path="/collaboration-guide" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><GroupGuide /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout user={user} onLogout={handleLogout} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleToggleSidebar}><UserProfile user={user} onUpdateUser={handleUpdateUser} /></ProtectedLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
