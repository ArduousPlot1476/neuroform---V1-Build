import { useState } from 'react';
import type { DayScore } from '../types';

export const useDayScores = () => {
  const [scores, setScores] = useState<Record<string, DayScore['score']>>({});

  const toggleScore = (dateKey: string) => {
    const scoreOrder: DayScore['score'][] = ['challenging', 'average', 'good', 'excellent', null];
    
    setScores(prev => {
      const currentScore = prev[dateKey] || null;
      const currentIndex = scoreOrder.indexOf(currentScore);
      const nextScore = scoreOrder[(currentIndex + 1) % scoreOrder.length];
      
      return {
        ...prev,
        [dateKey]: nextScore,
      };
    });
  };

  return {
    scores,
    toggleScore,
  };
};