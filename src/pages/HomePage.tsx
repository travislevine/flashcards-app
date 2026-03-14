import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Spanish Flashcards</h1>
      <p>Welcome to your Spanish learning companion!</p>
      
      <div className="nav-buttons">
        <Link to="/study" className="btn btn-study">
          Study Mode
        </Link>
        <Link to="/quiz" className="btn btn-quiz">
          Quiz Mode
        </Link>
        <Link to="/stats" className="btn btn-stats">
          Stats Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
