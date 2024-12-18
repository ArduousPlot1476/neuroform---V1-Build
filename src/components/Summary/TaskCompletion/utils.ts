import { Task } from '../../../types';

export const calculateTaskStats = (tasks: Task[], weeklyGoal: number = 30) => {
  // Get tasks from the last 7 days
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = Math.min(Math.round((completedTasks / weeklyGoal) * 100), 100);

  // Calculate per-category stats
  const categories = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = { completed: 0, total: 0 };
    }
    acc[task.category].total++;
    if (task.completed) {
      acc[task.category].completed++;
    }
    return acc;
  }, {} as Record<string, { completed: number; total: number; }>);

  return {
    completedTasks,
    totalTasks,
    weeklyGoal,
    progress,
    categories
  };
};