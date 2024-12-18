import { JournalEntry } from '../../../services/tracking/types';

export const calculateJournalStats = (entries: JournalEntry[], weeklyGoal: number = 14) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate current streak
  let currentStreak = 0;
  let currentDate = new Date(today);

  while (true) {
    const hasEntry = entries.some(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === currentDate.getTime() &&
        (entry.type === 'morning' || entry.type === 'evening');
    });

    if (!hasEntry) break;
    
    currentStreak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Calculate longest streak
  let longestStreak = currentStreak;
  let tempStreak = 0;
  let lastDate: Date | null = null;

  entries
    .filter(entry => entry.type === 'morning' || entry.type === 'evening')
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .forEach(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      if (!lastDate) {
        tempStreak = 1;
      } else {
        const dayDiff = (lastDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
        if (dayDiff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
      lastDate = entryDate;
    });

  // Calculate weekly progress
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 7);
  
  const weeklyEntries = entries.filter(entry => 
    entry.date >= weekStart && 
    (entry.type === 'morning' || entry.type === 'evening')
  );

  const totalEntries = weeklyEntries.length;
  const progress = Math.min(Math.round((totalEntries / weeklyGoal) * 100), 100);

  return {
    currentStreak,
    longestStreak,
    totalEntries,
    weeklyGoal,
    progress
  };
};