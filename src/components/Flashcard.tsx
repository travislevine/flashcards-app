import React, { useState } from 'react';
import './Flashcard.css';

interface FlashcardProps {
  spanish: string;
  english: string;
  onRight?: () => void;
  onWrong?: () => void;
}

/**
 * Flashcard component that displays a Spanish word and flips to reveal the English translation.
 * Also provides buttons to mark the card as correct or incorrect.
 */
const Flashcard: React.FC<FlashcardProps> = ({ spanish, english, onRight, onWrong }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(true);
  };

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={!isFlipped ? handleFlip : undefined}
      >
        <div className="flashcard-front">
          <h3>{spanish}</h3>
          <p className="flip-hint">Click to reveal translation</p>
        </div>
        <div className="flashcard-back">
          <h3>{english}</h3>
        </div>
      </div>
      
      {isFlipped && (
        <div className="flashcard-actions">
          <button className="btn btn-action right-btn" onClick={onRight}>✅ Right</button>
          <button className="btn btn-action wrong-btn" onClick={onWrong}>❌ Wrong</button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
