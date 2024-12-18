import React from 'react';
import { Clock, Target } from 'lucide-react';
import EditableGoal from '../shared/EditableGoal';
import type { FocusTimeStats } from './types';

interface FocusTimeDisplayProps {
  stats: FocusTimeStats;
  onUpdateGoal: (newGoal: number) => void;
}

const FocusTimeDisplay: React.FC<FocusTimeDisplayProps> = ({ stats, onUpdateGoal }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Total Focus Time</span>
        </div>
        <span className="text-lg font-bold">{stats.totalMinutes} minutes</span>
      </div>

      <EditableGoal
        icon={Target}
        value={stats.weeklyGoal}
        label="Weekly Goal"
        unit="minutes"
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

      <p className="text-sm text-gray-600">
        Completed {stats.totalSessions} focus sessions this week
      </p>
    </div>
  );
};

export default FocusTimeDisplay;