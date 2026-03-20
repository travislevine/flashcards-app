import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import Flashcard from '../components/Flashcard';
import { useStats, type AppStats } from '../hooks/useStats';

/**
 * Manages the redo study session for a given category.
 * Only displays flashcards that were marked as wrong in the previous session.
 */
const RedoPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { recordAnswer } = useStats();
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongCards, setWrongCards] = useState<string[]>([]);
  
  // Parse the initial list of wrong card IDs from the URL query parameters
  const [initialWrongCardIds, setInitialWrongCardIds] = useState<string[]>([]);
  
  useEffect(() => {
    const wrongParam = searchParams.get('wrong');
    if (wrongParam) {
      setInitialWrongCardIds(wrongParam.split(','));
    }
  }, [searchParams]);
  
  // Filter flashcards to only include those in the correct category AND in the initial wrong cards list
  const categoryCards = React.useMemo(() => 
    flashcards.filter(c => c.category === category && initialWrongCardIds.includes(c.id)),
  [category, initialWrongCardIds]);
  
  if (!initialWrongCardIds.length) {
    return (
      <div className="text-center mt-2">
        <p>Loading cards or no cards to redo.</p>
        <Link to="/study" style={{ color: 'inherit', textDecoration: 'underline' }}>Back to Categories</Link>
      </div>
    );
  }
  
  if (!categoryCards.length) {
    return (
      <div className="text-center mt-2">
        <p>Cards not found.</p>
        <Link to="/study" style={{ color: 'inherit', textDecoration: 'underline' }}>Back to Categories</Link>
      </div>
    );
  }
  
  // Study session is complete
  if (currentIndex >= categoryCards.length) {
    return (
      <div className="page-container mt-2">
        <h2>Redo Session Complete!</h2>
        <p>You finished all redo cards in the <strong>{category}</strong> category.</p>
        <p>Cards you still need to review: {wrongCards.length}</p>
        <div className="nav-buttons mt-1">
          {wrongCards.length > 0 && (
            <Link 
              to={`/redo/${category}?wrong=${wrongCards.join(',')}`} 
              className="btn btn-study"
              onClick={() => {
                // If they click it, we need to reset the state since the route is the same, just with new params
                // But React Router might just handle it if we let it navigate and the useEffect triggers. 
                // To be safe, we'll force a reload or let the effect handle it.
                // The effect will handle it because searchParams will change!
                setCurrentIndex(0);
                setWrongCards([]);
              }}
            >
              Redo Remaining Cards ({wrongCards.length})
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
    recordAnswer(category as keyof AppStats, true);
    setCurrentIndex(prev => prev + 1);
  };
  
  const handleWrong = () => {
    recordAnswer(category as keyof AppStats, false);
    setWrongCards(prev => [...prev, currentCard.id]);
    setCurrentIndex(prev => prev + 1);
  };
  
  return (
    <div className="page-container">
      <h2>Redo Mode: <span style={{ textTransform: 'capitalize' }}>{category}</span></h2>
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

export default RedoPage;
