import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLesson, getLessonsForBlueprint } from '../data/lessons/index';
import LessonQuiz from '../components/LessonQuiz';
import { BookOpen, CheckCircle, ArrowLeft, ArrowRight, Award, Clock, HelpCircle, FileText, ChevronRight } from 'lucide-react';

export default function LessonView() {
  const { trackId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const lesson = getLesson(trackId, lessonId);
  const allLessons = getLessonsForBlueprint(trackId);
  
  const [activeTab, setActiveTab] = useState('textbook'); // 'textbook' | 'quiz'
  const [quizPassed, setQuizPassed] = useState(false);
  
  const currentIndex = allLessons.findIndex(l => l.id === parseInt(lessonId));
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  useEffect(() => {
    // Check if user already passed this quiz
    const stored = localStorage.getItem(`quiz_${trackId}_${lessonId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.passed) setQuizPassed(true);
      } catch (e) {}
    } else {
      setQuizPassed(false);
    }
    window.scrollTo(0, 0);
  }, [trackId, lessonId]);

  if (!lesson) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', textAlign: 'center', backgroundColor: '#FAF6F0', borderRadius: '12px', color: '#362C28' }}>
        <h2>Lesson Not Found</h2>
        <p>The requested lesson (#{lessonId}) does not exist yet or is still under compilation.</p>
        <Link to={`/roadmap/${trackId}`} style={{ display: 'inline-block', marginTop: '16px', padding: '10px 20px', backgroundColor: '#362C28', color: '#FAF6F0', borderRadius: '8px', textDecoration: 'none' }}>
          Back to Roadmap
        </Link>
      </div>
    );
  }

  const handleQuizComplete = (passed, score) => {
    if (passed) {
      setQuizPassed(true);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px', color: '#362C28' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#706058', marginBottom: '16px' }}>
        <Link to="/dashboard" style={{ color: '#706058', textDecoration: 'none' }}>Dashboard</Link>
        <ChevronRight size={14} />
        <Link to={`/roadmap/${trackId}`} style={{ color: '#706058', textDecoration: 'none', textTransform: 'capitalize' }}>
          {trackId.replace('-', ' ')}
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: '#362C28', fontWeight: 600 }}>Lesson {lesson.id}</span>
      </div>

      {/* Header Banner */}
      <div style={{ backgroundColor: '#FAF6F0', padding: '24px', borderRadius: '12px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#EAE0D5', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8C6D58', marginBottom: '6px' }}>
              {lesson.module}
            </div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#362C28' }}>
              Lesson {lesson.id}: {lesson.title}
            </h1>
          </div>
          {quizPassed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '6px 14px', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem', border: '1px solid #C8E6C9' }}>
              <CheckCircle size={16} /> Verified Completed
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.85rem', color: '#66554D' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={15} /> {lesson.duration || '30 min'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FileText size={15} /> {lesson.type === 'practical' ? 'Practical Lab & MCQ' : 'Theory & MCQ'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <HelpCircle size={15} /> {lesson.questions?.length || 12} Assessment Questions
          </span>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', borderBottom: '2px solid #EAE0D5', paddingBottom: '0' }}>
          <button
            onClick={() => setActiveTab('textbook')}
            style={{
              padding: '10px 20px',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              borderBottom: activeTab === 'textbook' ? '3px solid #362C28' : '3px solid transparent',
              background: activeTab === 'textbook' ? '#FAF6F0' : 'none',
              cursor: 'pointer',
              color: activeTab === 'textbook' ? '#362C28' : '#8C6D58',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={18} /> Textbook Lesson
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              padding: '10px 20px',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              borderBottom: activeTab === 'quiz' ? '3px solid #362C28' : '3px solid transparent',
              background: activeTab === 'quiz' ? '#362C28' : '#E8F0E6',
              cursor: 'pointer',
              color: activeTab === 'quiz' ? '#FAF6F0' : '#2D5028',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s'
            }}
          >
            <Award size={18} />
            MCQ Assessment
            <span style={{
              backgroundColor: activeTab === 'quiz' ? '#FAF6F0' : '#2D5028',
              color: activeTab === 'quiz' ? '#362C28' : '#FAF6F0',
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '0.78rem',
              fontWeight: 700
            }}>{lesson.questions?.length || 12} Qs</span>
            {quizPassed && <span style={{ fontSize: '0.8rem' }}>✓</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'textbook' ? (
        <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid #EAE0D5', lineHeight: 1.7, fontSize: '1.05rem', color: '#2B2320', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          {lesson.content.split('\n\n').map((paragraph, idx) => {
            // Render headers if starts with specific syntax or capital short lines
            if (paragraph.startsWith('###') || paragraph.startsWith('##')) {
              return <h3 key={idx} style={{ color: '#362C28', marginTop: '24px', marginBottom: '12px', fontSize: '1.3rem' }}>{paragraph.replace(/#/g, '').trim()}</h3>;
            }
            if (paragraph.includes(':\n') && paragraph.length < 80) {
              return <h4 key={idx} style={{ color: '#362C28', marginTop: '20px', marginBottom: '8px', fontSize: '1.15rem' }}>{paragraph}</h4>;
            }
            // Code block rendering
            if (paragraph.includes('<') && paragraph.includes('>') || paragraph.includes('const ') || paragraph.includes('function ') || paragraph.includes('import ')) {
              return (
                <pre key={idx} style={{ backgroundColor: '#FAF6F0', padding: '16px', borderRadius: '8px', overflowX: 'auto', border: '1px solid #EAE0D5', fontFamily: 'monospace', fontSize: '0.9rem', color: '#362C28', margin: '16px 0' }}>
                  <code>{paragraph}</code>
                </pre>
              );
            }
            return <p key={idx} style={{ marginBottom: '16px' }}>{paragraph}</p>;
          })}

          <div style={{ marginTop: '40px', padding: '24px', background: 'linear-gradient(135deg, #362C28 0%, #52423C 100%)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ margin: 0, color: '#FAF6F0', fontSize: '1.1rem' }}>📝 Take the MCQ Assessment</h4>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', color: '#C9B8AE' }}>Answer {lesson.questions?.length || 12} multiple-choice questions. Score ≥70% to verify this lesson and unlock your progress.</p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              style={{ padding: '12px 24px', backgroundColor: '#FAF6F0', color: '#362C28', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', flexShrink: 0 }}
            >
              Start MCQ Assessment <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <LessonQuiz
          blueprintId={trackId}
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          questions={lesson.questions || []}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Prev / Next Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #EAE0D5' }}>
        {prevLesson ? (
          <Link to={`/lesson/${trackId}/${prevLesson.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#362C28', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
            <ArrowLeft size={18} /> Lesson {prevLesson.id}: {prevLesson.title}
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link to={`/lesson/${trackId}/${nextLesson.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#362C28', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
            Lesson {nextLesson.id}: {nextLesson.title} <ArrowRight size={18} />
          </Link>
        ) : (
          <Link to={`/roadmap/${trackId}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E7D32', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
            Back to Complete Roadmap <CheckCircle size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
