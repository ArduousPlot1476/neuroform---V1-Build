export interface TaskCompletionStats {
  completedTasks: number;
  totalTasks: number;
  weeklyGoal: number;
  progress: number;
  categories: Record<string, {
    completed: number;
    total: number;
  }>;
}

export interface TaskCompletionProps {
  stats: TaskCompletionStats;
}