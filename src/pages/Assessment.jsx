import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentQuestions, foundationAreas } from '../data/mockData';

const Assessment = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [answered, setAnswered] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (opt, areaId) => {
    setAnswered({ correct: opt.correct, selected: opt.id });

    setTimeout(() => {
      const currentScore = scores[areaId] || 0;
      const newScores = { ...scores, [areaId]: currentScore + (opt.correct ? 1 : 0) };
      setScores(newScores);
      setAnswered(null);

      if (currentQIndex < assessmentQuestions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
      } else {
        localStorage.setItem('assessmentScores', JSON.stringify(newScores));
        navigate('/checklist');
      }
    }, 700);
  };

  const question = assessmentQuestions[currentQIndex];
  if (!question) return null;

  const area = foundationAreas.find(a => a.id === question.areaId);
  const progress = Math.round((currentQIndex / assessmentQuestions.length) * 100);

  return (
    <div>
      <div className="page-header">
        <h1>Foundations Assessment</h1>
        <p>We will test your knowledge across 6 foundation areas to personalise your checklist.</p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
          <span>Question {currentQIndex + 1} of {assessmentQuestions.length}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="quiz-container">
        <div className="card">
          <div className="quiz-area-label">Assessing: {area.title}</div>
          <h2 className="quiz-question">{question.question}</h2>

          {question.options.map((opt, i) => {
            let borderColor = 'var(--border)';
            let bg = 'var(--card-bg)';
            if (answered && answered.selected === opt.id) {
              borderColor = answered.correct ? '#5A8A52' : '#A8322D';
              bg = answered.correct ? '#E8F0E6' : '#FCE8E6';
            }

            return (
              <button
                key={opt.id}
                className="option-btn"
                style={{ borderColor, background: bg }}
                onClick={() => !answered && handleOptionSelect(opt, question.areaId)}
                disabled={!!answered}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
