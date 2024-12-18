import { useState, useEffect } from 'react';
import { journalTracker } from '../../../services/tracking/journalTracker';
import { calculateJournalStats } from './utils';
import type { JournalStreakStats } from './types';

export const useJournalStreak = () => {
  const [stats, setStats] = useState<JournalStreakStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalEntries: 0,
    weeklyGoal: 14, // 2 entries per day (morning + evening)
    progress: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const entries = journalTracker.getEntries();
      const newStats = calculateJournalStats(entries, stats.weeklyGoal);
      setStats(newStats);
    };

    updateStats();

    // Update stats every hour
    const interval = setInterval(updateStats, 3600000);

    return () => clearInterval(interval);
  }, [stats.weeklyGoal]);

  const updateGoal = (newGoal: number) => {
    const entries = journalTracker.getEntries();
    const newStats = calculateJournalStats(entries, newGoal);
    setStats(newStats);
  };

  return { stats, updateGoal };
};