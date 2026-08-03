import React from 'react';
import { Link } from 'react-router-dom';
import { blueprints } from '../data/mockData';

const DAILY_CHALLENGES = [
  { blueprint: 'web', title: "Build Your First HTML Page", task: "Open any text editor, type basic HTML tags (<html>, <head>, <body>), add an <h1> tag with your name, and open it in a browser." },
  { blueprint: 'mobile', title: "Explore Android Studio", task: "Download Android Studio and create a new project. Look through the default files to get comfortable with the project layout." },
  { blueprint: 'cyber', title: "Try Nmap Command", task: "Run 'nmap localhost' in your terminal simulator to check open ports on your computer." },
  { blueprint: 'data-ai', title: "Python Data Analysis", task: "Open Google Colab and run: import pandas as pd; df = pd.read_csv('https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv'); print(df.head())" },
  { blueprint: 'devops', title: "Explore Linux File System", task: "Use the Interactive Terminal to run 'ls /', 'ls /home', and 'pwd'." }
];

const Dashboard = () => {
  const scores = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
  const checks = JSON.parse(localStorage.getItem('manualChecks') || '{}');
  const activeBp = localStorage.getItem('activeBlueprintId');
  const activeBpData = blueprints.find(b => b.id === activeBp);
  const quizResults = JSON.parse(localStorage.getItem('careerQuizResults') || '[]');

  const allSkills = activeBpData ? [...activeBpData.foundation, ...activeBpData.supportingSkills] : [];
  const roadmapProgress = JSON.parse(localStorage.getItem(`roadmapProgress_${activeBp}`) || '{}');
  const completedSkills = Object.values(roadmapProgress).filter(Boolean).length;
  const readiness = allSkills.length > 0 ? Math.round((completedSkills / (activeBpData.platformTools.length + allSkills.length)) * 100) : 0;

  const assessmentDone = Object.keys(scores).length > 0;
  const checklistDone = Object.values(checks).every(Boolean);

  const today = new Date().getDay();
  const todayChallenge = DAILY_CHALLENGES[today % DAILY_CHALLENGES.length];
  const challengeDone = localStorage.getItem('challengeDone_' + today) === 'true';

  const topMatch = quizResults.length > 0 ? quizResults[0] : null;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your current career orientation, skill assessment, and blueprint progress.</p>
      </div>

      {/* Orientation Quiz Banner if not done */}
      {!topMatch && (
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', background: 'var(--card-bg-subtle)', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '0.35rem' }}>
            New Student Orientation Recommended
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Take our 2-minute Career Matching Quiz to discover whether Web, Mobile, Cyber, Data, or DevOps best matches your personality.
          </p>
          <Link to="/orientation-quiz" className="btn btn-primary btn-sm">Start Career Orientation Quiz →</Link>
        </div>
      )}

      {/* Daily Challenge */}
      <div className="challenge-card">
        <div className="challenge-label">Daily Challenge</div>
        <div className="challenge-title">{todayChallenge.title}</div>
        <div className="challenge-text">{todayChallenge.task}</div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => { localStorage.setItem('challengeDone_' + today, 'true'); window.location.reload(); }}
          disabled={challengeDone}
        >
          {challengeDone ? 'Completed Today' : 'Mark as Done'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-label">Orientation Quiz</div>
          <div className="stat-value" style={{ fontSize: '1.2rem' }}>{topMatch ? `${topMatch.score}% Match` : 'Not Taken'}</div>
          <div className="stat-sub">{topMatch ? topMatch.title : 'Discover your track'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Blueprint</div>
          <div className="stat-value" style={{ fontSize: '1.2rem' }}>{activeBpData ? activeBpData.title : 'None'}</div>
          <div className="stat-sub">{activeBpData ? 'Selected' : 'No track selected'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Daily Tasks</div>
          <div className="stat-value">{challengeDone ? '1' : '0'}</div>
          <div className="stat-sub">Done today</div>
        </div>
      </div>

      {/* Job Readiness */}
      {activeBpData && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Job-Readiness Meter</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{activeBpData.title}</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{readiness}%</div>
          </div>
          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${readiness}%` }}></div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Next Actions</div>
        <div className="grid-2" style={{ gap: '0.75rem' }}>
          <Link to="/orientation-quiz" className="btn btn-primary">
            {topMatch ? 'Retake Orientation Quiz' : 'Take Orientation Quiz'}
          </Link>
          {!assessmentDone && <Link to="/assessment" className="btn btn-outline">Take Foundation Assessment</Link>}
          {activeBpData && <Link to={`/blueprint/${activeBp}`} className="btn btn-outline">View Active Blueprint</Link>}
          <Link to="/directory" className="btn btn-ghost">Browse Directory</Link>
          <Link to="/partners" className="btn btn-ghost">Find Study Partners</Link>
        </div>
      </div>

      {/* Tracks */}
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Career Tracks Overview</div>
        <div className="grid-auto">
          {blueprints.map(bp => (
            <Link key={bp.id} to={`/blueprint/${bp.id}`} className="blueprint-card" onClick={() => localStorage.setItem('activeBlueprintId', bp.id)}>
              <div className="bp-title">{bp.title}</div>
              <div className="bp-fit">"{bp.fit}"</div>
              <span className="badge badge-muted">Hardware: {bp.hardware.level}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
