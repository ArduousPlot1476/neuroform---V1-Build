import React from 'react';
import { CheckSquare, ListTodo, Target } from 'lucide-react';
import EditableGoal from '../shared/EditableGoal';
import type { TaskCompletionStats } from './types';

interface TaskCompletionDisplayProps {
  stats: TaskCompletionStats;
  onUpdateGoal: (newGoal: number) => void;
}

const TaskCompletionDisplay: React.FC<TaskCompletionDisplayProps> = ({ stats, onUpdateGoal }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Completed Tasks</span>
        </div>
        <span className="text-lg font-bold">{stats.completedTasks}/{stats.totalTasks}</span>
      </div>

      <EditableGoal
        icon={Target}
        value={stats.weeklyGoal}
        label="Weekly Goal"
        unit="tasks"
        onSave={onUpdateGoal}
      />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{stats.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">Category Breakdown</h3>
        {Object.entries(stats.categories).map(([category, { completed, total }]) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="capitalize">{category}</span>
            <span>{completed}/{total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCompletionDisplay;