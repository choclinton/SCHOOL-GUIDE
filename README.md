# IT Pathway CM — Career Skill Orientation Platform

A personalized IT career guidance platform for African students — built with React + Vite + Supabase.

## 🚀 Features

- **Career Orientation Quiz** — Personality-based quiz determines your ideal IT career path
- **5 Blueprint Tracks** — Web Dev, Mobile Dev, Cybersecurity, Data Science & AI, DevOps & Cloud
- **Textbook-Depth Lessons** — 100+ lessons per track with rich theory and practical labs
- **MCQ Assessments** — 12 MCQs per lesson; 70% score required to mark lesson verified
- **System-Evaluated Progress** — Skill tree auto-updates based on passed assessments
- **Collapsible Sidebar Navigation** — Expands/contracts for more workspace
- **Isolated Admin Portal** — Separate admin login & dashboard (`/admin-login`)
- **Community Forum & Group Guide** — Student collaboration features

## 🛠️ Tech Stack

- React 18 + Vite 8
- React Router DOM v6
- Supabase (Auth + Database)
- Lucide React Icons
- Vanilla CSS

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

## 🌐 Deployment

This app is deployed on **Render** as a Static Site.

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18+

## 🔑 Environment Variables

Set these in your Render dashboard under Environment:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 👤 Admin Access

Navigate to `/admin-login` to access the isolated admin portal.  
Admin credentials are managed separately from student accounts.

## 📚 Blueprint Tracks

| Track | Lessons | Modules |
|-------|---------|---------|
| Web Development | 100+ | HTML, CSS, JS, React, Node.js, SQL, Git |
| Mobile Development | 100+ | Android, Kotlin, Flutter, Firebase |
| Cybersecurity | 100+ | Linux, Networking, Ethical Hacking, Forensics |
| Data Science & AI | 100+ | Python, NumPy, ML, Deep Learning |
| DevOps & Cloud | 100+ | Linux, Docker, Kubernetes, CI/CD, AWS |
