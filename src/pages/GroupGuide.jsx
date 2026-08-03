import React, { useState } from 'react';

const CHAPTERS = [
  {
    id: 'roles',
    title: 'Chapter 1: Team Roles & Labor Division',
    summary: 'How to structure a 3-5 person student development team for maximum speed and accountability.',
    content: `Building a successful IT project requires clear separation of concerns. Avoid the common mistake where everyone tries to code everything at once.\n\nRecommended 4-Role Team Architecture:\n\n1. Product Manager / Business Lead:\n- Owns the project requirements and user stories.\n- Communicates with test users and validates feature priorities.\n- Keeps the team on schedule.\n\n2. Frontend Lead:\n- Translates Figma wireframes into clean, responsive web or mobile user interfaces.\n- Manages user experience, state, and form validations.\n\n3. Backend & Database Lead:\n- Designs the database tables, security policies (RLS), and REST/GraphQL APIs.\n- Manages authentication, server deployment, and data integrity.\n\n4. Quality Assurance & DevOps Lead:\n- Sets up the Git repository, branch protection rules, and deployment pipelines.\n- Tests features before merging pull requests to prevent production bugs.`
  },
  {
    id: 'git',
    title: 'Chapter 2: Git & GitHub Collaboration Workflow',
    summary: 'Standard industry rules for writing code together without overwriting each other’s work.',
    content: `Never push code directly to the \`main\` branch. Always follow the Feature Branch Workflow:\n\n1. Create a Feature Branch:\n\`\`\`bash\ngit checkout main\ngit pull origin main\ngit checkout -b feature/user-authentication\n\`\`\`\n\n2. Commit Incrementally:\nMake small, logical commits with descriptive messages:\n\`\`\`bash\ngit add .\ngit commit -m "Add Supabase login handler and error alerts"\n\`\`\`\n\n3. Open a Pull Request (PR):\nPush your feature branch to GitHub and open a PR. Require at least 1 teammate code review before merging.\n\n4. Handling Merge Conflicts:\nIf two developers edit the same file, Git will pause and ask you to select the correct lines. Resolve conflicts locally, run \`npm run build\` to verify, then complete the merge.`
  },
  {
    id: 'tools',
    title: 'Chapter 3: Communication Stack & Project Tracking',
    summary: 'Keeping discussions structured using Discord, Trello, and WhatsApp group protocols.',
    content: `Communication Chaos Kills Teams. Separate quick chat from task tracking:\n\n- Task Board (Trello / Notion / GitHub Projects):\nCreate 4 columns: [Backlog], [In Progress], [In Review], [Done]. Every task must have an assigned owner and deadline.\n\n- Team Chat (Discord or Slack):\nCreate dedicated channels: #announcements, #frontend, #backend, #bugs, #general. Avoid putting critical code architecture decisions inside informal WhatsApp threads where they get buried.`
  },
  {
    id: 'agile',
    title: 'Chapter 4: Agile Sprints & Meeting Cadence',
    summary: 'Running 1-week Sprints, Daily Standups, and Sprint Demos.',
    content: `Adopt a 1-Week Sprint Cadence:\n\n- Monday Sprint Planning (30 mins):\nSelect tasks from the Backlog for the week. Estimate effort in hours.\n\n- Daily Standup (10 mins via text or audio):\nEach member answers 3 questions:\n1. What did I complete yesterday?\n2. What will I work on today?\n3. Am I blocked by anything?\n\n- Sunday Sprint Demo & Retrospective (30 mins):\nDemonstrate working software to the team. Review what went well and what process needs improvement for the next sprint.`
  },
  {
    id: 'legal',
    title: 'Chapter 5: Legal & Operations in Cameroon',
    summary: 'Business registration, freelancing contracts, and local payment integration.',
    content: `When transitioning your student project into a commercial software company in Cameroon:\n\n1. Business Registration (Ets vs SARL):\nRegister your enterprise at the CFCE (Centre de Formalités de Création d'Entreprises). A Sole Proprietorship (Etablissement) is fast and cost-effective for freelancing teams.\n\n2. Client Contracts:\nAlways sign a written Scope of Work (SOW) defining deliverable milestones, payment terms (50% upfront deposit, 50% upon deployment), and intellectual property ownership.\n\n3. Payment Integration:\nIntegrate local Mobile Money API gateways (MTN MoMo, Orange Money) alongside Stripe for international clients.`
  }
];

const GroupGuide = () => {
  const [activeChapter, setActiveChapter] = useState('roles');

  const currentChapter = CHAPTERS.find(c => c.id === activeChapter);

  return (
    <div>
      <div className="page-header">
        <h1>IT Group Creation & Collaboration Guide</h1>
        <p>A textbook-grade handbook for forming, managing, and scaling software development teams in Cameroon.</p>
      </div>

      {/* Chapter Selection Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapter(ch.id)}
            className={`btn btn-sm ${activeChapter === ch.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            Chapter {idx + 1}
          </button>
        ))}
      </div>

      {/* Chapter Body */}
      {currentChapter && (
        <div className="card">
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
            {currentChapter.title}
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
            {currentChapter.summary}
          </p>
          <div style={{ background: 'var(--card-bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', whiteSpace: 'pre-line', fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-primary)', fontFamily: 'inherit' }}>
            {currentChapter.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupGuide;
