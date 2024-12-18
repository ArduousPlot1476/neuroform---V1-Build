import type { DayScore } from '../types';

export const getScoreColor = (score: DayScore['score']) => {
  switch (score) {
    case 'challenging':
      return 'bg-red-300 hover:bg-red-400';
    case 'average':
      return 'bg-yellow-300 hover:bg-yellow-400';
    case 'good':
      return 'bg-green-300 hover:bg-green-400';
    case 'excellent':
      return 'bg-purple-300 hover:bg-purple-400';
    default:
      return 'bg-gray-200 hover:bg-gray-300';
  }
};