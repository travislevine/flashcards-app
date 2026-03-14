import React from 'react';
import { Link } from 'react-router-dom';

interface CategorySelectionPageProps {
  mode: 'study' | 'quiz';
}

const CategorySelectionPage: React.FC<CategorySelectionPageProps> = ({ mode }) => {
  const categories = [
    { id: 'animals', label: 'Animals', btnClass: 'btn-study' },
    { id: 'food', label: 'Food', btnClass: 'btn-quiz' },
    { id: 'verbs', label: 'Verbs', btnClass: 'btn-stats' },
  ];

  return (
    <div className="category-selection-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <h2>Select a Category for {mode === 'study' ? 'Study' : 'Quiz'}</h2>
      <div className="nav-buttons">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/${mode}/${cat.id}`} className={`btn ${cat.btnClass}`} style={{ textAlign: 'center' }}>
            {cat.label}
          </Link>
        ))}
        <Link to="/" className="btn btn-back" style={{ textAlign: 'center', marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
