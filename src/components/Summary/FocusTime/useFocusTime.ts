import { useState, useEffect } from 'react';
import { focusTracker } from '../../../services/tracking/focusTracker';
import { calculateFocusTimeStats } from './utils';
import type { FocusTimeStats } from './types';

export const useFocusTime = () => {
  const [stats, setStats] = useState<FocusTimeStats>({
    totalSessions: 0,
    totalMinutes: 0,
    weeklyGoal: 600, // 10 hours per week
    progress: 0
  });

  useEffect(() => {
    // Initial load
    const updateStats = () => {
      const sessions = focusTracker.getSessions();
      const newStats = calculateFocusTimeStats(sessions, stats.weeklyGoal);
      setStats(newStats);
    };

    updateStats();

    // Update stats every minute
    const interval = setInterval(updateStats, 60000);

    return () => clearInterval(interval);
  }, [stats.weeklyGoal]);

  const updateGoal = (newGoal: number) => {
    const sessions = focusTracker.getSessions();
    const newStats = calculateFocusTimeStats(sessions, newGoal);
    setStats(newStats);
  };

  return { stats, updateGoal };
};