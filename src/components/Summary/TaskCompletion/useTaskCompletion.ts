import { useState, useEffect } from 'react';
import { taskTracker } from '../../../services/tracking/taskTracker';
import { calculateTaskStats } from './utils';
import type { TaskCompletionStats } from './types';

export const useTaskCompletion = () => {
  const [stats, setStats] = useState<TaskCompletionStats>({
    completedTasks: 0,
    totalTasks: 0,
    weeklyGoal: 30, // 30 tasks per week
    progress: 0,
    categories: {}
  });

  useEffect(() => {
    const updateStats = () => {
      const tasks = taskTracker.getTasks();
      const newStats = calculateTaskStats(tasks, stats.weeklyGoal);
      setStats(newStats);
    };

    updateStats();

    // Update stats every 5 minutes
    const interval = setInterval(updateStats, 300000);

    return () => clearInterval(interval);
  }, [stats.weeklyGoal]);

  const updateGoal = (newGoal: number) => {
    const tasks = taskTracker.getTasks();
    const newStats = calculateTaskStats(tasks, newGoal);
    setStats(newStats);
  };

  return { stats, updateGoal };
};