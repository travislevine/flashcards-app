import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import Flashcard from '../components/Flashcard';

const StudyPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongCards, setWrongCards] = useState<string[]>([]);
  
  const categoryCards = flashcards.filter(c => c.category === category);
  
  if (!categoryCards.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Category not found.</p>
        <Link to="/study" style={{ color: 'inherit', textDecoration: 'underline' }}>Back to Categories</Link>
      </div>
    );
  }
  
  if (currentIndex >= categoryCards.length) {
    return (
      <div className="study-complete" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
        <h2>Study Session Complete!</h2>
        <p>You finished all cards in the <strong>{category}</strong> category.</p>
        <p>Cards marked wrong: {wrongCards.length}</p>
        <div className="nav-buttons" style={{ marginTop: '1rem' }}>
            <Link to="/study" className="btn btn-study" style={{ textAlign: 'center' }}>Pick another category</Link>
            <Link to="/" className="btn btn-back" style={{ textAlign: 'center' }}>Back to Home</Link>
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
    <div className="study-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
