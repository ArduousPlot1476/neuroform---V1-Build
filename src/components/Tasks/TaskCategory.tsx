import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import TaskItem from './TaskItem';
import type { Task } from '../../types';

interface TaskCategoryProps {
  label: string;
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

const TaskCategory: React.FC<TaskCategoryProps> = ({ label, tasks, onTaskComplete }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="bg-white rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
      >
        <span className="font-medium">{label}</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 pb-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm py-2">No tasks in this category</p>
          ) : (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onComplete={onTaskComplete}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default TaskCategory;