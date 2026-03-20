import { useState, useEffect } from 'react';

export interface CategoryStats {
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface AppStats {
  animals: CategoryStats;
  food: CategoryStats;
  verbs: CategoryStats;
}

const defaultStats: AppStats = {
  animals: { cardsStudied: 0, correctAnswers: 0, incorrectAnswers: 0 },
  food: { cardsStudied: 0, correctAnswers: 0, incorrectAnswers: 0 },
  verbs: { cardsStudied: 0, correctAnswers: 0, incorrectAnswers: 0 },
};

/**
 * Custom hook to manage and persist application statistics in localStorage.
 */
export const useStats = () => {
  // Initialize state from localStorage or use default stats
  const [stats, setStats] = useState<AppStats>(() => {
    try {
      const storedStats = localStorage.getItem('flashcard_stats');
      if (storedStats) {
        return JSON.parse(storedStats);
      }
    } catch (e) {
      console.error('Failed to parse stats from localStorage', e);
    }
    return defaultStats;
  });

  // Save to localStorage whenever stats change
  useEffect(() => {
    try {
      localStorage.setItem('flashcard_stats', JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats to localStorage', e);
    }
  }, [stats]);

  /**
   * Record a card interaction result
   */
  const recordAnswer = (category: keyof AppStats, isCorrect: boolean) => {
    setStats(prev => {
      const catStats = prev[category];
      return {
        ...prev,
        [category]: {
          cardsStudied: catStats.cardsStudied + 1,
          correctAnswers: catStats.correctAnswers + (isCorrect ? 1 : 0),
          incorrectAnswers: catStats.incorrectAnswers + (isCorrect ? 0 : 1),
        }
      };
    });
  };

  /**
   * Reset all stats back to zero
   */
  const resetStats = () => {
    setStats(defaultStats);
  };

  return { stats, recordAnswer, resetStats };
};