import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import Flashcard from '../components/Flashcard';

/**
 * Manages the study session for a given category.
 * Displays flashcards one by one and tracks wrong answers.
 */
const StudyPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongCards, setWrongCards] = useState<string[]>([]);
  
  // Memoize the category cards so it doesn't recalculate on every render
  const categoryCards = React.useMemo(() => 
    flashcards.filter(c => c.category === category),
  [category]);
  
  if (!categoryCards.length) {
    return (
      <div className="text-center mt-2">
        <p>Category not found.</p>
        <Link to="/study" style={{ color: 'inherit', textDecoration: 'underline' }}>Back to Categories</Link>
      </div>
    );
  }
  
  // Study session is complete
  if (currentIndex >= categoryCards.length) {
    return (
      <div className="page-container mt-2">
        <h2>Study Session Complete!</h2>
        <p>You finished all cards in the <strong>{category}</strong> category.</p>
        <p>Cards marked wrong: {wrongCards.length}</p>
        <div className="nav-buttons mt-1">
          {wrongCards.length > 0 && (
            <Link 
              to={`/redo/${category}?wrong=${wrongCards.join(',')}`} 
              className="btn btn-study"
            >
              Redo Wrong Cards ({wrongCards.length})
            </Link>
          )}
          <Link to="/study" className="btn btn-quiz">Pick another category</Link>
          <Link to="/" className="btn btn-back">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  const currentCard = categoryCards[currentIndex];
  
  const handleRight = () => {
    setCurrentIndex(prev => prev + 1);
  };
  
  const handleWrong = () => {
    setWrongCards(prev => [...prev, currentCard.id]);
    setCurrentIndex(prev => prev + 1);
  };
  
  return (
    <div className="page-container">
      <h2>Study Mode: <span style={{ textTransform: 'capitalize' }}>{category}</span></h2>
      <p style={{ opacity: 0.7 }}>Card {currentIndex + 1} of {categoryCards.length}</p>
      
      <Flashcard 
        key={currentCard.id}
        spanish={currentCard.spanish} 
        english={currentCard.english} 
        onRight={handleRight}
        onWrong={handleWrong}
      />
    </div>
  );
};

export default StudyPage;
