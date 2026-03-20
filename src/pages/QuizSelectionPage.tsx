import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Allows the user to select a quiz type and a category to start the quiz.
 */
const QuizSelectionPage: React.FC = () => {
  const [quizType, setQuizType] = useState<'multiple-choice' | 'fill-in-the-blank'>('multiple-choice');

  const categories = [
    { id: 'animals', label: 'Animals', btnClass: 'btn-study' },
    { id: 'food', label: 'Food', btnClass: 'btn-quiz' },
    { id: 'verbs', label: 'Verbs', btnClass: 'btn-stats' },
  ];

  return (
    <div className="page-container">
      <h2>Quiz Setup</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
        <h3 style={{ margin: '0', textAlign: 'center' }}>1. Select Type</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${quizType === 'multiple-choice' ? 'btn-quiz active' : 'btn-back'}`}
            onClick={() => setQuizType('multiple-choice')}
            style={{ flex: 1, padding: '0.8em 0.5em', fontSize: '1rem' }}
          >
            Multiple Choice
          </button>
          <button 
            className={`btn ${quizType === 'fill-in-the-blank' ? 'btn-quiz active' : 'btn-back'}`}
            onClick={() => setQuizType('fill-in-the-blank')}
            style={{ flex: 1, padding: '0.8em 0.5em', fontSize: '1rem' }}
          >
            Fill in Blank
          </button>
        </div>
      </div>

      <div className="nav-buttons" style={{ marginTop: '1rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>2. Select Category</h3>
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            to={`/quiz/${cat.id}?type=${quizType}`} 
            className={`btn ${cat.btnClass}`}
          >
            {cat.label}
          </Link>
        ))}
        <Link to="/" className="btn btn-back mt-1">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default QuizSelectionPage;
