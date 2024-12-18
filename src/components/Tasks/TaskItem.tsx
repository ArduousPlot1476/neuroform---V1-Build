import React from 'react';
import type { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="flex items-center space-x-4 py-2 border-b last:border-b-0">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onComplete(task.id, e.target.checked)}
        className="w-4 h-4 rounded border-gray-300"
      />
      <span className={task.completed ? 'line-through text-gray-500' : ''}>
        {task.title}
      </span>
      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityStyles(task.priority)}`}>
        {task.priority}
      </span>
    </div>
  );
};

export default TaskItem;