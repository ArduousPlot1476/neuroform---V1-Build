export interface TaskFilters {
  userId: string;
  category?: 'inbox' | 'next' | 'projects' | 'waiting' | 'someday';
  priority?: 'high' | 'medium' | 'low';
  completed?: boolean;
  search?: string;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  tasksByCategory: {
    inbox: number;
    next: number;
    projects: number;
    waiting: number;
    someday: number;
  };
  tasksByPriority: {
    high: number;
    medium: number;
    low: number;
  };
  completionRate: number;
}

export interface CreateTaskData {
  userId: string;
  title: string;
  category: 'inbox' | 'next' | 'projects' | 'waiting' | 'someday';
  priority: 'high' | 'medium' | 'low';
}

export interface UpdateTaskData {
  title?: string;
  category?: 'inbox' | 'next' | 'projects' | 'waiting' | 'someday';
  priority?: 'high' | 'medium' | 'low';
  completed?: boolean;
}