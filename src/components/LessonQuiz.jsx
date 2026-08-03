import React, { useState, useEffect } from 'react';

const LessonQuiz = ({ questions, lessonId, onQuizPass }) => {
  const storageKey = `quiz_${lessonId}`;
  const savedResult = JSON.parse(localStorage.getItem(storageKey) || 'null');

  const [answers, setAnswers] = useState(savedResult?.answers || {});
  const [submitted, setSubmitted] = useState(!!savedResult);
  const [score, setScore] = useState(savedResult?.score || 0);
  const [showExplanation, setShowExplanation] = useState({});

  const handleSelect = (qId, optId) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      const chosen = answers[q.id];
      const correctOpt = q.options.find(o => o.correct);
      if (chosen === correctOpt?.id) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    localStorage.setItem(storageKey, JSON.stringify({ answers, score: pct, correct, total: questions.length }));
    if (pct >= 70 && onQuizPass) onQuizPass(lessonId, pct);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanation({});
    localStorage.removeItem(storageKey);
  };

  const allAnswered = questions.every(q => answers[q.id]);
  const passed = score >= 70;

  return (
    <div style={{ marginTop: '1.5rem', borderTop: '2px solid var(--border)', paddingTop: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}>
            Lesson Quiz — {questions.length} Questions
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Score 70% or above to verify this lesson in your skill roadmap.
          </div>
        </div>
        {submitted && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: '1.4rem', color: passed ? '#2D5028' : '#A8322D' }}>
              {score}%
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: passed ? '#2D5028' : '#A8322D' }}>
              {passed ? 'PASSED' : 'NEEDS REVIEW'}
            </span>
          </div>
        )}
      </div>

      {/* Submitted Result Banner */}
      {submitted && (
        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.25rem',
          background: passed ? '#E8F0E6' : '#FCE8E6',
          border: `1px solid ${passed ? '#C5D8C1' : '#F5C2C0'}`,
          color: passed ? '#2D5028' : '#A8322D',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>
            {passed
              ? `Excellent! You scored ${score}%. This lesson is now system-verified in your skill roadmap.`
              : `You scored ${score}%. Review the material and retake the quiz to verify this lesson.`
            }
          </span>
          <button
            onClick={handleRetake}
            className="btn btn-ghost btn-sm"
            style={{ marginLeft: '1rem', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Retake Quiz
          </button>
        </div>
      )}

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          const correctOpt = q.options.find(o => o.correct);
          const isCorrect = submitted && chosen === correctOpt?.id;
          const isWrong = submitted && chosen && chosen !== correctOpt?.id;

          return (
            <div key={q.id} style={{
              background: 'var(--card-bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem 1.15rem',
              border: submitted
                ? `1px solid ${isCorrect ? '#C5D8C1' : isWrong ? '#F5C2C0' : 'var(--border)'}`
                : '1px solid var(--border)'
            }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>Q{qi + 1}.</span>
                {q.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {q.options.map(opt => {
                  const isChosen = chosen === opt.id;
                  const isCorrectOpt = opt.correct;
                  let bg = 'white';
                  let border = '1px solid var(--border)';
                  let color = 'var(--text-primary)';

                  if (submitted) {
                    if (isCorrectOpt) { bg = '#E8F0E6'; border = '1px solid #C5D8C1'; color = '#2D5028'; }
                    else if (isChosen && !isCorrectOpt) { bg = '#FCE8E6'; border = '1px solid #F5C2C0'; color = '#A8322D'; }
                  } else if (isChosen) {
                    bg = '#F0EBE3';
                    border = '1px solid var(--primary)';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: bg,
                        border,
                        color,
                        fontSize: '0.88rem',
                        cursor: submitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        transition: 'background 0.15s',
                        fontWeight: isChosen || (submitted && isCorrectOpt) ? 600 : 400
                      }}
                    >
                      <span style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: isChosen ? 'var(--primary)' : (submitted && isCorrectOpt ? '#2D5028' : 'transparent'),
                        border: `2px solid ${isChosen ? 'var(--primary)' : (submitted && isCorrectOpt ? '#2D5028' : 'var(--border)')}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0
                      }}>
                        {opt.id.toUpperCase()}
                      </span>
                      {opt.text}
                      {submitted && isCorrectOpt && <span style={{ marginLeft: 'auto', fontSize: '0.78rem' }}>Correct</span>}
                      {submitted && isChosen && !isCorrectOpt && <span style={{ marginLeft: 'auto', fontSize: '0.78rem' }}>Your answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{ minWidth: '160px' }}
          >
            {allAnswered ? `Submit Quiz (${questions.length} Answers)` : `Answer All ${questions.length} Questions`}
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonQuiz;
