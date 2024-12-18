import { achievementsService } from '../achievements';
import { Task } from '../../types';
import { TaskProgress } from './types';

class TaskTracker {
  private tasks: Task[] = [];
  private progress: TaskProgress = {
    completed: 0,
    total: 0,
    rate: 0
  };

  public updateProgress(completed: number, total: number): void {
    this.progress = {
      completed,
      total,
      rate: total > 0 ? (completed / total) * 100 : 0
    };

    achievementsService.updateTaskCompletionRate(completed, total);
  }

  public getProgress(): TaskProgress {
    return { ...this.progress };
  }

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
    this.updateTaskProgress();
  }

  public updateTask(taskId: string, updates: Partial<Task>): void {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    this.updateTaskProgress();
  }

  private updateTaskProgress(): void {
    const completed = this.tasks.filter(task => task.completed).length;
    this.updateProgress(completed, this.tasks.length);
  }
}

export const taskTracker = new TaskTracker();