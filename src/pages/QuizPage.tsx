import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { flashcards } from '../data/flashcards';

/**
 * Manages the quiz session for a given category and quiz type.
 */
const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const quizType = searchParams.get('type') || 'multiple-choice';
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  
  // State for current question
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  
  const categoryCards = React.useMemo(() => 
    flashcards.filter(c => c.category === category),
  [category]);
  
  if (!categoryCards.length) {
    return (
      <div className="text-center mt-2">
        <p>Category not found.</p>
        <Link to="/quiz" className="btn btn-back mt-1">Back to Quizzes</Link>
      </div>
    );
  }
  
  if (currentIndex >= categoryCards.length) {
    return (
      <div className="page-container mt-2">
        <h2>Quiz Complete!</h2>
        <p>You scored <strong>{correctCount}</strong> out of <strong>{categoryCards.length}</strong>.</p>
        <div className="nav-buttons mt-1">
            <Link to="/quiz" className="btn btn-quiz">Take another quiz</Link>
            <Link to="/" className="btn btn-back">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  const currentCard = categoryCards[currentIndex];
  const isCorrect = isAnswered && (
    quizType === 'multiple-choice' 
      ? selectedOption === currentCard.english
      : textInput.trim().toLowerCase() === currentCard.english.toLowerCase()
  );

  const handleMultipleChoiceSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === currentCard.english) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleFillInBlankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !textInput.trim()) return;
    setIsAnswered(true);
    if (textInput.trim().toLowerCase() === currentCard.english.toLowerCase()) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setTextInput('');
    setIsAnswered(false);
    setCurrentIndex(prev => prev + 1);
  };
  
  return (
    <div className="page-container">
      <h2>Quiz: <span style={{ textTransform: 'capitalize' }}>{category}</span></h2>
      <p style={{ opacity: 0.7 }}>Question {currentIndex + 1} of {categoryCards.length}</p>
      
      <div className="quiz-card" style={{ 
        backgroundColor: 'var(--quiz-bg, #2a2a2a)', 
        padding: '2rem', 
        borderRadius: '12px', 
        width: '100%', 
        maxWidth: '400px', 
        textAlign: 'center',
        border: '2px solid var(--quiz-border, #3a3a3a)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '2rem', margin: '0 0 1.5rem 0' }}>{currentCard.spanish}</h3>
        
        {quizType === 'multiple-choice' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {currentCard.quiz.options?.map((option, idx) => {
              let btnStyle = {};
              if (isAnswered) {
                if (option === currentCard.english) {
                  btnStyle = { backgroundColor: '#1e4620', borderColor: '#4caf50', color: '#fff' }; // Correct
                } else if (option === selectedOption) {
                  btnStyle = { backgroundColor: '#5c1616', borderColor: '#f44336', color: '#fff' }; // Wrong selection
                } else {
                  btnStyle = { opacity: 0.5 }; // Unselected distractors
                }
              }
              
              return (
                <button 
                  key={idx}
                  className="btn btn-back"
                  style={{...btnStyle, padding: '1em'}}
                  onClick={() => handleMultipleChoiceSelect(option)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleFillInBlankSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={isAnswered}
              placeholder="Type English translation..."
              style={{ 
                padding: '1rem', 
                fontSize: '1.1rem', 
                borderRadius: '8px', 
                border: '1px solid #555', 
                backgroundColor: 'var(--input-bg, #333)', 
                color: 'inherit',
                width: '100%',
                boxSizing: 'border-box'
              }}
              autoFocus
            />
            {!isAnswered && (
              <button type="submit" className="btn btn-quiz" disabled={!textInput.trim()}>
                Submit Answer
              </button>
            )}
          </form>
        )}
        
        {isAnswered && (
          <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease-in' }}>
            <h4 style={{ color: isCorrect ? '#4caf50' : '#f44336', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
              {isCorrect ? '✅ Correct!' : `❌ Wrong! The correct answer is: ${currentCard.english}`}
            </h4>
            <button className="btn btn-study" onClick={handleNext} style={{ width: '100%' }}>
              Next Question
            </button>
          </div>
        )}
      </div>
      
      {/* Light mode support via embedded styles */}
      <style>{`
        @media (prefers-color-scheme: light) {
          .quiz-card {
            --quiz-bg: #ffffff;
            --quiz-border: #e5e5e5;
          }
          input {
            --input-bg: #f9f9f9;
            border-color: #ccc !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
