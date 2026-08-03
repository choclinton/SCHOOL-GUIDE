import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blueprints, scholarships, mentors } from '../data/mockData';
import { getLessonsByModule, getCompletedLessons, getBlueprintProgress } from '../data/lessons/index';
import TerminalSandbox from '../components/TerminalSandbox';
import HtmlSandbox from '../components/HtmlSandbox';
import SqlSandbox from '../components/SqlSandbox';
import JsSandbox from '../components/JsSandbox';

const DurabilityTag = ({ tag }) => (
  <span className={`badge ${tag === 'Durable' ? 'badge-durable' : 'badge-trending'}`}>
    {tag === 'Durable' ? 'Durable' : 'Trending'}
  </span>
);

const LessonCard = ({ lesson, bpId, onCompleteSandbox }) => {
  const [open, setOpen] = useState(false);

  const handleSandboxAction = () => {
    if (onCompleteSandbox) onCompleteSandbox(lesson.title);
  };

  const renderSandbox = () => {
    const t = lesson.title.toLowerCase();
    if (t.includes('terminal') || t.includes('linux') || t.includes('command') || t.includes('deploy') || bpId === 'devops' || bpId === 'cyber') {
      return (
        <div>
          <TerminalSandbox />
          <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
            <button className="btn btn-outline btn-sm" onClick={handleSandboxAction}>
              Submit Sandbox Completion to System
            </button>
          </div>
        </div>
      );
    }
    if (t.includes('sql') || t.includes('database') || t.includes('data')) {
      return (
        <div>
          <SqlSandbox />
          <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
            <button className="btn btn-outline btn-sm" onClick={handleSandboxAction}>
              Submit Query Output to System
            </button>
          </div>
        </div>
      );
    }
    if (t.includes('javascript') || t.includes('fetch') || t.includes('api') || t.includes('function') || bpId === 'data-ai') {
      return (
        <div>
          <JsSandbox initialCode={lesson.code || '// Write and run JavaScript here\nconsole.log("Hello!");'} />
          <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
            <button className="btn btn-outline btn-sm" onClick={handleSandboxAction}>
              Submit Execution Output to System
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <HtmlSandbox initialCode={lesson.code || '<h1>Practical Sandbox</h1>\n<p>Edit this HTML to see live changes.</p>'} />
        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <button className="btn btn-outline btn-sm" onClick={handleSandboxAction}>
            Submit Live Render to System
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`lesson-card ${lesson.type === 'theory' ? 'lesson-theory' : 'lesson-practical'}`}>
      <div className="lesson-header" onClick={() => setOpen(!open)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="lesson-type-pill">{lesson.type === 'theory' ? 'Theory' : 'Practical Sandbox'}</span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{lesson.title}</span>
        </div>
        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="lesson-body">
          {lesson.type === 'practical' && (
            <div style={{ background: '#E8F0E6', color: '#2D5028', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #C5D8C1' }}>
              System Practical Sandbox — Execute code or commands below. The system automatically audits your completion.
            </div>
          )}
          {lesson.content}
          {lesson.type === 'practical' && renderSandbox()}
        </div>
      )}
    </div>
  );
};

const BlueprintView = () => {
  const { id } = useParams();
  const bp = blueprints.find(b => b.id === id);
  const [activeSection, setActiveSection] = useState('overview');

  // System Evaluation State
  const [completedSandboxes, setCompletedSandboxes] = useState(() => JSON.parse(localStorage.getItem(`sandboxes_${id}`) || '[]'));
  const [systemAuditNotice, setSystemAuditNotice] = useState('');

  const assessmentScores = JSON.parse(localStorage.getItem('assessmentScores') || '{}');
  const foundationPassed = Object.keys(assessmentScores).length > 0;

  if (!bp) return <div className="card">Blueprint not found. <Link to="/blueprint-selection">Go back</Link></div>;

  const matchedScholarships = scholarships.filter(s => s.field === bp.title || s.field === 'General');
  const matchedMentors = mentors.filter(m => m.focus.toLowerCase().includes(bp.title.split(' ')[0].toLowerCase()) || m.focus.includes('General'));

  // System Evaluation Function (System determines completion, NOT manual user toggles)
  const isSkillSystemVerified = (index, type) => {
    if (type === 'foundation') {
      return foundationPassed;
    }
    // Platform tools & supporting skills require completed sandbox exercises
    return completedSandboxes.length > index;
  };

  const handleCompleteSandbox = (lessonTitle) => {
    if (!completedSandboxes.includes(lessonTitle)) {
      const updated = [...completedSandboxes, lessonTitle];
      setCompletedSandboxes(updated);
      localStorage.setItem(`sandboxes_${id}`, JSON.stringify(updated));
      setSystemAuditNotice(`System Audit Verified: Completed lesson sandbox "${lessonTitle}". Skill roadmap updated.`);
      setTimeout(() => setSystemAuditNotice(''), 4000);
    }
  };

  const allSkills = [...bp.foundation, ...bp.platformTools, ...bp.supportingSkills];
  const verifiedCount = allSkills.filter((_, i) => isSkillSystemVerified(i, i < bp.foundation.length ? 'foundation' : 'other')).length;
  const pct = Math.round((verifiedCount / allSkills.length) * 100);

  const SECTIONS = ['overview', 'lessons', 'alumni', 'scholarships'];

  return (
    <div>
      <Link to="/blueprint-selection" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '1rem', display: 'inline-block', fontWeight: 500 }}>
        ← Back to Blueprints
      </Link>

      {systemAuditNotice && (
        <div style={{ background: '#E8F0E6', border: '1px solid #C5D8C1', color: '#2D5028', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600 }}>
          {systemAuditNotice}
        </div>
      )}

      <div className="card card-subtle" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.35rem' }}>{bp.title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1rem' }}>"{bp.fit}"</p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge badge-muted">Hardware: {bp.hardware.level}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{bp.hardware.note}</span>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            <span>System-Evaluated Readiness Progress</span>
            <span>{pct}% Verified</span>
          </div>
          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
        </div>
      </div>

      <div className="segment-control">
        {SECTIONS.map(s => (
          <button key={s} className={`segment-btn${activeSection === s ? ' active' : ''}`} onClick={() => setActiveSection(s)}>
            {s === 'overview' ? 'Overview' : s === 'lessons' ? 'Lessons & Sandboxes' : s === 'alumni' ? 'Alumni' : 'Support'}
          </button>
        ))}
      </div>

      {activeSection === 'overview' && (
        <div>
          <div className="card card-subtle" style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Note: Skill completion status is automatically evaluated by the system based on your assessment scores and lesson sandbox submissions.
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Foundation (Durable Skills)</div>
            {bp.foundation.map((item, i) => {
              const verified = isSkillSystemVerified(i, 'foundation');
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', background: verified ? '#E8F0E6' : 'var(--card-bg-subtle)', marginBottom: '0.35rem', border: `1px solid ${verified ? '#C5D8C1' : 'var(--border)'}` }}>
                  <span className={`badge ${verified ? 'badge-durable' : 'badge-muted'}`}>
                    {verified ? 'System Verified' : 'Pending Assessment'}
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item}</span>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Platform Tools</div>
            {bp.platformTools.map((tool, i) => {
              const verified = isSkillSystemVerified(i + bp.foundation.length, 'tool');
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', background: verified ? '#E8F0E6' : 'var(--card-bg-subtle)', marginBottom: '0.35rem', border: `1px solid ${verified ? '#C5D8C1' : 'var(--border)'}` }}>
                  <span className={`badge ${verified ? 'badge-durable' : 'badge-muted'}`}>
                    {verified ? 'System Verified' : 'Pending Sandbox'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.9rem' }}>{tool.name}</span>
                    <span style={{ marginLeft: '0.5rem' }}><DurabilityTag tag={tool.durability} /></span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reviewed {tool.reviewed}</span>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Supporting Skills</div>
            {bp.supportingSkills.map((item, i) => {
              const verified = isSkillSystemVerified(i + bp.foundation.length + bp.platformTools.length, 'support');
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', background: verified ? '#E8F0E6' : 'var(--card-bg-subtle)', marginBottom: '0.35rem', border: `1px solid ${verified ? '#C5D8C1' : 'var(--border)'}` }}>
                  <span className={`badge ${verified ? 'badge-durable' : 'badge-muted'}`}>
                    {verified ? 'System Verified' : 'Pending Sandbox'}
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item}</span>
                </div>
              );
            })}
          </div>

          <div className="card card-subtle">
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Proof of Work Requirement</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{bp.proofOfWork}</p>
          </div>
        </div>
      )}

      {activeSection === 'lessons' && (
        <div>
          <div className="card card-subtle" style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem', fontSize: '1.1rem' }}>Textbook Curriculum &amp; Interactive Assessments</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Each module includes textbook-depth theory and 12 MCQ assessment questions to verify system mastery.
              </div>
            </div>
            <div style={{ padding: '0.5rem 1rem', background: '#E8F0E6', color: '#2D5028', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem', border: '1px solid #C5D8C1' }}>
              Progress: {getBlueprintProgress(id)}% Verified
            </div>
          </div>

          {/* Render Full Lessons List */}
          {Object.keys(getLessonsByModule(id)).length > 0 ? (
            Object.entries(getLessonsByModule(id)).map(([moduleName, moduleLessons]) => (
              <div key={moduleName} className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  {moduleName} ({moduleLessons.length} Lessons)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {moduleLessons.map((l) => {
                    const isPassed = getCompletedLessons(id).includes(l.id);
                    return (
                      <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: isPassed ? '#E8F0E6' : 'var(--card-bg-subtle)', border: `1px solid ${isPassed ? '#C5D8C1' : 'var(--border)'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isPassed ? '#2D5028' : 'var(--text-muted)' }}>
                            #{l.id}
                          </span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                              {l.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', marginTop: '2px' }}>
                              <span>⏱ {l.duration || '30 min'}</span>
                              <span>📖 {l.type === 'practical' ? 'Practical Lab & MCQ' : 'Theory & MCQ'}</span>
                              <span>❓ {l.questions?.length || 12} MCQs</span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {isPassed ? (
                            <span style={{ fontSize: '0.8rem', color: '#2E7D32', fontWeight: 700, background: '#DCEDC8', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                              ✓ Passed
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending</span>
                          )}
                          <Link to={`/lesson/${id}/${l.id}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
                            {isPassed ? 'Review Lesson' : 'Start Lesson'}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div>
              <div style={{ padding: '1rem', background: '#FFF3E0', color: '#E65100', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
                Compiling 100 textbook lessons for this track... Showing preview modules below.
              </div>
              {bp.lessons.map((lesson, i) => (
                <LessonCard key={i} lesson={lesson} bpId={id} onCompleteSandbox={handleCompleteSandbox} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === 'alumni' && (
        <div className="card card-subtle">
          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>Local Alumni Profile</div>
          <div style={{ fontWeight: 700 }}>{bp.alumniStory.name}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.75rem' }}>{bp.alumniStory.role}</div>
          <p style={{ fontStyle: 'italic', lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '0.92rem' }}>"{bp.alumniStory.story}"</p>
        </div>
      )}

      {activeSection === 'scholarships' && (
        <div className="flex-row">
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Matched Scholarships</div>
            <div className="flex-col">
              {matchedScholarships.map(s => (
                <div key={s.id} className="directory-card">
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)' }}>{s.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>{s.type} · {s.region}</div>
                  <span className="badge badge-muted">{s.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Matched Communities</div>
            <div className="flex-col">
              {matchedMentors.map(m => (
                <div key={m.id} className="directory-card">
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{m.type} · {m.region}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlueprintView;
