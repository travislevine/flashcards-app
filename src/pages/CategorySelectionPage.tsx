import React from 'react';
import { Link } from 'react-router-dom';

interface CategorySelectionPageProps {
  mode: 'study' | 'quiz';
}

/**
 * Displays a list of available categories for a specific mode (study or quiz).
 * Navigates the user to the selected category.
 */
const CategorySelectionPage: React.FC<CategorySelectionPageProps> = ({ mode }) => {
  const categories = [
    { id: 'animals', label: 'Animals', btnClass: 'btn-study' },
    { id: 'food', label: 'Food', btnClass: 'btn-quiz' },
    { id: 'verbs', label: 'Verbs', btnClass: 'btn-stats' },
  ];

  return (
    <div className="page-container">
      <h2>Select a Category for {mode === 'study' ? 'Study' : 'Quiz'}</h2>
      <div className="nav-buttons">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/${mode}/${cat.id}`} className={`btn ${cat.btnClass}`}>
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

export default CategorySelectionPage;
