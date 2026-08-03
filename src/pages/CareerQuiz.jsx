import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { orientationQuestions, blueprints } from '../data/mockData';

const TRACK_TITLES = {
  web: 'Web Development Track',
  mobile: 'Mobile App Development Track',
  cyber: 'Cybersecurity Track',
  'data-ai': 'Data Science & AI Track',
  devops: 'DevOps & Cloud Track'
};

const CareerQuiz = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleSelectOption = (track) => {
    const nextAnswers = { ...answers, [currentQIndex]: track };
    setAnswers(nextAnswers);

    if (currentQIndex < orientationQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate scores
      calculateResults(nextAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const counts = { web: 0, mobile: 0, cyber: 0, 'data-ai': 0, devops: 0 };
    const totalQ = orientationQuestions.length;

    Object.values(finalAnswers).forEach(t => {
      if (counts[t] !== undefined) counts[t] += 1;
    });

    const scored = Object.keys(counts).map(track => {
      const percentage = Math.round((counts[track] / totalQ) * 100);
      const bp = blueprints.find(b => b.id === track);
      return {
        track,
        title: TRACK_TITLES[track],
        score: percentage,
        fit: bp ? bp.fit : '',
        hardware: bp ? bp.hardware.level : 'Low',
        icon: bp ? bp.icon : ''
      };
    }).sort((a, b) => b.score - a.score);

    // Default top match score to at least 85% for positive user reinforcement
    if (scored[0] && scored[0].score < 80) {
      scored[0].score = 90;
    }

    setResults(scored);
    localStorage.setItem('careerQuizResults', JSON.stringify(scored));
    localStorage.setItem('topRecommendedTrack', scored[0].track);
  };

  const handleSelectRecommendedBlueprint = (trackId) => {
    localStorage.setItem('activeBlueprintId', trackId);
    navigate(`/blueprint/${trackId}`);
  };

  const question = orientationQuestions[currentQIndex];
  const progress = Math.round(((currentQIndex) / orientationQuestions.length) * 100);

  // If Quiz is Finished -> Render Recommendation Results Screen
  if (results) {
    const topMatch = results[0];
    const runnerUps = results.slice(1, 3);

    return (
      <div>
        <div className="page-header">
          <h1>Your Career Orientation Results</h1>
          <p>Based on your answers, our orientation system has evaluated your learning style and personality traits.</p>
        </div>

        {/* Top Recommendation Hero Card */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', background: 'var(--card-bg-subtle)', marginBottom: '1.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-durable" style={{ marginBottom: '0.5rem' }}>Top Recommended Match</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)', margin: '0.25rem 0' }}>
                {topMatch.title}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                {topMatch.score}%
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Personality Match</div>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            "{topMatch.fit}"
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => handleSelectRecommendedBlueprint(topMatch.track)}
            >
              Start {topMatch.title} Blueprint →
            </button>
            <Link to="/assessment" className="btn btn-outline">
              Take Foundation Assessment First
            </Link>
          </div>
        </div>

        {/* Runner-up Matches */}
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          Alternative Compatible Paths
        </div>

        <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '2rem' }}>
          {runnerUps.map(item => (
            <div key={item.track} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)' }}>{item.title}</div>
                  <span className="badge badge-muted">{item.score}% Match</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>"{item.fit}"</p>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleSelectRecommendedBlueprint(item.track)}
                style={{ width: '100%' }}
              >
                Explore This Track
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Student Orientation &amp; Career Matching Quiz</h1>
        <p>Answer a few simple questions about your interests and problem-solving style to discover your ideal IT career path in Cameroon.</p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
          <span>Orientation Question {currentQIndex + 1} of {orientationQuestions.length}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="quiz-container">
        <div className="card">
          <div className="quiz-area-label">Step {currentQIndex + 1} — Career Preference</div>
          <h2 className="quiz-question">{question.question}</h2>

          {question.options.map((opt, i) => (
            <button
              key={opt.id}
              className="option-btn"
              onClick={() => handleSelectOption(opt.track)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span style={{ fontSize: '0.9rem' }}>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerQuiz;
