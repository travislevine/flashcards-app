import React from 'react';
import { Link } from 'react-router-dom';
import { useStats, type CategoryStats } from '../hooks/useStats';

/**
 * Calculates percentage string from stats
 */
const getAccuracy = (stats: CategoryStats): string => {
  if (stats.cardsStudied === 0) return '0%';
  return `${Math.round((stats.correctAnswers / stats.cardsStudied) * 100)}%`;
};

/**
 * Displays user statistics across all study and quiz sessions.
 */
const StatsPage: React.FC = () => {
  const { stats, resetStats } = useStats();

  const totalStudied = stats.animals.cardsStudied + stats.food.cardsStudied + stats.verbs.cardsStudied;
  const totalCorrect = stats.animals.correctAnswers + stats.food.correctAnswers + stats.verbs.correctAnswers;
  const totalIncorrect = stats.animals.incorrectAnswers + stats.food.incorrectAnswers + stats.verbs.incorrectAnswers;
  
  const overallAccuracy = totalStudied === 0 ? '0%' : `${Math.round((totalCorrect / totalStudied) * 100)}%`;

  return (
    <div className="page-container">
      <h2>Your Statistics</h2>
      
      <div className="stats-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        width: '100%', 
        maxWidth: '500px' 
      }}>
        
        {/* Overall Summary */}
        <div className="stats-card" style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'var(--card-bg, #2a2a2a)', border: '1px solid var(--card-border, #3a3a3a)' }}>
          <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center', color: '#646cff' }}>Overall Progress</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalStudied}</div>
              <div style={{ opacity: 0.7 }}>Total Cards</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{overallAccuracy}</div>
              <div style={{ opacity: 0.7 }}>Accuracy</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50' }}>{totalCorrect}</div>
              <div style={{ opacity: 0.7 }}>Correct</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336' }}>{totalIncorrect}</div>
              <div style={{ opacity: 0.7 }}>Incorrect</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <h3 style={{ margin: '0', textAlign: 'center' }}>Breakdown by Category</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(['animals', 'food', 'verbs'] as const).map(cat => {
            const catStats = stats[cat];
            return (
              <div key={cat} className="category-stat-row" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem', 
                borderRadius: '8px', 
                backgroundColor: 'var(--card-bg, #2a2a2a)',
                border: '1px solid var(--card-border, #3a3a3a)'
              }}>
                <div style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {cat}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>{catStats.cardsStudied} cards studied</div>
                  <div style={{ opacity: 0.8 }}>Accuracy: {getAccuracy(catStats)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="nav-buttons" style={{ marginTop: '1rem', marginInline: 'auto' }}>
          <button 
            className="btn btn-back" 
            onClick={() => {
              if(window.confirm('Are you sure you want to reset all your statistics? This cannot be undone.')) {
                resetStats();
              }
            }}
          >
            Reset All Stats
          </button>
          <Link to="/" className="btn btn-stats">
            Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @media (prefers-color-scheme: light) {
          .stats-container {
            --card-bg: #f9f9f9;
            --card-border: #e5e5e5;
          }
        }
      `}</style>
    </div>
  );
};

export default StatsPage;
